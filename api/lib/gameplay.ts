import type {
  GameSessionType,
  GameSpinType,
  NewgameSpins,
  UserWithRelations,
} from '#/db/'
import { addSpinToCache, saveGameSessionToCache } from '#/lib/cache'
import {
  addXpTousers,
  calculateXpForWagerAndWins,
} from '#/modules/vip/vip.service'
import chalk from 'chalk'
import type { Context } from 'hono'

export interface SpinParams {
  totalSpinWinnings: number;
  wagerAmount: number;
}
export interface SpinStats {
  totalSpinWinnings: number;
  wagerAmount: number;
}
export async function handleGameSpin(
  c: Context,
  spinInput: NewgameSpins,
  spinParams: SpinParams,
): Promise<GameSpinType> {
  const user = c.get('user') as UserWithRelations
  const gameSession = c.get('gameSession') as GameSessionType

  if (!user || !gameSession) {
    throw new Error(
      'handleGameSpin requires an active game session and authenticated user in the context.',
    )
  }
  console.log(
    chalk.bgCyan(
      `Handling game spin for user: ${user.id} in session: ${gameSession.id}`,
    ),
  )

  const { totalSpinWinnings, wagerAmount } = spinParams

  if (user.vipInfo) {
    const xpGained = calculateXpForWagerAndWins(
      wagerAmount / 100, // Convert cents to dollars
      totalSpinWinnings / 100,
      user.vipInfo,
    )

    if (xpGained.totalXp > 0) {
      await addXpTousers(user.id, xpGained.totalXp)
      console.log(
        chalk.yellow(`User ${user.id} earned ${xpGained.totalXp} XP.`),
      )
    }
  }
  const wallet = c.get('wallet')
  const operatorId = wallet.operatorId
  gameSession.totalWagered = (gameSession.totalWagered || 0) + wagerAmount
  gameSession.totalWon = (gameSession.totalWon || 0) + totalSpinWinnings

  await saveGameSessionToCache(gameSession)

  const newSpin: GameSpinType = {
    id: new Date().getTime().toString(),
    wagerAmount,
    grossWinAmount: totalSpinWinnings,
    sessionId: gameSession.id,
    userId: user.id,
    playerName: user.username,
    createdAt: new Date(),
    updatedAt: new Date(),
    occurredAt: new Date(),
    spinNumber: 0, // This should be properly calculated based on session spin count
    playerAvatar: user.avatarUrl,
    currencyId: 'USD',
    sessionDataId: gameSession.id,
    gameId: spinInput.gameId ?? null,
    gameName: spinInput.gameName ?? null,
    spinData: `${spinInput.gameName}::${spinInput.grossWinAmount}`,
    status: 'active',
    type: null,
    operatorId,
    playerBalanceAtStart: 0,
    playerBalance: 0,
    gamePlayerWinTotalTodayid: 0,
    playerBetTotalToday: 0,
    sessionTotalWinAmount: 0,
    sessionTotalBetAmount: 0,
    gameSessionRtp: 0,
    playerRtpToday: 0,
    winAmount: 0,
    betAmount: 0
  }

  await addSpinToCache(gameSession.id, newSpin)

  return newSpin
}
export async function updateGameSessionStats(
  c: Context,
  spinStats: SpinStats,
): Promise<void> {
  const gameSession = c.get('gameSession') as GameSessionType

  if (!gameSession) {
    console.warn(
      'Attempted to update game session stats, but no session was found in the context.',
    )
    return
  }

  const { totalSpinWinnings, wagerAmount } = spinStats

  gameSession.totalWagered = (gameSession.totalWagered || 0) + wagerAmount
  gameSession.totalWon = (gameSession.totalWon || 0) + totalSpinWinnings

  await saveGameSessionToCache(gameSession)

  console.log(
    chalk.gray(
      `Updated session ${gameSession.id}: Wagered=${wagerAmount}, Won=${totalSpinWinnings}`,
    ),
  )
}
