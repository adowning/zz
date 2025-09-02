import type { AuthSessionType, GameSessionType, GameSpinType } from '#/db/'
import { nanoid } from '#/utils/nanoid'
import chalk from 'chalk'
import { createStorage, prefixStorage } from 'unstorage'

// import type z from 'zod'
// import { rtgSpinResponseDtoSchema } from '#/modules/redtiger/rtg.schema'

// type RTGSpinResponseDto = z.infer<typeof rtgSpinResponseDtoSchema>

const winSpins = await import('../db/rtg.spins.json')
const zeroList = await import('../db/zerolist.json')
const spinResultsStorage = createStorage<GameSpinType[]>()
const zeroWinSpinsStorage = createStorage<GameSpinType[]>()
const winSpinsList = [...winSpins.default]

for await (const game of winSpins.default) {
  const exists = winSpinsList.filter((item: any) => item.game_name === game.game_name)
  const id = game.game_name
  // Map the raw data to GameSpinType
  const mapToGameSpinType = (item: any): GameSpinType => ({
    id: item.id ?? nanoid(),
    playerName: item.playerName ?? null,
    gameName: item.game_name ?? item.gameName ?? null,
    gameId: item.gameId ?? null,
    spinData: item.spinData ?? item,
    grossWinAmount: item.grossWinAmount ?? Number(item.win_total ?? 0),
    wagerAmount: item.wagerAmount ?? Number(item.stake ?? 0),
    spinNumber: item.spinNumber ?? 0,
    playerAvatar: item.playerAvatar ?? null,
    userId: item.userId ?? null,
    sessionDataId: item.sessionDataId ?? null,
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
    betAmount: item.betAmount ?? Number(item.stake ?? 0),
    type: null,
    status: null,
    sessionId: '',
    currencyId: null,
    occurredAt: item.createdAt,
    operatorId: null,
    playerBalanceAtStart: 0,
    playerBalance: 0,
    gamePlayerWinTotalTodayid: 0,
    playerBetTotalToday: 0,
    sessionTotalWinAmount: 0,
    sessionTotalBetAmount: 0,
    gameSessionRtp: 0,
    playerRtpToday: 0,
    winAmount: 0
  })
  const list = [game, ...exists].map(mapToGameSpinType)
  await spinResultsStorage.setItem(id, list)
}
const zeroWinSpins = [...zeroList.default]
for await (const game of zeroList.default) {
  const exists = zeroWinSpins.filter((item: any) => item.game_name === game.game_name)
  // const list = [game, ...exists]
  const id = game.game_name
    const mapToGameSpinType = (item: any): GameSpinType => ({
    id: item.id ?? nanoid(),
    playerName: item.playerName ?? null,
    gameName: item.game_name ?? item.gameName ?? null,
    gameId: item.gameId ?? null,
    spinData: item.spinData ?? item,
    grossWinAmount: item.grossWinAmount ?? Number(item.win_total ?? 0),
    wagerAmount: item.wagerAmount ?? Number(item.stake ?? 0),
    spinNumber: item.spinNumber ?? 0,
    playerAvatar: item.playerAvatar ?? null,
    userId: item.userId ?? null,
    sessionDataId: item.sessionDataId ?? null,
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
    betAmount: item.betAmount ?? Number(item.stake ?? 0),
    type: null,
    status: null,
    sessionId: '',
    currencyId: null,
    occurredAt: item.createdAt,
    operatorId: null,
    playerBalanceAtStart: 0,
    playerBalance: 0,
    gamePlayerWinTotalTodayid: 0,
    playerBetTotalToday: 0,
    sessionTotalWinAmount: 0,
    sessionTotalBetAmount: 0,
    gameSessionRtp: 0,
    playerRtpToday: 0,
    winAmount: 0
  })
  const list = [game, ...exists].map(mapToGameSpinType)
  
  await zeroWinSpinsStorage.setItem(id, list)
}

// console.log(await spinResultsStorage.keys().then((keys) => keys))

// console.log(await getSpinResultFromCache('SteamSquad').then((list) => list))
const storage = createStorage()

export const spinResults = prefixStorage<GameSpinType[]>(storage, 'spins')

const authSessionCache = prefixStorage<AuthSessionType>(storage, 'sessions:auth')
const gameSessionCache = prefixStorage<GameSessionType>(storage, 'sessions:game')
const spinCache = prefixStorage<GameSpinType[]>(storage, 'spins')
const playerGamesCache = prefixStorage<object>(storage, 'player-games')

// --- RTP Update Queue ---
export interface RtpUpdateJob {
  userId: string
  sessionId: string
}
const rtpUpdateQueue = prefixStorage<RtpUpdateJob>(storage, 'queues:rtp-update')

/**
 * Adds a job to the RTP update queue.
 * The job will be processed by a background worker.
 */
export async function queueRtpUpdate(job: RtpUpdateJob): Promise<void> {
  const jobId = nanoid()
  console.log(chalk.magenta(`[QUEUE] Adding RTP update job ${jobId} for user ${job.userId}`))
  await rtpUpdateQueue.setItem(jobId, job)
}

/**
 * Retrieves all pending RTP update jobs from the queue.
 */
