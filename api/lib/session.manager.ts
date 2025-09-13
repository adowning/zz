// src/lib/session.manager.ts
import db from '#/db'
import type { AuthSessionType, GameSession, UserType, WalletType } from '#/db/'
import { authSessions, games, gameSessions, gameSpins, users } from '#/db/'
import {
  deleteAuthSessionFromCache,
  deleteGameSessionFromCache,
  deleteSpinsFromCache,
  getAllGameSessions,
  getAuthSessionFromCache,
  getGameSessionFromCache,
  getSpinsFromCache,
  saveAuthSessionToCache,
  saveGameSessionToCache,
} from '#/lib/cache'
import { publishUserSnapshot } from '#/lib/websocket.service'
import { nanoid } from '#/utils/nanoid'
import chalk from 'chalk'
import { and, eq } from 'drizzle-orm'
import type { Context } from 'hono'

const IDLE_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export class SessionManager {
  static async startOTPSession(phone: string, otp: string, userId: string): Promise<{ id: string }> {
    const id = nanoid()
    console.log(chalk.cyan(`[SessionManager] Creating OTP session id=${id} for phone=${phone}`))

    await db.insert(authSessions).values({
      id,
      userId,
      deviceId: 'phone',
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minute expiry
    })

    return { id }
  }

  static async startAuthSession(user: UserType): Promise<AuthSessionType> {
    const id = nanoid()
    console.log(chalk.cyan(`[SessionManager] Creating auth session id=${id} for user=${user.id}`))

    const inserted = await db
      .insert(authSessions)
      .values({
        id,
        userId: user.id,
        status: 'ACTIVE',
      })
      .returning()

    const authSession = inserted?.[0]
    if (!authSession) {
      console.error(chalk.red(`[SessionManager] Insert did not return row for id=${id}`))
      throw new Error('Failed to create auth session')
    }

    // Post-insert verification to ensure persistence and ACTIVE status
    const verified = await db.query.authSessions.findFirst({
      where: and(eq(authSessions.id, authSession.id), eq(authSessions.status, 'ACTIVE')),
    })

    if (!verified) {
      console.error(
        chalk.red(`[SessionManager] Verification failed: session not found or not ACTIVE id=${authSession.id}`),
      )
      // Best-effort: mark as expired to avoid dangling
      try {
        await db.update(authSessions).set({ status: 'EXPIRED' }).where(eq(authSessions.id, authSession.id))
      } catch {}
      throw new Error('Auth session was not persisted as ACTIVE')
    }

    await saveAuthSessionToCache(verified)
    console.log(chalk.green(`[SessionManager] Auth session ACTIVE and cached id=${verified.id}`))
    return verified as AuthSessionType
  }

  static async endAuthSession(authSessionId: string, userId: string): Promise<void> {
    await db.update(authSessions).set({ status: 'EXPIRED' }).where(eq(authSessions.id, authSessionId))
    await deleteAuthSessionFromCache(authSessionId)
    await this.endCurrentGameSession(userId)
  }

  static async endAllUserSessions(userId: string): Promise<void> {
    console.log(chalk.yellow(`Ending all previous sessions for user ${userId}...`))
    await this.endCurrentGameSession(userId)
    const activeSessions = await db
      .select({ id: authSessions.id })
      .from(authSessions)
      .where(and(eq(authSessions.userId, userId), eq(authSessions.status, 'ACTIVE')))

    for (const session of activeSessions) {
      await db.update(authSessions).set({ status: 'EXPIRED' }).where(eq(authSessions.id, session.id))
      await deleteAuthSessionFromCache(session.id)
    }
  }

  static async getAuthSession(sessionId: string): Promise<AuthSessionType | null> {
    let session: any = await getAuthSessionFromCache(sessionId)
    if (session) {
      return session
    }

    session = await db.query.authSessions.findFirst({
      where: and(eq(authSessions.id, sessionId), eq(authSessions.status, 'ACTIVE')),
    })

    if (session) {
      await saveAuthSessionToCache(session)
    }

    return session || null
  }

  static async startGameSession(c: Context, gameName: string): Promise<GameSession | null> {
    const user = c.get('user') as UserType
    const wallet = c.get('wallet') as WalletType
    const authSession = c.get('authSession') as AuthSessionType
    console.log('startGameSession started ')
    if (!user || !authSession) {
      throw new Error('User not authenticated.')
    }

    await this.endCurrentGameSession(user.id)
    console.log(gameName)

    const game = await db.query.games.findFirst({
      where: eq(games.name, gameName),
    })
    if (!game) {
      console.error(`Game with name "${gameName}" not found`)
      // throw new Error(`Game with name "${gameName}" not found.`)
      return null
    }
    console.log(wallet)
    const newSessionData: GameSession = {
      id: nanoid(),
      userId: user.id,
      startingBalance: wallet.balance,
      authSessionId: authSession.id,
      gameId: game.id,
      gameName,
      status: 'ACTIVE',
      createdAt: new Date(),
      endAt: null,
      duration: 0,
      totalWagered: 0,
      totalWon: 0,
      rtp: null,
      totalXpGained: 0,
      phpGameData: null,
    }
    console.log(newSessionData)
    await db.insert(gameSessions).values(newSessionData)
    await db.update(users).set({ currentGameSessionDataId: newSessionData.id }).where(eq(users.id, user.id))

    await saveGameSessionToCache(newSessionData)
    c.set('user', { ...user, currentGameSessionDataId: newSessionData.id })
    // Push a lightweight snapshot so client updates user.currentGameSessionDataId
    publishUserSnapshot({
      userId: user.id,
      user: { currentGameSessionDataId: newSessionData.id },
    })

    return newSessionData
  }

  static async endCurrentGameSession(userId: string): Promise<void> {
    const activeSession = await db.query.gameSessions.findFirst({
      where: and(eq(gameSessions.userId, userId), eq(gameSessions.status, 'ACTIVE')),
    })
    console.log(activeSession)
    if (!activeSession) {
      return
    }

    const sessionSpins = await getSpinsFromCache(activeSession.id)
    const sessionFromCache = (await getGameSessionFromCache(activeSession.id)) || activeSession

    await db.transaction(async (tx) => {
      const now = new Date()
      const finalRtp =
        sessionFromCache.totalWagered > 0 ? (sessionFromCache.totalWon / sessionFromCache.totalWagered) * 100 : 0
      const duration = Math.round((now.getTime() - new Date(sessionFromCache.createdAt).getTime()) / 1000)
      console.log('finalRtp: ', finalRtp)
      // console.log('sessionFromCache: ', sessionFromCache)
      await tx
        .update(gameSessions)
        .set({
          status: 'COMPLETED',
          endAt: now,
          duration,
          totalWagered: sessionFromCache.totalWagered,
          totalWon: sessionFromCache.totalWon,
          startingBalance: sessionFromCache.startingBalance,
          totalXpGained: sessionFromCache.totalXpGained,
          rtp: finalRtp === 0 ? '0' : finalRtp.toFixed(2),
        })
        .where(eq(gameSessions.id, sessionFromCache.id))
      console.log('here')
      if (sessionSpins.length > 0) {
        const spinsToCreate = sessionSpins.map((spin, i) => ({
          ...spin,
          // The spin.id from the cache (provider's roundId) must be preserved
          // to maintain relations (e.g., to jackpot wins).
          sessionId: activeSession.id,
          spinNumber: i + 1,
          grossWinAmount: spin.grossWinAmount ?? 0,
          wagerAmount: spin.wagerAmount ?? 0,
          occurredAt: spin.createdAt ?? new Date().toISOString(),
        }))
        await tx.insert(gameSpins).values(spinsToCreate)
      }

      await tx.update(users).set({ currentGameSessionDataId: null }).where(eq(users.id, userId))
    })

    await deleteGameSessionFromCache(activeSession.id)
    await deleteSpinsFromCache(activeSession.id)
    // Notify client that current game session ended
    publishUserSnapshot({
      userId,
      user: { currentGameSessionDataId: null },
    })
  }

  static async getGameSession(sessionId: string): Promise<GameSession | null> {
    let session: any = await getGameSessionFromCache(sessionId)
    if (session) {
      return session
    }

    session = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.id, sessionId),
    })

    if (session) {
      await saveGameSessionToCache(session)
    }

    return session || null
  }
  static async verifyOTP(sessionId: string, otp: string): Promise<{ phone: string; isValid: boolean }> {
    const session = await db.query.authSessions.findFirst({
      where: and(
        eq(authSessions.id, sessionId),
        eq(authSessions.status, 'OTP_PENDING'),
        eq(authSessions.otp, otp),
        eq(authSessions.expiresAt, new Date(Date.now())),
      ),
    })

    if (!session) {
      return { phone: '', isValid: false }
    }

    // Mark OTP as verified
    await db.update(authSessions).set({ status: 'ACTIVE' }).where(eq(authSessions.id, sessionId))

    return {
      phone: session.deviceId || '',
      isValid: true,
    }
  }

  static async getActiveGameSession(userId: string): Promise<GameSession | undefined> {
    const allGameSessions = await getAllGameSessions()
    const activeSession = Array.from(allGameSessions.values()).find(
      (session) => session.userId === userId && session.status === 'ACTIVE',
    )
    return activeSession
  }

  static async handleIdleSession(c: Context): Promise<void> {
    const user = c.get('user') as UserType
    if (!user?.currentGameSessionDataId) {
      return
    }

    const gameSession = await this.getGameSession(user.currentGameSessionDataId)

    if (gameSession) {
      const now = new Date()
      const lastSeenValue = (gameSession as any).lastSeen
      const lastSeen = lastSeenValue ? new Date(lastSeenValue) : now
      const timeDiff = now.getTime() - lastSeen.getTime()

      if (timeDiff > IDLE_TIMEOUT) {
        console.log(chalk.redBright('ending game session'))
        await this.endCurrentGameSession(user.id)
        c.set('gameSession', null)
      } else {
        ;(gameSession as any).lastSeen = now
        await saveGameSessionToCache(gameSession)
      }
    }
  }
}
