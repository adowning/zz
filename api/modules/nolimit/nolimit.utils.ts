// Utilities and transactional helpers for Nolimit spins.
// This file centralizes logic previously in nolimit.service.ts and ensures DB consistency.

import db from '#/db'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import { users, authSessions, gameSessions, gameSpins, wallets } from '#/db/'

import { queueRtpUpdate } from '#/lib/cache'
import type { WebSocketData } from '#/modules/websocket/websocket.handler'
import type { NolimitServerMessage } from '#/modules/nolimit/nolimit.types'
import { HonoRequest } from 'hono'

/**
 * Domain types inferred from schema and project conventions.
 */
export type UserWithRelations = typeof users.$inferSelect & {
  // activeProfileId, etc., if applicable in your project
  // Keeping minimal to avoid type drift. Service passes userId explicitly where needed.
}

// export type GameSessionType = typeof gameSessions.$inferSelect
export type GameSpinType = typeof gameSpins.$inferInsert & {
  serverMessage: NolimitServerMessage
  grossWinAmount: number
  wagerAmount: number
}

// type TransactionType = Parameters<typeof db.transaction>[0] extends (cb: infer CB) => any
//   ? CB extends (tx: infer TX) => any
//   ? TX
//   : never
//   : never

/**
 * Format a money-like numeric string (e.g. "123.45") into cents integer.
 * If the string is malformed, returns 0 gracefully.
 */
export function formatCentsAmount(value: string | number | null | undefined): number {
  if (value == null) { return 0 }
  if (typeof value === 'number') { return Math.round(value * 100) }
  const n = Number(value)
  if (Number.isNaN(n)) { return 0 }
  return Math.round(n * 100)
}

/**
 * Return the active auth session for a user (the latest ACTIVE).
 */
export async function getActiveSession(userId: string) {
  const session = await db.query.authSessions.findFirst({
    where: and(eq(authSessions.userId, userId), eq(authSessions.status, 'ACTIVE')),
    orderBy: [desc(authSessions.createdAt)],
  })
  return session ?? null
}

/**
 * Get an active game session for a given auth session and user.
 * - If multiple active sessions exist, returns the latest by createdAt.
 */
// export async function getGameSession(authSessionId: string, userId: string) {
//   const session = await db.query.gameSessions.findFirst({
//     where: and(
//       eq(gameSessions.authSessionId, authSessionId),
//       eq(gameSessions.userId, userId),
//       eq(gameSessions.status, "ACTIVE"),
//     ),
//     orderBy: [desc(gameSessions.createdAt)],
//   });
//   return session ?? null;
// }

/**
 * Compute today's RTP aggregates for a player across all spins:
 * - playerWinTotalToday
 * - playerBetTotalToday
 * - playerRTPToday (as a number in [0..100], rounded to 2 decimals)
 */
export async function getRtpForPlayerToday(
  userId: string,
  now: Date = new Date()
): Promise<[number, number, number]> {
  console.log('getRtpForPlayerToday')
  // Compute UTC start of day to match timestamptz semantics in DB.
  const startOfDayUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)
  )

  const rows = await db
    .select({
      totalWin: sql<number>`coalesce(sum(${gameSpins.winAmount}), 0)`.as('total_win'),
      totalBet: sql<number>`coalesce(sum(${gameSpins.betAmount}), 0)`.as('total_bet'),
    })
    .from(gameSpins)
    .where(
      and(
        eq(gameSpins.userId, userId),
        // Timestamps are stored as ISO strings, so a direct string comparison is safe and efficient.
        gte(gameSpins.createdAt, startOfDayUtc)
      )
    )

  const totalWin = rows[0]?.totalWin ?? 0
  const totalBet = rows[0]?.totalBet ?? 0
  const rtp = totalBet > 0 ? Number(((totalWin / totalBet) * 100).toFixed(2)) : 0
  return [rtp, totalWin, totalBet]
}

/**
 * Compute session RTP aggregates:
 * - sessionTotalWinAmount
 * - sessionTotalBetAmount
 * - gameSessionRTP (as a number in [0..100], rounded to 2 decimals)
 */
export async function getRtpForGameSession(sessionId: string): Promise<[number, number, number]> {
  console.log('getRtpForGameSession')

  const rows = await db
    .select({
      totalWin: sql<number>`coalesce(sum(${gameSpins.winAmount}), 0)`.as('total_win'),
      totalBet: sql<number>`coalesce(sum(${gameSpins.betAmount}), 0)`.as('total_bet'),
    })
    .from(gameSpins)
    .where(eq(gameSpins.sessionId, sessionId))

  const totalWin = rows[0]?.totalWin ?? 0
  const totalBet = rows[0]?.totalBet ?? 0
  const rtp = totalBet > 0 ? Number(((totalWin / totalBet) * 100).toFixed(2)) : 0
  return [rtp, totalWin, totalBet]
}

/**
 * Check if a user can place a bet of betAmount cents by comparing to their balance.
 * The project stores balance on users table or related wallet table; here we use users.balance if present.
 * If your project stores balance elsewhere, swap for correct table/field.
 */
