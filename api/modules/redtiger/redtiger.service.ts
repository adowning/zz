import db, { GameSession, JackpotType, UserWithRelations } from '#/db'
import { jackpots } from '#/db/'
import { getGameSessionFromCache, getSpinResultFromCache, getZeroWinSpinResultFromCache } from '#/lib/cache'
import { handleGameSpin, updateGameSessionStats } from '#/lib/gameplay'
import * as jackpotService from '#/lib/jackpot'
import { sendNotificationToUser } from '#/lib/websocket.service'
import { setUserRTGSettings } from '#/modules/user/user.service'
import { addXpTousers, calculateXpForWagerAndWins } from '#/modules/vip/vip.service'
import { creditTowallets, debitFromwallets } from '#/modules/wallet/wallet.service'
import { coinsToDollars, dollarsToCoins } from '#/utils/misc.utils'
import chalk from 'chalk'
import { and, eq, inArray } from 'drizzle-orm'
import type { Context } from 'hono'
import type { z } from 'zod'
import { atlantis_settings, atlantis_spin } from './data'
import {
  providerSpinResponseDataSchema,
  rtgSettingsRequestDtoSchema,
  rtgSettingsResponseDtoSchema,
  rtgSpinRequestDtoSchema,
  rtgSpinResponseDtoSchema,
} from './rtg.schema'

type ProviderSpinResponseData = z.infer<typeof providerSpinResponseDataSchema>
type RTGSettingsRequestDto = z.infer<typeof rtgSettingsRequestDtoSchema>
type RTGSettingsResponseDto = z.infer<typeof rtgSettingsResponseDtoSchema>
type RTGSpinRequestDto = z.infer<typeof rtgSpinRequestDtoSchema>
type RTGSpinResponseDto = z.infer<typeof rtgSpinResponseDtoSchema>

const testing = false

export async function createRedtigerSettings(
  user: UserWithRelations,
  gameName: string,
  authSessionId: string,
  data: RTGSettingsRequestDto,
): Promise<RTGSettingsResponseDto | null> {
  console.log(chalk.magenta('--- createRedtigerSettings ---'))
  try {
    if (!authSessionId || !gameName || !user) {
      console.log(chalk.red('fuk'))
      return null
    }
    const gameSession = await getGameSessionFromCache(authSessionId)
    if (!gameSession) {
      console.log(chalk.red('fuk'))
      return null
    }
    let gameSettingsFromDeveloper: RTGSettingsResponseDto
    console.log(chalk.blue('testing', testing))
    if (testing) {
      gameSettingsFromDeveloper = atlantis_settings
    } else {
      const init = {
        body: JSON.stringify({
          token: data.token,
          sessionId: '0',
          playMode: 'demo',
          gameId: gameName.replace('RTG', ''),
          userData: {
            userId: data.userData!.userId,
            affiliate: '',
            lang: 'en',
            channel: 'I',
            userType: 'U',
            fingerprint: data.userData?.fingerprint,
            hash: '',
          },
          custom: { siteId: '', extras: '' },
        }),
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
      const response = await fetch(
        `https://proxy.andrews.workers.dev/proxy/gserver-rtg.redtiger.com/rtg/platform/game/settings`,
        init,
      )
      gameSettingsFromDeveloper = await response.json()
    }
    // gameSession.gameSettings = gameSettingsFromDeveloper
    console.log(chalk.magenta(JSON.stringify(gameSettingsFromDeveloper)))

    return gameSettingsFromDeveloper
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      },
    }
  }
}

