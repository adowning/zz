import { desc, gt,  } from 'drizzle-orm'

import db from '#/db'
// import { nanoid } from '#/utils/nanoid'

import { gameSpins } from '#/db/'


export async function findTopWins() {
   const result = await db
    .select()
    .from(gameSpins)
    .where(gt(gameSpins.grossWinAmount, 1))
    .orderBy(desc(gameSpins.grossWinAmount), desc(gameSpins.createdAt))

  // Group by playerName and gameName for equal distribution
  const groupedByPlayerAndGame = new Map<string, any[]>()

  result.forEach((spin) => {
    const key = `${spin.playerName}-${spin.gameName}`
    if (!groupedByPlayerAndGame.has(key)) {
      groupedByPlayerAndGame.set(key, [])
    }
    groupedByPlayerAndGame.get(key)!.push(spin)
  })

  const games: any[] = []
  const maxPerGroup = 3 // Limit entries per player-game combination

  // First pass: take top entries from each group for distribution
  for (const spins of groupedByPlayerAndGame.values()) {
    // Sort by grossWinAmount desc, then createdAt desc
    spins.sort((a, b) =>
      b.grossWinAmount - a.grossWinAmount ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Take up to maxPerGroup from this combination
    const entriesToAdd = spins.slice(0, maxPerGroup)
    games.push(...entriesToAdd)
  }

  // Sort final results by grossWinAmount desc, then createdAt desc
  games.sort((a, b) =>
    b.grossWinAmount - a.grossWinAmount ||
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Limit to 30 results
  return games.slice(0, 30)
}