export async function getRtpUpdateJobs(): Promise<{ key: string; job: RtpUpdateJob }[]> {
  const keys = await rtpUpdateQueue.getKeys()
  const jobs = await Promise.all(
    keys.map(async (key) => {
      const job = await rtpUpdateQueue.getItem(key)
      return { key, job: job as RtpUpdateJob }
    }),
  )
  return jobs.filter((item) => item.job) // Filter out any null/undefined jobs
}

/**
 * Removes a job from the RTP update queue after it has been processed.
 */
export async function completeRtpUpdateJob(jobId: string): Promise<void> {
  await rtpUpdateQueue.removeItem(jobId)
}
// --- End RTP Update Queue ---

// Replay cache for previous refresh token JTI values
interface ReplayEntry {
  usedAt: number
  expiresAt: number
}
const replayCache = prefixStorage<ReplayEntry>(storage, 'auth:refresh:replay')

export async function getSpinResultFromCache(gameName: string): Promise<GameSpinType[] | null> {
  const item = await spinResultsStorage.getItem(gameName)
  return item ? JSON.parse(JSON.stringify(item)) : null
}
export async function getZeroWinSpinResultFromCache(gameName: string): Promise<GameSpinType | null> {
  const item = await zeroWinSpinsStorage.getItem(gameName)
  if(item === null){
    console.warn(chalk.yellow(`No zero win spins found for game: ${gameName}`))
    return null
  }
  item.length = item.length || 0
  return item ? JSON.parse(JSON.stringify(item[0])) : null
}
export async function getAuthSessionFromCache(authSessionId: string): Promise<AuthSessionType | null> {
  const item = await authSessionCache.getItem(authSessionId)
  return item ? JSON.parse(JSON.stringify(item)) : null
}

export async function saveAuthSessionToCache(session: AuthSessionType): Promise<void> {
  console.log(chalk.blue(`Saving auth session ${session.id} to cache.`))
  await authSessionCache.setItem(session.id, session)
}

export async function deleteAuthSessionFromCache(authSessionId: string): Promise<void> {
  console.log(chalk.blue(`Deleting auth session ${authSessionId} from cache.`))
  await authSessionCache.removeItem(authSessionId)
}

export async function getGameSessionFromCache(sessionId: string): Promise<GameSessionType | null> {
  const item = await gameSessionCache.getItem(sessionId)
  return item ? JSON.parse(JSON.stringify(item)) : null
}

export async function saveGameSessionToCache(session: GameSessionType): Promise<void> {
  console.log(chalk.blue(`Saving game session ${session.id} to cache.`))
  await gameSessionCache.setItem(session.id, session)
}

export async function deleteGameSessionFromCache(sessionId: string): Promise<void> {
  console.log(chalk.blue(`Deleting game session ${sessionId} from cache.`))
  await gameSessionCache.removeItem(sessionId)
}

export async function getAllGameSessions(): Promise<Map<string, GameSessionType>> {
  const keys = await gameSessionCache.getKeys()
  const allData = new Map<string, GameSessionType>()
  for (const key of keys) {
    if (key) {
      const session = await gameSessionCache.getItem(key)
      if (session) {
        allData.set(key, session)
      }
    }
  }
  return allData
}

export async function getSpinsFromCache(sessionId: string): Promise<GameSpinType[]> {
  return (await spinCache.getItem(sessionId)) || []
}

export async function addSpinToCache(sessionId: string, spin: GameSpinType): Promise<void> {
  const spins = await getSpinsFromCache(sessionId)
  spins.push(spin)
  await spinCache.setItem(sessionId, spins)
}

export async function deleteSpinsFromCache(sessionId: string): Promise<void> {
  await spinCache.removeItem(sessionId)
}

/**
 * Mark a previous refresh token jti as used to prevent replay.
 * ttlSeconds is the remaining validity window for that previous token.
 */
export async function markPrevRefreshJtiUsed(jti: string, ttlSeconds: number): Promise<void> {
  const now = Math.floor(Date.now() / 1000)
  const entry: ReplayEntry = {
    usedAt: now,
    expiresAt: now + Math.max(1, ttlSeconds),
  }
  await replayCache.setItem(jti, entry)
  // Optional: unstorage may not support TTL natively; rely on expiresAt checks in code.
}

/**
 * Check if a previous refresh token jti has been used already.
 */
export async function isPrevRefreshJtiUsed(jti: string): Promise<boolean> {
  const entry = await replayCache.getItem(jti)
  if (!entry) {
    return false
  }
  const now = Math.floor(Date.now() / 1000)
  if (entry.expiresAt <= now) {
    // Best-effort cleanup
    await replayCache.removeItem(jti)
    return false
  }
  return true
}

export async function getPlayerGamesFromCache(userLogin: string): Promise<any | null> {
  const item = await playerGamesCache.getItem(userLogin)
  return item ? JSON.parse(JSON.stringify(item)) : null
}

export async function savePlayerGamesToCache(userLogin: string, games: any): Promise<void> {
  console.log(chalk.blue(`Saving player games for ${userLogin} to cache.`))
  await playerGamesCache.setItem(userLogin, games)
}

export async function deletePlayerGamesFromCache(userLogin: string): Promise<void> {
  console.log(chalk.blue(`Deleting player games for ${userLogin} from cache.`))
  await playerGamesCache.removeItem(userLogin)
}