export async function createRedtigerSpin(c: Context, data: RTGSpinRequestDto): Promise<RTGSpinResponseDto> {
  console.log(chalk.magenta('--- createRedtigerSpin ---'))
  const user = c.get('user') as UserWithRelations
  const gameName = `${data.gameId}RTG`
  const gameSession = c.get('gameSession') as GameSession
  console.log(chalk.magenta('user', user.id))
  console.log(chalk.magenta('gs', gameSession.id))
  if (!user || !gameSession) {
    console.log(chalk.red('fuk'))
    return {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User and game session are required.',
      },
    }
  }

  const wagerAmountCoins = dollarsToCoins(Number.parseFloat(data.stake as string))

  try {
    await debitFromwallets(user.id, wagerAmountCoins, `Wager for ${gameName}`)
    // {
    //   "token": "ed2fa00f183f7be8cdf503646cc2d169d90a21c60e7638259949d0e62195536a034a200f1dc3c60baf4008bb58c90c38f1b4f19dc4a5cfdd7d6a37d658fc5b46",
    //   "sessionId": "0",
    //   "playMode": "demo",
    //   "gameId": "777SuperStrike",
    //   "userData": {
    //     "userId": 8690666,
    //     "affiliate": "",
    //     "lang": "en",
    //     "channel": "I",
    //     "userType": "U",
    //     "fingerprint": "18d24995-0f1d-49f7-a7e6-c5346f013207"
    //   },
    //   "custom": {
    //     "siteId": "",
    //     "extras": ""
    //   },
    //   "stake": 2,
    //   "bonusId": null,
    //   "extras": null,
    //   "gameMode": 0
    // }
    let gameResultFromDeveloper: RTGSpinResponseDto | undefined
    if (testing) {
      gameResultFromDeveloper = atlantis_spin as unknown as RTGSpinResponseDto
      console.log(gameResultFromDeveloper)
    } else {
      console.log(chalk.magenta('data', JSON.stringify(data)))
      data.sessionId = '0'
      if (!data.userData.fingerprint) {
        data.userData!.fingerprint = crypto.randomUUID()
      }
      const init = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: { 'content-type': 'application/json;charset=UTF-8' },
      }
      let response: Response | undefined
      const now = Date.now()
      const timeDiff = now - user.rtgBlockTime
      console.log(user)
      if (user.rtgBlockTime !== 0) {
        if (timeDiff > 86410) {
          await setUserRTGSettings(0, user.id)
          response = await fetch(
            `https://proxy.andrews.workers.dev/proxy/gserver-rtg.redtiger.com/rtg/platform/game/spin`,
            init,
          )
        } else {
          // Use cached spin results when blocked
          const gameResult = await getZeroWinSpinResultFromCache(data.gameId as string)
          if (gameResult) {
            const zeroWin = gameResult.spinData //gameResults.find((result: { win_total: number }) => result.win_total === 0)
            if (zeroWin) {
              gameResultFromDeveloper = zeroWin as unknown as RTGSpinResponseDto
            } else {
              // Fallback to first cached result if exists
              gameResultFromDeveloper = zeroWin as unknown as RTGSpinResponseDto
            }
          } else {
            // No cached result available; perform network spin
            response = await fetch(
              `https://proxy.andrews.workers.dev/proxy/gserver-rtg.redtiger.com/rtg/platform/game/spin`,
              init,
            )
          }
        }
      } else {
        await setUserRTGSettings(0, user.id)
        response = await fetch(
          `https://proxy.andrews.workers.dev/proxy/gserver-rtg.redtiger.com/rtg/platform/game/spin`,
          init,
        )
      }
      if (!gameResultFromDeveloper) {
        if (!response) {
          throw new Error('Failed to acquire spin result or response.')
        }
        gameResultFromDeveloper = (await response.json()) as RTGSpinResponseDto
      }
    }
    // If error code 44 (blocked), update settings and try cached results once
    if (
      gameResultFromDeveloper.success === false &&
      (gameResultFromDeveloper.error?.code === '44' ||
        (typeof gameResultFromDeveloper.error?.code === 'string' && Number(gameResultFromDeveloper.error.code) === 44))
    ) {
      const _user = await setUserRTGSettings(Math.floor(Date.now() / 1000), user.id)
      c.set('user', _user)

      const gameResults = await getSpinResultFromCache(data.gameId as string)
      if (gameResults && gameResults.length > 0) {
        const gameResult = await getZeroWinSpinResultFromCache(data.gameId as string)
        if (gameResult) {
          const zeroWin = gameResult.spinData //gameResults.find((result: { win_total: number }) => result.win_total === 0)
          if (zeroWin) {
            gameResultFromDeveloper = zeroWin as unknown as RTGSpinResponseDto
          } else {
            // Fallback to first cached result if exists
            gameResultFromDeveloper = zeroWin as unknown as RTGSpinResponseDto
          }
        }
      }
    }
    console.log(JSON.stringify(gameResultFromDeveloper))

    if (!gameResultFromDeveloper.success) {
      await creditTowallets(user.id, wagerAmountCoins, `Refund for failed spin on ${gameName}`)
      return gameResultFromDeveloper
    }

    const grossWinAmountCoins = dollarsToCoins(Number.parseFloat(gameResultFromDeveloper.result!.game.win.total))

    if (grossWinAmountCoins > 0) {
      await creditTowallets(user.id, grossWinAmountCoins, `Win from ${gameName}`)
    }

    if (user.vipInfo) {
      const xpResult = calculateXpForWagerAndWins(
        wagerAmountCoins / 100, // Convert cents to dollars
        grossWinAmountCoins / 100, // Convert cents to dollars
        user.vipInfo,
      )

      if (xpResult.totalXp > 0) {
        await addXpTousers(user.id, xpResult.totalXp)
        gameSession.totalXpGained = (gameSession.totalXpGained || 0) + xpResult.totalXp
        c.set('gameSession', gameSession)
      }

      if (gameResultFromDeveloper.result?.game) {
        ;(gameResultFromDeveloper.result.game as any).xpBreakdown = xpResult
      }
    } else {
      console.warn('No VIP info found for user:', user.id)
    }

    await handleGameSpin(
      c,
      {
        gameId: gameSession.gameId ?? null,
        gameName,
        spinData: gameResultFromDeveloper.result as any,
        sessionId: '',
        id: '',
        grossWinAmount: grossWinAmountCoins,
        wagerAmount: wagerAmountCoins,
        // spinNumber: 0,
        occurredAt: new Date(),
      },
      {
        totalSpinWinnings: grossWinAmountCoins,
        wagerAmount: wagerAmountCoins,
      },
    )
    await updateGameSessionStats(c, {
      totalSpinWinnings: grossWinAmountCoins,
      wagerAmount: wagerAmountCoins,
    })

    const jackpotResult = await jackpotService.processJackpots({
      gameSpinId: 'temp-spin-id',
      wagerAmountCoins,
      gameCategory: 'SLOTS',
      userId: user.id,
    })

    const enhancedResponse = await enhanceRTGResponseWithJackpots(
      gameResultFromDeveloper.result as ProviderSpinResponseData,
      jackpotResult as any,
    )
    gameResultFromDeveloper.result = enhancedResponse

    const winAmountInDollars = coinsToDollars(grossWinAmountCoins)
    const wagerAmountInDollars = coinsToDollars(wagerAmountCoins)

    if (winAmountInDollars > wagerAmountInDollars * 100) {
      sendNotificationToUser(user.id, {
        title: 'recording:upload',
        message: JSON.stringify({
          sessionId: gameSession.id,
          reason: 'big_win',
          winAmount: winAmountInDollars,
          wagerAmount: wagerAmountInDollars,
        }),
      })
    }

    if (winAmountInDollars > 10) {
      sendNotificationToUser(user.id, {
        title: 'Big Win!',
        message: `Congratulations! You won ${winAmountInDollars.toFixed(2)} on ${gameName}!`,
      })
    }

    return gameResultFromDeveloper
  } catch (error) {
    console.error('Error creating Redtiger spin:', error)
    return {
      success: false,
      error: {
        code: 'SPIN_FAILED',
        message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      },
    }
  }
}

