// import db from '#/db'
// import { gameSpins } from '#/db/'
// import { desc, gt } from 'drizzle-orm'
// import type { Context } from 'hono'


// export async function getTopWins(c: Context) {
//   const result = await db
//     .select()
//     .from(gameSpins)
//     .where(gt(gameSpins.grossWinAmount, 1))
//     .orderBy(desc(gameSpins.createdAt))
//   // .limit(100)

//   let games: any[] = []
//   result.forEach((e) => {
//     const name = games.find((g) => g.playerName === e.playerName)
//     if (!name) {
//       if (games.length < 30) { games.push(e); }
//     }
//   })
//   if (games.length < 30) {
//     result.forEach((e) => {
//       const name = games.find((g) => g.id === e.id)
//       if (!name) {
//         if (games.length < 30) { games.push(e); }
//       }
//     })
//   }

//   if (games === undefined) { games = [] }
//   return c.json(games, 200)
// }
import type { Context } from 'hono'
import { findTopWins } from './gamespins.service'


export async function getTopWins(c: Context) {
  let games = await findTopWins()
  if (games === undefined) { games = [] }
  return c.json(games, 200)
}
