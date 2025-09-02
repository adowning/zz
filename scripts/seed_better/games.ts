/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../api/db'
import { games,  } from '../../api/db'
import * as rawgames from './json/games2.json'

// const CATEGORIES = [
//   { name: 'Slots', slug: 'slots', type: 'slot' },
//   { name: 'Lobby', slug: 'lobby', type: 'lobby' },
//   { name: 'Live Casino', slug: 'live-casino', type: 'live' },
//   { name: 'Table Games', slug: 'table-games', type: 'table' },
// ]

const GAMES: any[] = []
//@ts-ignore
for (const game of rawgames.default) {
  game.category = game.gamebank || game.type
  game.tags = []
  game.totalWagered = 0
  game.totalWon = 0
  game.isFeatured = false
  GAMES.push(game)
  console.log(game.total_wagered)
}
// rawgames.forEach((game) => {
// })
export async function seedGames(db: NodePgDatabase<typeof schema>) {
  console.log('🎮 Seeding games and categories...')

  // const createdCategories = await db
  //   .insert(gameCategories)
  //   .values(CATEGORIES)
  //   .returning()

  const gamesToInsert = GAMES.map((game) => ({
    ...game,
    totalWagered: 0
    // categoryId: rand(createdCategories).id,
  }))

  await db.insert(games).values(gamesToInsert).onConflictDoNothing()

  console.log('✅ Games and categories seeded.')
}
