import db, { games } from '#/db'
// import { nanoid } from '#/utils/nanoid'
import type { AuthSessionType, UserType } from '#/db/'
import { SessionManager } from '#/lib/session.manager'
import { desc, eq, sql } from 'drizzle-orm'
import type { Context } from 'hono'

// export function findGameCategories() {
//   return GameCategory.enumValues
// }

export async function findAllGames() {
  return await db.query.games.findMany({
    columns: {
      id: true,
      name: true,
      title: true,
      category: true,
      developer: true,
      thumbnailUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: desc(games.name),
  })
}

export async function searchGames(params: { game_categories_slug?: string; page: number; limit: number }) {
  const where = params.game_categories_slug ? eq(games.category, params.game_categories_slug) : undefined
  const _games = await db.query.games.findMany({
    where,
    limit: params.limit,
    offset: (params.page - 1) * params.limit,
  })
  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(games)
    .where(where)
  return { games: _games, total: totalCount[0].count }
}

// export async function findUserGames(
//   userId: string,
//   params: { game_categories_slug: string; page: number; limit: number },
// ) {
//   const page = params.page || 1
//   const limit = params.limit || 10
//   const offset = (page - 1) * limit

//   if (params.game_categories_slug === 'favorite') {
//     const favoriteGameIds = await db.query.favoriteGames.findMany({
//       where: eq(favoriteGames.userId, userId),
//       columns: { gameId: true },
//     })

//     if (favoriteGameIds.length === 0) { return { games: [], total: 0 } }

//     const gameIds = favoriteGameIds.map((f) => f.gameId)

//     const favGames = await db.query.games.findMany({
//       where: inArray(games.id, gameIds),
//       limit,
//       offset,
//     })
//     return { games: favGames, total: gameIds.length }
//   } else if (params.game_categories_slug === 'history') {
//     const history = await db.query.gameHistory.findMany({
//       where: eq(gameHistory.userId, userId),
//       orderBy: desc(gameHistory.createdAt),
//       limit,
//       offset,
//     })

//     const totalCount = await db
//       .select({ count: sql<number>`count(*)` })
//       .from(gameHistory)
//       .where(eq(gameHistory.userId, userId))

//     return { games: history, total: totalCount[0].count }
//   }
//   return { games: [], total: 0 }
// }

// export async function addFavoriteGame(userId: string, gameId: string) {
//   await db
//     .insert(favoriteGames)
//     .values({ id: nanoid(), userId, gameId })
//     .onConflictDoNothing()
// }

// export async function removeFavoriteGame(userId: string, gameId: string) {
//   await db
//     .delete(favoriteGames)
//     .where(
//       and(eq(favoriteGames.userId, userId), eq(favoriteGames.gameId, gameId)),
//     )
// }

// export async function findFavoriteGames(userId: string): Promise<string[]> {
//   const favorites = await db
//     .select({ gameId: favoriteGames.gameId })
//     .from(favoriteGames)
//     .where(eq(favoriteGames.userId, userId))
//   return favorites.map((f) => f.gameId)
// }
export async function checkSession(user: UserType): Promise<string | null> {
  if (!user) {
    return null
  }
  const sessionId = user.currentGameSessionDataId
  if (sessionId === null) {
    return null
  }
  const result = await SessionManager.getGameSession(sessionId)
  if (!result) {
    return null
  } else {
    return result.gameId
  }
}
export async function enterGame(
  c: Context,
  user: UserType,
  authSession: AuthSessionType,
  gameId: string,
  token: string,
  balance: number,
): Promise<any | null> {
  let game = await db.query.games.findFirst({ where: eq(games.id, gameId) })
  if (!game) {
    game = await db.query.games.findFirst({ where: eq(games.name, gameId) })
  }
  if (!game) {
    return null
  }
  // await db.insert(GameSession).values(newSession)
  const result = await SessionManager.startGameSession(c, game.name)
  if (result === null || !result) {
    return null
  }
  const gameConfig = {
    authToken: token,
    gameSessionId: result.id,
    userId: user.id,
    gameName: game.name.replace('RTG', ''),
    lang: 'en', // Assuming language, adjust as needed
    currency: 'USD', // Assuming currency, adjust as needed
    operator: game.developer,
    provider: 'kronos',
    depositUrl: '/wallet/deposit',
    lobbyUrl: '/',
    mode: 'real',
    rgsApiBase: `https://apidev.cashflowcasino.com/rpc/spin-data/redtiger/platform`,
    cdn: `https://cdn-eu.cloudedge.info/all/games/slots/${game.name}/`,
    baseCdn: 'https://cdn-eu.cloudedge.info/all/games/',
  }
  console.log(game)
  return {
    webUrl:
      game.name === 'FuFarmSW'
        ? `https://apidev.cashflowcasino.com/games/SW/FuFarmSW/fufarm/226/index.html?startGameToken=${token}&swa=0&history=0&history_url=&hide_play_for_real=true&phantom_version_host=&language=en`
        : game.developer === 'kickass'
          ? `https://apidev.cashflowcasino.com/games/kickass/${game.name}/index.html?g=${game.name.replace('KA', '')}&p=x&u=237558600&t=123&ak=accessKey&cr=USD&loc=en&rlv=0&api_exit=/&userId=${user.id}`
          : game.developer === 'nolimit'
            ? `https://apidev.cashflowcasino.com/games/nolimit/launcher.html?gameName=${game.name}`
            : `/games/${game.developer}/launcher.html`,
    gameConfig,
  }
}

export function leaveGame(authSessionId: string) {
  // This logic would involve updating the game session status to COMPLETED or ABANDONED
  // and persisting any final data from cache to the database.
  console.log(`Leaving game for auth session: ${authSessionId}`)
}

// export async function findGameHistory(userId: string) {
//   const records = await db.query.gameHistory.findMany({
//     where: eq(gameHistory.userId, userId),
//     orderBy: desc(gameHistory.createdAt),
//   })

//   const totalCountResult = await db
//     .select({ count: sql<number>`count(*)` })
//     .from(gameHistory)
//     .where(eq(gameHistory.userId, userId))
//   const totalCount = totalCountResult[0].count

//   return {
//     total_pages: Math.ceil(totalCount / 10),
//     record: records,
//   }
// }
// export async function findTopWins() {
//   const records = await db.query.games.findMany({
//     orderBy: desc(games.totalWon),
//   })

//   const totalCountResult = await db
//     .select({ count: sql<number>`count(*)` })
//     .from(games)
//   // .where(eq(Game.id, userId))
//   const totalCount = totalCountResult[0].count

//   return {
//     total_pages: Math.ceil(totalCount / 10),
//     record: records,
//   }
// }