async function enhanceRTGResponseWithJackpots(
  originalResponse: ProviderSpinResponseData,
  jackpotResult: {
    contributions: {
      jackpotType: string
      contributionAmountCoins: number
    }[]
    jackpotWin: {
      id: string
      jackpotType: string
      winAmountCoins: number
    } | null
  },
): Promise<ProviderSpinResponseData> {
  const enhancedResponse = { ...originalResponse }

  if (jackpotResult?.contributions?.length > 0) {
    enhancedResponse.jackpots = {
      contributions: jackpotResult.contributions.map(
        (contrib: { jackpotType: string; contributionAmountCoins: number }) => ({
          type: contrib.jackpotType,
          amount: coinsToDollars(contrib.contributionAmountCoins),
          amountCoins: contrib.contributionAmountCoins,
        }),
      ),
      totalContribution: coinsToDollars(
        jackpotResult.contributions.reduce(
          (acc: number, contrib: { contributionAmountCoins: number }) => acc + contrib.contributionAmountCoins,
          0,
        ),
      ),
    }
  }

  if (jackpotResult?.jackpotWin) {
    const jackpotWin = jackpotResult.jackpotWin

    enhancedResponse.jackpots = {
      ...enhancedResponse.jackpots,
      type: jackpotWin.jackpotType,
      amount: coinsToDollars(jackpotWin.winAmountCoins),
      amountCoins: jackpotWin.winAmountCoins,
      winId: jackpotWin.id,
    }

    if (enhancedResponse.user?.balance?.cash?.atEnd) {
      const currentBalance = Number.parseFloat(enhancedResponse.user.balance.cash.atEnd)
      const newBalance = currentBalance + coinsToDollars(jackpotWin.winAmountCoins)
      enhancedResponse.user.balance.cash.atEnd = newBalance.toFixed(2)
    }

    if (enhancedResponse.game?.win?.total) {
      const currentWin = Number.parseFloat(enhancedResponse.game.win.total)
      const newWin = currentWin + coinsToDollars(jackpotWin.winAmountCoins)
      enhancedResponse.game.win.total = newWin.toFixed(2)
    }
  }

  const eligibleTypes = ['MAJOR', 'MINOR', 'GRAND']
  const currentJackpots = await db.query.jackpots.findMany({
    where: and(
      inArray(jackpots.type, eligibleTypes as (typeof jackpots.type.enumValues)[number][]),
      eq(jackpots.isActive, true),
    ),
  })
  ;(
    enhancedResponse as ProviderSpinResponseData & {
      currentJackpots: unknown[]
    }
  ).currentJackpots = currentJackpots.map((jackpot: JackpotType) => ({
    type: jackpot.type,
    amount: coinsToDollars(jackpot.currentAmountCoins),
    amountCoins: jackpot.currentAmountCoins,
  }))

  return enhancedResponse
}
