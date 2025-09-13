import db from '#/db'
import { games, gameSessions, operators, transactions, wallets } from '#/db/schema'
import { eq, sql } from 'drizzle-orm'
import { TypeOfTransaction } from '../../../shared/zero'
import { PhpApiResponse, PhpGameStateData } from './php.types'

function determineWinType(
  game: { totalWagered: number; totalWon: number; goldsvetData: any },
  operator: { goldsvetData: any; balance: number },
): 'bonus' | 'win' | 'none' {
  const totalWagered = game.totalWagered ?? 0
  const totalWon = game.totalWon ?? 0
  const currentRTP = totalWagered > 0 ? (totalWon / totalWagered) * 100 : 0
  const goldsvetData = typeof game.goldsvetData === 'object' && game.goldsvetData !== null ? game.goldsvetData : {}
  const targetRTP = goldsvetData.percent
  const randomValue = Math.random() * 100

  if (operator.balance > 1000 && currentRTP < targetRTP && randomValue < 5) {
    return 'bonus'
  }
  const winChance = currentRTP < targetRTP ? 30 : 15
  if (randomValue < winChance) {
    return 'win'
  }
  return 'none'
}

export async function callPhpEngine(gameName: string, gameState: PhpGameStateData): Promise<PhpApiResponse> {
  const phpEngineUrl = `${process.env.PHP_ENGINE_URL}/game/${gameName}/spin` // Point directly to the PHP entrypoint
  console.log(phpEngineUrl)
  try {
    const response = await fetch(phpEngineUrl, {
      method: 'POST',
      body: JSON.stringify(gameState),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`PHP engine error for ${gameName}: ${response.status}`, errorText)
      throw new Error(`Upstream PHP server responded with status: ${response.status}`)
    }
    // The PHP script might return text/plain or application/json. We must handle both.
    const responseText = await response.text()
    try {
      // Attempt to parse as JSON for spin results
      return JSON.parse(responseText) as PhpApiResponse
    } catch (e) {
      // If it fails, assume it's the legacy string response for 'init'
      // and wrap it in our expected object structure.
      return { stringResponse: responseText } as unknown as PhpApiResponse
    }
  } catch (error) {
    console.error('Failed to communicate with PHP engine:', error)
    throw new Error('Could not process game request due to an internal error.')
  }
}

export async function handlePhpCall(body: any, gameSession: any, user: any, wallet: any, game: any, operator: any) {
  const { gameName, action } = body
  //   const action = body?.action || body?.action || 'spin'
  //   const postData = action === 'init' || action === 'paytable' ? queryParams : body

  // const [game, shop, gameBank, wallet, gameSession] = await Promise.all([
  //     prisma.game.findFirst({ where: { name: gameName, operatorId: userProfile.operatorId ?? undefined } }),
  //     prisma.shop.findUnique({ where: { id: userProfile.shopId ?? undefined } }),
  //     prisma.gameBank.findFirst({ where: { shop_id: userProfile.shopId ?? undefined } }),
  //     prisma.wallet.findFirst({ where: { userId: userProfile.id, operatorId: userProfile.operatorId ?? undefined } }),
  //     prisma.gameSession.findFirst({ where: { userId: userProfile.id, gameName, isActive: true } }),
  // ]);

  console.log(game?.id, operator?.id, wallet?.id, gameSession?.id)
  if (!game || !operator || !wallet || !gameSession) {
    throw new Error('Required game, user, or session data not found.')
  }

  const betLevel = (body as any)?.bet_betlevel || (body as any)?.betLevel || 1
  //   const denomination = (body as any)?.bet_denomination || (body as any)?.denomination || 0.01
  const allBetInCoins = betLevel * 20

  if (action === 'spin' && wallet.balance < allBetInCoins) {
    throw new Error('Insufficient funds.')
  }

  const desiredWinType = action === 'spin' ? determineWinType(game, operator) : 'none'
  const goldsvetData = typeof game.goldsvetData === 'object' && game.goldsvetData !== null ? game.goldsvetData : {}
  const gameStateForPhp: PhpGameStateData = {
    action: action as any,
    desiredWinType: desiredWinType,
    postData: body,
    playerId: wallet.id,
    balance: wallet.balance,
    bank: operator.balance,
    gameData: (gameSession.phpGameData as Record<string, any>) ?? {},
    user: { activeOperatorId: operator.id, activeWallet: wallet },
    shop: { goldsvetData: goldsvetData.percent, maxWin: goldsvetData.maxWin },
    game: { name: game.name, goldsvetData: goldsvetData },
  }
  // console.log(gameStateForPhp)
  const phpResult = await callPhpEngine(gameName as string, gameStateForPhp)

  if (action === 'spin') {
    const result = await db.transaction(async (tx) => {
      // Create BET transaction
      await tx.insert(transactions).values({
        userId: user.id,
        type: TypeOfTransaction.BET,
        amount: -allBetInCoins,
        walletId: wallet.id,
        relatedGameId: game.id,
        description: `Bet on ${game.title}`,
        balanceBefore: wallet.balance,
        balanceAfter: wallet.balance - allBetInCoins,
        createdAt: new Date(),
      })

      // Create WIN transaction if there's a win
      if (phpResult.totalWin > 0) {
        await tx.insert(transactions).values({
          userId: user.id,
          type: TypeOfTransaction.WIN,
          amount: phpResult.totalWin,
          walletId: wallet.id,
          relatedGameId: game.id,
          description: `Win on ${game.title}`,
          balanceBefore: wallet.balance - allBetInCoins,
          balanceAfter: wallet.balance - allBetInCoins + phpResult.totalWin,
          createdAt: new Date(),
        })
      }

      // Update wallet balance
      await tx
        .update(wallets)
        .set({ balance: phpResult.newBalance, updatedAt: new Date() })
        .where(eq(wallets.id, wallet.id))

      // Update game session php data
      await tx
        .update(gameSessions)
        .set({ phpGameData: phpResult.newGameData })
        .where(eq(gameSessions.id, gameSession.id))

      // Update game statistics
      await tx
        .update(games)
        .set({
          totalWagered: sql`${games.totalWagered} + ${allBetInCoins}`,
          totalWon: sql`${games.totalWon} + ${phpResult.totalWin}`,
          updatedAt: new Date(),
        })
        .where(eq(games.id, game.id))

      // Update operator balance (was gameBank)
      if (phpResult.newBank !== undefined) {
        await tx
          .update(operators)
          .set({
            balance: phpResult.newBank,
            updatedAt: new Date(),
          })
          .where(eq(operators.id, operator.id))
      }

      return { balance: phpResult.newBalance }
    })
    return {
      success: true,
      message: 'Spin processed successfully',
      data: {
        winAmount: phpResult.totalWin,
        balance: result.balance,
        reels: phpResult.reels,
        winLines: phpResult.winLines,
        isBonus: (phpResult.totalFreeGames ?? 0) > 0,
        freeSpinState: phpResult.freeSpinState,
        isRespin: phpResult.isRespin,
      },
    }
  }
  return phpResult.stringResponse ?? ''
}
