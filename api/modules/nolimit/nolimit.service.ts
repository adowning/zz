import { SessionManager } from '#/lib/session.manager'
import type { NolimitClientMessage, NolimitInitResponse, NolimitServerMessage } from '#/modules/nolimit/nolimit.types'
import { addXpTousers, calculateXpForWagerAndWins } from '#/modules/vip/vip.service'
import type { WebSocketData } from '#/modules/websocket/websocket.handler'
import { toCents } from '#/utils/misc.utils'
import chalk from 'chalk'
import { debitFromwallets } from '../wallet/wallet.service'
import { checkBalance, noLimitUpdatePlayerAndShopStats } from './nolimit.utils'

export function handleNolimitSpinInitResponse(data: WebSocketData, initNoLimitSession: NolimitInitResponse) {
  console.log(data)

  initNoLimitSession.balance = data.wallet?.balance.toString()
  initNoLimitSession.balances.TOTAL_BALANCE = data.wallet?.balance.toString()
  // console.log(initNoLimitSession)
  return initNoLimitSession
  // No database calls to monitor here yet.
}

export async function handleNolimitSpinRequest(
  data: WebSocketData,
  startSpinDto: NolimitClientMessage,
): Promise<boolean> {
  console.log(chalk.cyan.bold('--- ENTERING handleNolimitSpinRequest ---'))
  if (!data.user) {
    return false
  }
  if (!data.user.currentGameSessionDataId) {
    // throw new Error('Active session not found')
    console.error('Active session not found')
    return false
  }

  console.time('getGameSession_request')
  const session = await SessionManager.getGameSession(data.user.currentGameSessionDataId)
  console.timeEnd('getGameSession_request')

  if (!session) {
    console.log('game session not found ', data.user.currentGameSessionDataId)
    return false
  }
  const betAmount = toCents(startSpinDto.content.bet)

  console.time('checkBalance_request')
  const balanceCheck = await checkBalance(data.user.activeWalletId as string, betAmount)

  console.timeEnd('checkBalance_request')

  if (!balanceCheck.success) {
    console.log('nsf  ', data.user.currentGameSessionDataId)
    return false
  }
  // take money from wallet if balance ok
  console.time('noLimitUpdatePlayerAndShopStats_request')
  console.log(chalk.cyan('debiting wallet ', data.user.activeWalletId, ' for amount ', betAmount))
  if (betAmount > 0) {
    const newBalance = await debitFromwallets(data.user.id, betAmount, `gameSession ${data.gameSession.id}`)
  console.log(chalk.cyan(' wallet ', data.user.activeWalletId, '  newBalance ', newBalance))
    // spinResponse.balance = newBalance.toString()
    // spinResponse.balances.TOTAL_BALANCE = newBalance.toString()
  }
  console.timeEnd('noLimitUpdatePlayerAndShopStats_request')
  return true
}

export function handleNolimitSpinResponse(data: WebSocketData, spinResponse: NolimitServerMessage): any {
  console.log(chalk.blue.bold('--- ENTERING handleNolimitSpinResponse ---'))
  const nextMode = spinResponse.game.nextMode
  if(!spinResponse.game){
    console.log(spinResponse)
  }
  const startingBalance = data.gameSession.startingBalance

  console.log(chalk.blue('spinResponse.game.playedBetValue', spinResponse.game.playedBetValue))
  console.log(chalk.blue('spinResponse.game.accumulatedRoundWin', spinResponse.game.accumulatedRoundWin))
  const betAmount = toCents(spinResponse.game.playedBetValue)
  const winAmount = toCents(spinResponse.game.accumulatedRoundWin)
  console.log(chalk.blue('startingBalance', startingBalance))
  console.log(chalk.blue('winAmount', winAmount))
  console.log(chalk.blue('betAmount', betAmount))
  const newBalance = (data.wallet.balance ?? startingBalance) + (winAmount ?? 0) - betAmount
  console.log(chalk.blue('newBalance', newBalance))
  if (nextMode === 'NORMAL_AVALANCHE' || nextMode === 'FREE_SPIN') {
    console.log(chalk.blue('Next mode is ', nextMode, ' skipping wallet update'))
    spinResponse.balance = newBalance.toString()
    spinResponse.balances.TOTAL_BALANCE = newBalance.toString()
    return spinResponse
  }
  data.wallet.balance = newBalance
  const xpAmt = calculateXpForWagerAndWins(betAmount, winAmount, data.vipInfo)
  data.vipInfo.totalXp = xpAmt.totalXp
  data.vipInfo.xp = xpAmt.baseXp

  addXpTousers(data.user.id, xpAmt.totalXp)
  noLimitUpdatePlayerAndShopStats(
    betAmount,
    winAmount,
    newBalance,
    data, // Pass starting balance here
    spinResponse as NolimitServerMessage,
  )
  spinResponse.balance = newBalance.toString()
  spinResponse.balances.TOTAL_BALANCE = newBalance.toString()

  // Create a safe copy of the data without circular references
  // const safeVipInfo = {
  // //   level: data.vipInfo.level,
  //   xp: data.vipInfo.xp,
  //   totalXp: data.vipInfo.totalXp
  // }
  // const safeWallet = {
  //   balance: data.wallet.balance
  // }

  // spinResponse.messages.push({
  //   vipInfo: safeVipInfo,
  //   wallet: safeWallet
  // })
  // console.log(spinResponse.balance)
  return spinResponse
}