export async function checkBalance(
  walletId: string,
  betAmount: number
): Promise<{ success: boolean; balance: number }> {
  const wallet = await db.query.wallets.findFirst({ where: eq(wallets.id, walletId) })
  const balance = wallet?.balance ?? 0
  return { success: balance >= betAmount, balance }
}

/**
 * Atomically update player and session/shop metrics.
 * - Applies balanceChange to user balance.
 * - Increments session totals.
 * - Returns the resulting balance.
 */
export async function updatePlayerAndShop(
  userId: string,
  sessionId: string,
  betAmount: number,
  winAmount: number,
  tx: Parameters<typeof db.transaction>[0] extends (cb: infer _CB) => any ? any : any
): Promise<void> {
  const balanceChange = (winAmount ?? 0) - (betAmount ?? 0)

  // Atomically update wallet balance using SQL expressions
  await tx
    .update(wallets)
    .set({ balance: sql`${wallets.balance} + ${balanceChange}` })
    .where(eq(wallets.userId, userId))

  // Atomically update game session aggregates using SQL expressions
  await tx
    .update(gameSessions)
    .set({
      totalWagered: sql`${gameSessions.totalWagered} + ${betAmount}`,
      totalWon: sql`${gameSessions.totalWon} + ${winAmount}`,
    })
    .where(eq(gameSessions.id, sessionId))
}

/**
 * Persist a spin and update balances/rtp within a single DB transaction.
 * Returns a normalized response for the service layer.
 */
function createSpinRecord(
  data: WebSocketData,
  serverMessage: NolimitServerMessage,
  betAmount: number,
  winAmount: number,
  newBalance: number
): GameSpinType {
  const spinNumber = Number.parseInt(serverMessage.id.split('-')[1] ?? '0', 10) || 0

  return {
    sessionDataId: data.gameSession.id,
    id: serverMessage.id,
    playerName: data.gameSession.user?.username,
    playerAvatar: data.gameSession.user?.avatarUrl,
    gameName: data.gameSession.game?.name,
    sessionId: data.gameSession.id,
    userId: data.user.id,
    gameId: data.gameSession.gameId ?? data.gameSession.id,
    playerBalanceAtStart: spinNumber === 1 ? data.wallet.balance : 0,
    playerBalance: newBalance,
    betAmount: betAmount ?? 0,
    winAmount: winAmount ?? 0,
    gamePlayerWinTotalTodayid: 0,
    playerBetTotalToday: 0,
    sessionTotalWinAmount: 0,
    sessionTotalBetAmount: 0,
    spinNumber,
    gameSessionRtp: 0,
    playerRtpToday: 0,
    type: 'nolimit',
    status: 'COMPLETED',
    serverMessage,
    grossWinAmount: (winAmount ?? 0) / 100,
    wagerAmount: (betAmount ?? 0) / 100,
    currencyId: 'USD',
    createdAt: new Date(),
    updatedAt: new Date(),
    occurredAt: new Date(),
  }
}

export async function noLimitUpdatePlayerAndShopStats(
  betAmount: number,
  winAmount: number,
  newBalance: number,
  data: WebSocketData,
  serverMessage: NolimitServerMessage
): Promise<boolean> {

  try {
    const result = await db.transaction(async (tx) => {
      console.timeEnd('noLimitUpdatePlayerAndShopStats:TransactionWait')
      console.time('noLimitUpdatePlayerAndShopStats:InsideTransaction')

      const spinRecord = createSpinRecord(data, serverMessage, betAmount, winAmount, newBalance)

      await tx.insert(gameSpins).values(spinRecord)
      await updatePlayerAndShop(data.user.id, data.gameSession.id, betAmount, winAmount, tx)

      // Queue RTP update inside transaction to ensure consistency
      await queueRtpUpdate({ userId: data.user.id, sessionId: data.gameSession.id })

      console.timeEnd('noLimitUpdatePlayerAndShopStats:InsideTransaction')
      return {
        success: true,
        balance: newBalance,
        nullNext: false,
        incoming: null,
      }
    })

    console.timeEnd('noLimitUpdatePlayerAndShopStats:Total')
    return result.success
  } catch (error) {
    console.error('Failed to update player and shop stats:', error)
    return false
  }
}

export function getNolimitToken(
  req: HonoRequest
): { token: string | null; key: string | null } {
  const url = new URL(req.url)
  const key = url.searchParams.get('data')
  let cookies = req.raw.headers.get('cookie')
  console.log(req.header())
  // console.log('cookies',cookies)
  if(cookies === null){
    cookies = req.raw.headers.get('Set-Cookie')
  // console.log('cookies',cookies)
  // console.log(req.raw.headers)

  }
  const cookieToken = cookies?.split('accessToken=')[1].split(';')[0]
  let token = cookieToken?.trim().replace(/^"(.+)"$/, '$1') || null
  if (token === null) {
    token = url.searchParams.get('accessToken')

  }
  // if (key == null || !token) { return null } // new Response('No key', { status: 401 })
  return { token, key }
}
