import { clearInterval } from 'timers'
import {
  //   getGameBankFromCache,
  //   getJackpotFromCache,
  // getUserBalanceFromCache,
  //   getVipXpFromCache,
  //   saveGameBankToCache,
  //   saveJackpotToCache,
  saveUserBalanceToCache,
  //   saveVipXpToCache,
} from '#/lib/cache'

// import { publishUserUpdated } from '#/lib/websocket.service'

//#region Type Definitions

/** Inferred interface for the event emitter dependency. */
interface IEmitter {
  emit(event: string, ...args: any[]): void
}

/** Inferred interface for the system/platform dependency. */
interface ISys {
  userName: string
  conn: { connection: { _closing: boolean } }
  address: number
  count_balance: number
  shopPercent: number
  bankType: string
  CreateConnection(): Promise<void>
  GetBalance(tx?: any): Promise<number>
  GetBalanceB(tx?: any): Promise<number>
  StartTransaction(): Promise<void>
  rollback(): Promise<void>
  Commit(): Promise<void>
  UpdateJackpots(bet: number, tx?: any): Promise<void>
  SetBalance(amount: number, tx?: any): Promise<void>
  SetBank(amount: number, type: 'bet' | '', tx?: any): Promise<void>
  GetBank(tx?: any): Promise<number>
  GetSettings(): Promise<any> // Replace 'any' with a specific settings interface if available
  SaveLogReport(report: { balance: number; bet: number; win: number }): void
  InternalErrorLog(error: string): void
}

/** Inferred interface for the utility functions dependency. */
interface IUtils {
  EncodeMessage(message: string): ArrayBuffer
  DecimalToHex(dec: number, padding: number): string
  HexToDecimal(hex: string): number
  RandomInt(min: number, max: number): number
  ShuffleArray<T>(array: T[]): T[]
  FixNumber(num: number): number
}

/** Game settings structure. */
interface IGameSettings {
  bets: string[]
  limits: {
    time1: number
    time2: number
    time3: number
    sum_win1: number
    sum_win2: number
    sum_win3: number
    one_win1: number
    one_win2: number
    one_win3: number
  }
}

/** Represents a fish on the scene. */
interface IFish {
  fishView: string
  sid: number
  pay: number
  tl: number
  state?: 'solo' | 'bomb' | 'flock' | 'group'
}

/** Core game state data. */
interface IGameData {
  slotState: string
  freeInfo: { count: number; index: number }
  WaveTimeLimit: number
  Bullets: any[] // Define a proper bullet type if needed
  Fishes: Record<string, IFish>
  WaveTime: number
  CurScene: number
  IsGroupFish: number
  GamePause: number
  Bet: number
  BetCnt: number
  BetArr: number[]
  BetLevel: number
}

/** Represents an incoming message from the client. */
interface IIncomingData {
  action: string
  query?: any
  messageView: Int8Array
}

//#endregion

//#region Constants

const fishPay: Record<string, number> = {
  Fish_21: 4,
  Fish_0: 20,
  Fish_22: 3,
  Fish_20: 5,
  Fish_07: 80,
  Fish_08: 60,
  Fish_05: 120,
  Fish_06: 100,
  Fish_03: 200,
  Fish_04: 150,
  Fish_01: 0,
  Fish_23: 2,
  Fish_2: 0,
  Fish_24: 2,
  Fish_9: 50,
  Fish_10: 30,
  Fish_11: 20,
  Fish_18: 7,
  Fish_19: 6,
  Fish_16: 9,
  Fish_17: 8,
  Fish_14: 12,
  Fish_15: 10,
  Fish_12: 18,
  Fish_13: 15,
}

//#endregion

export class Game {
  // Dependencies
  private emitter: IEmitter
  private sys: ISys
  private utils: IUtils

  // State
  private gameCommand: string | null = null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  private gameSettings: IGameSettings | null = null
  private gameBalanceInCents: number | null = null
  private fishesUpdateInterval: NodeJS.Timeout | null = null
  private gameData: Partial<IGameData> = {}
  private PingRequest?: IIncomingData
  private actionCounter: number = 0
  private balanceDelta: number = 0
  private jackpotContributionDelta: number = 0
  private isReady: boolean = false

  // Message Queue
  private msgHandlerStack: IIncomingData[] = []
  private msgHandlerTicker: NodeJS.Timeout
  private isProcessingMessage: boolean = false

  constructor(emitter: IEmitter, sys: ISys, utils: IUtils) {
    this.emitter = emitter
    this.sys = sys
    this.utils = utils

    this.msgHandlerTicker = setInterval(() => this.MessageCheck(), 20)
  }

  public destroy(): void {
    this.isReady = false
    if (this.msgHandlerTicker) {
      clearInterval(this.msgHandlerTicker)
    }
    this.StopFishesUpdate()
    this.syncState() // Final sync
  }

  public async IncomingDataHandler(data: IIncomingData): Promise<void> {
    if (data.action === 'areaHandler.onFire') {
      await this.Fire(data)
    } else {
      this.msgHandlerStack.push(data)
    }
  }

  private async MessageCheck(): Promise<void> {
    if (this.isProcessingMessage || this.msgHandlerStack.length === 0) {
      return
    }
    this.isProcessingMessage = true
    const data = this.msgHandlerStack.shift()

    if (!data) {
      this.isProcessingMessage = false
      return
    }

    try {
      await this.MessageHandler(data)
    } catch (e: any) {
      const detailError = {
        msg: e.message,
        stack: e.stack,
        desc: 'Game error. Check code.',
      }
      this.sys.InternalErrorLog(JSON.stringify(detailError))
    } finally {
      this.isProcessingMessage = false
    }
  }

  private async MessageHandler(data: IIncomingData): Promise<void> {
    this.gameCommand = data.action
    switch (this.gameCommand) {
      case 'heart':
        await this.Ping(data)
        break
      case 'accountHandler.twLogin':
        await this.Login(data)
        break
      case 'tableHandler.searchTableAndJoin':
        this.PingRequest = data
        await this.EnterRoom(data)
        break
      case 'accountHandler.onPingBalance':
        this.PingRequest = data
        await this.Ping(data)
        break
      case 'areaHandler.onFire':
        await this.Fire(data)
        break
      case 'areaHandler.onCollider':
        await this.Hit(data)
        break
      case 'fishHandler.fetchFishInfo':
        await this.Info(data)
        break
      case 'areaHandler.onUpdateCannon':
        await this.ChangeBet(data)
        break
      case 'tableHandler.leaveTable':
        await this.ExitRoom(data)
        break
      default:
        break
    }
  }

  private async Login(dat: IIncomingData): Promise<void> {
    const balanceInCents = await this.sys.GetBalance()
    const responsePayload = {
      responseView: [4, 0, 0, 0, 4, 1],
      answerType: '',
      data: {
        nickName: this.sys.userName,
        gender: 1,
        playerId: `accessKey|USD|${this.sys.userName}`,
        twSSOId: `accessKey|USD|${this.sys.userName}`,
        state: 0,
        role: 0,
        creditAmount: balanceInCents,
        creditCode: 'USD',
        rmpCannonCost: [1, 2, 3, 5, 8, 10, 10, 20, 30, 50, 80, 100, 100, 200, 300, 500, 800, 1000],
        denom: 0.01,
        currencySymbol: '$',
        currencyFractionDigits: 2,
        currencySymbolInBack: false,
        thousandGroupingSepartor: ',',
        decimalSeparator: '.',
        transactionBufferSize: 5,
        transactionBufferMilliseconds: 1000,
        rmpCredit: balanceInCents,
        roomLevel: 0,
        cannonLevel: 0,
        token: '72c4ab998854158b5ecf48c442b27353',
        recommendedGames: [],
        openRecommendedGamesInNewWindow: false,
        ip: '0.0.0.0',
        realIp: '0.0.0.0',
        gameId: 'GoldenDragon',
        tableId: '',
      },
      code: 200,
      type: 2,
      id: 1,
    }
    this.FormatAndSendMessage(dat, [JSON.stringify(responsePayload)], dat.messageView)
  }

  private async EnterRoom(dat: IIncomingData): Promise<void> {
    this.isReady = false
    const gameSettings = await this.sys.GetSettings()
    this.gameSettings = {
      bets: gameSettings.bet.split(','),
      limits: {
        time1: gameSettings.time1 * 60,
        time2: gameSettings.time2 * 60,
        time3: gameSettings.time3 * 60,
        sum_win1: gameSettings.sum_win1,
        sum_win2: gameSettings.sum_win2,
        sum_win3: gameSettings.sum_win3,
        one_win1: gameSettings.one_win1,
        one_win2: gameSettings.one_win2,
        one_win3: gameSettings.one_win3,
      },
    }
    this.sys.bankType = gameSettings.gamebank

    const balanceInCents = await this.sys.GetBalance()
    this.gameBalanceInCents = balanceInCents
    await saveUserBalanceToCache(this.sys.userName, this.gameBalanceInCents)

    const now = Date.now()
    this.gameData = {
      ...this.gameData,
      slotState: '',
      freeInfo: { count: -1, index: 0 },
      WaveTimeLimit: 120000,
      Bullets: [],
      Fishes: {},
      WaveTime: now,
      CurScene: 0,
      IsGroupFish: 0,
      GamePause: now,
      BetLevel: dat.query?.level ?? 0,
    }

    const level = dat.query?.level
    if (level === 0) {
      this.gameData.Bet = 0.01
      this.gameData.BetCnt = 0
      this.gameData.BetArr = [0.01, 0.02, 0.03, 0.05, 0.08, 0.1]
    } else if (level === 1) {
      this.gameData.Bet = 0.1
      this.gameData.BetCnt = 0
      this.gameData.BetArr = [0.1, 0.2, 0.3, 0.5, 0.8, 1.0]
    } else if (level === 2) {
      this.gameData.Bet = 1
      this.gameData.BetCnt = 0
      this.gameData.BetArr = [1, 2, 3, 5, 8, 10]
    } else {
      this.gameData.Bet = 0.01
      this.gameData.BetCnt = 0
      this.gameData.BetArr = [0.01, 0.02, 0.03, 0.05, 0.08, 0.1, 0.2, 0.3, 0.5, 0.8, 1.0, 2, 3, 5, 8, 10]
    }

    const response0 = {
      answerType: 'game.start',
      Balance: balanceInCents,
      curBet: this.gameData.Bet,
      responseView: [4, 0, 0, 0, 6, 'game.start'.length],
      msg: {
        area: { id: '0AB57DB3C77E99746D9E0AE0BF896412', scene: 0, state: 'started', pauseTime: 0, stage: 'normal' },
        areaPlayers: [
          {
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            playerId: `accessKey|USD|${this.sys.userName}`,
            cannonLevel: 0,
            cannonCost: 0,
            cannonMaxLen: 18,
            skin: 1,
            lockTargetId: 0,
            chairId: 0,
          },
        ],
        table: {
          _id: '0AB57DB3C77E99746D9E0AE0BF896412',
          name: '0AB57DB3C77E99746D9E0AE0BF896412',
          hostId: 'host',
          serverId: '',
          recycle: false,
          playerIds: [`accessKey|USD|${this.sys.userName}`, null, null, null],
          chairIds: [`accessKey|USD|${this.sys.userName}`, null, null, null],
          level: 0,
        },
        players: [
          {
            nickName: this.sys.userName,
            gender: 1,
            teamId: '',
            gameState: '',
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gold: 0,
            delta: 0,
            gain: 0,
            cost: 0,
            ratio: 0,
            rmpRatioCredit: 0,
            denom: 0.0,
          },
        ],
        playerId: `accessKey|USD|${this.sys.userName}`,
      },
      route: 'game.start',
      id: 0,
      type: 3,
    }

    const response1 = {
      answerType: '',
      responseView: [4, 0, 0, 0, 4, 2],
      data: {
        table: {
          _id: '0AB57DB3C77E99746D9E0AE0BF896412',
          name: '0AB57DB3C77E99746D9E0AE0BF896412',
          hostId: 'host',
          serverId: '',
          recycle: false,
          playerIds: [`accessKey|USD|${this.sys.userName}`, null, null],
          chairIds: [`accessKey|USD|${this.sys.userName}`, null, null],
          level: 0,
        },
        players: [
          {
            nickName: this.sys.userName,
            gender: 1,
            teamId: '',
            gameState: '',
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gold: 0,
            delta: 0,
            gain: 0,
            cost: 0,
            ratio: 0,
            rmpRatioCredit: 0,
            denom: 0.0,
          },
        ],
        ratio: 1,
        rmpRatioCredit: balanceInCents,
        denom: 0.01,
        roomLevel: level,
        rmpCannonCost: [1, 2, 3, 5, 8, 10, 20, 30, 50, 80, 100, 200, 300, 500, 800, 1000],
      },
      code: 200,
      type: 2,
      id: 99999,
    }

    this.FormatAndSendMessage(dat, [JSON.stringify(response0), JSON.stringify(response1)], dat.messageView)
    this.StartFishesUpdate()
    this.isReady = true
  }

  private async ExitRoom(dat: IIncomingData): Promise<void> {
    this.isReady = false
    this.StopFishesUpdate()
    await this.syncState()
    const balanceInCents = this.gameBalanceInCents ?? 0

    const response0 = {
      answerType: 'table.quit',
      responseView: [4, 0, 0, 0, 6, 'table.quit'.length],
      msg: {
        table: {
          _id: '0AB57DB3C77E99746D9E0AE0BF896412',
          name: '0AB57DB3C77E99746D9E0AE0BF896412',
          hostId: 'host',
          serverId: '',
          recycle: false,
          playerIds: [`accessKey|USD|${this.sys.userName}`, null, null],
          chairIds: [`accessKey|USD|${this.sys.userName}`, null, null],
          level: 0,
        },
        players: [
          {
            nickName: this.sys.userName,
            gender: 1,
            teamId: '',
            gameState: '',
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gold: 0,
            delta: 0,
            gain: 0,
            cost: 0,
            ratio: 0,
            rmpRatioCredit: 0,
            denom: 0.0,
          },
        ],
      },
      route: 'table.quit',
      id: 0,
      type: 3,
    }

    const response1 = {
      answerType: 'game.quit',
      responseView: [4, 0, 0, 0, 6, 'game.quit'.length],
      msg: {
        area: { id: '0AB57DB3C77E99746D9E0AE0BF896412', scene: 0, state: 'started', pauseTime: 0, stage: 'normal' },
        areaPlayers: [
          {
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            playerId: `accessKey|USD|${this.sys.userName}`,
            cannonLevel: 0,
            cannonCost: 0,
            cannonMaxLen: 18,
            skin: 1,
            lockTargetId: 0,
            chairId: 0,
          },
        ],
        players: [
          {
            nickName: this.sys.userName,
            gender: 1,
            gameServerid: '',
            conectorId: '',
            teamId: '',
            gameState: '',
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gold: balanceInCents * 100,
            delta: 0,
            gain: 0,
            cost: 1,
            ratio: 1,
            rmpRatioCredit: balanceInCents * 100,
            denom: 0.01,
          },
        ],
      },
      route: 'game.quit',
      id: 0,
      type: 3,
    }

    this.FormatAndSendMessage(dat, [JSON.stringify(response0), JSON.stringify(response1)], dat.messageView)
  }

  private Info(dat: IIncomingData): void {
    const responsePayload = {
      data: {
        scores: fishPay,
        cannonCost: (this.gameData.Bet ?? 0) * 100,
      },
      code: 200,
      type: 2,
      id: 142,
    }
    this.FormatAndSendMessage(dat, [JSON.stringify(responsePayload)], dat.messageView)
  }

  private async Fire(dat: IIncomingData): Promise<void> {
    if (!this.isReady) {
      return
    }
    const betAmount = this.gameData.Bet ?? 0
    if (betAmount <= 0) {
      return
    }

    const currentBalance = this.gameBalanceInCents ?? 0
    if (currentBalance < betAmount) {
      const response = {
        answerType: '',
        responseView: [4, 0, 0, 0, 4, 1],
        data: { message: 'Insufficient funds' },
        code: 400,
        type: 2,
        id: 99999,
      }
      this.FormatAndSendMessage(dat, [JSON.stringify(response)], dat.messageView)
      return
    }

    try {
      this.gameBalanceInCents = currentBalance - betAmount
      this.balanceDelta -= betAmount
      await saveUserBalanceToCache(this.sys.userName, this.gameBalanceInCents)

      const bulletId = this.utils.RandomInt(1, 99999999)
      const lockTargetId = dat.query?.lockId ?? 0

      const bulletPayload = {
        transactionId: '',
        createTime: Date.now(),
        areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
        playerId: `accessKey|USD|${this.sys.userName}`,
        bulletId: bulletId.toString(),
        angle: dat.query?.angle,
        cost: 0,
        lockTargetId: lockTargetId,
        chairId: 0,
        cannonlevel: 0,
        cannonskin: 1,
        level: 0,
      }

      const response0 = {
        answerType: 'game.fire',
        responseView: [4, 0, 0, 0, 6, 'game.fire'.length],
        msg: {
          player: {
            nickName: this.sys.userName,
            gender: 1,
            avatarUrl: '',
            gameServerId: 'player-server-3',
            connectorId: 'connector-server-3',
            teamId: '',
            gameId: '10007',
            tableId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gameState: 'playing',
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            gold: this.gameBalanceInCents,
            delta: betAmount,
            gain: 0,
            cost: betAmount,
            ratio: 1,
            rmpRatioCredit: this.gameBalanceInCents,
            denom: 0.01,
          },
          areaPlayer: {
            id: `accessKey|USD|${this.sys.userName}`,
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            playerId: `accessKey|USD|${this.sys.userName}`,
            cannonLevel: this.gameData.BetCnt ?? 0,
            cannonCost: betAmount * 100,
            cannonMaxLen: 18,
            skin: 1,
            lockTargetId: lockTargetId,
            chairId: 2,
          },
          bullet: bulletPayload,
        },
      }

      const response1 = {
        answerType: '',
        responseView: [4, 0, 0, 0, 4, 2],
        data: {
          bulletId: bulletId.toString(),
          cannonlevel: 0,
          cannonskin: 1,
          balance: this.gameBalanceInCents,
          roundRemaining: 0,
        },
        code: 200,
        type: 2,
        id: 6,
      }

      this.FormatAndSendMessage(dat, [JSON.stringify(response0), JSON.stringify(response1)], dat.messageView)
      this.actionCounter++
      if (this.actionCounter % 50 === 0) {
        await this.syncState()
      }
    } catch (error: any) {
      this.sys.InternalErrorLog(`[SpaceCatKA] Error in Fire action: ${error}`)
    }
  }

  private ChangeBet(dat: IIncomingData): void {
    if (!this.isReady) {
      return
    }
    if (!this.gameData.BetArr || this.gameData.BetCnt === undefined) {
      return
    }

    let betCnt = this.gameData.BetCnt
    if (dat.query?.upgrade) {
      betCnt++
    } else {
      betCnt--
    }

    betCnt = Math.max(0, Math.min(betCnt, this.gameData.BetArr.length - 1))

    this.gameData.BetCnt = betCnt
    this.gameData.Bet = this.gameData.BetArr[betCnt]

    const response = {
      answerType: 'game.updateCannon',
      Balance: this.gameBalanceInCents,
      curBet: this.gameData.Bet,
      responseView: [4, 0, 0, 0, 6, 'game.updateCannon'.length],
      msg: {
        areaPlayer: {
          areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
          playerId: `accessKey|USD|${this.sys.userName}`,
          cannonLevel: this.gameData.BetCnt,
          cannonCost: (this.gameData.Bet ?? 0) * 100,
          cannonMaxLen: 18,
          skin: 1,
          lockTargetId: 0,
          chairId: 1,
        },
      },
      route: 'game.updateCannon',
      id: 0,
      type: 3,
    }

    this.FormatAndSendMessage(dat, [JSON.stringify(response)], dat.messageView)
  }

  private async Hit(dat: IIncomingData): Promise<void> {
    if (!this.isReady) {
      return
    }
    const { Bet: allbet, BetLevel, Fishes: fishes } = this.gameData
    if (allbet === undefined || BetLevel === undefined || !fishes) {
      return
    }

    const fid = dat.query?.[0]?.fid
    const bid = dat.query?.[0]?.bid
    if (!fid || !bid) {
      return
    }

    await (this.sys as any).PerformGameAction(async (tx: any) => {
      let totalWin = 0
      let resultsPayload: any = {}
      const betAmount = this.utils.FixNumber(allbet)
      const startBalance = this.gameBalanceInCents ?? 0

      this.jackpotContributionDelta += betAmount

      const bank = await this.sys.GetBank(tx)
      console.log(bank)
      const winRatio = BetLevel === 0 ? 100 : BetLevel === 1 ? 10 : 1

      const targetFish = fishes[fid]
      if (targetFish) {
        const fishKilled = this.utils.RandomInt(1, 5)

        if (targetFish.state === 'bomb') {
          const fidsAll = Object.values(fishes).filter((f) => Date.now() - f.tl < 20000)
          const fidsToExplode = [targetFish]
          fidsToExplode.push(
            ...fidsAll.filter((f) => f.sid !== targetFish.sid).slice(0, this.utils.RandomInt(2, 5) - 1),
          )

          totalWin = fidsToExplode.reduce((sum, fish) => sum + fish.pay * betAmount, 0)
          console.log(bank >= totalWin, fishKilled, totalWin > 0)
          if (bank >= totalWin && fishKilled === 1 && totalWin > 0) {
            const fidsArr = fidsToExplode.map((f) => f.sid)
            const winsArr = fidsToExplode.map((f) => f.pay * betAmount * winRatio)
            resultsPayload = {
              bid,
              fids: fidsArr,
              ftypes: [targetFish.fishView],
              success: true,
              die: true,
              score: totalWin * winRatio,
              income: 0,
              chairId: 0,
              typeBombs: fidsArr,
              pause: [],
              diefids: fidsArr,
              winscore: winsArr,
              cannonlevel: 0,
              fishscore: winsArr,
            }
          }
        } else {
          totalWin = targetFish.pay * betAmount
          console.log(bank >= totalWin, fishKilled === 1, totalWin > 0)

          if (bank >= totalWin && fishKilled === 1 && totalWin > 0) {
            resultsPayload = {
              bid,
              fid: [],
              ftypes: [String(fid)],
              success: true,
              die: true,
              score: totalWin * winRatio,
              income: 0,
              chairId: 0,
              typeBombs: [],
              pause: [],
              diefids: [fid],
              winscore: [totalWin * winRatio],
              cannonlevel: 0,
              fishscore: [totalWin * winRatio],
              pauseTime: 0,
            }
            if (targetFish.fishView === 'Fish_01') {
              resultsPayload.pauseTime = 10000
              this.gameData.GamePause = Date.now() + 10000
            }
          }
        }
      }

      if (Object.keys(resultsPayload).length === 0) {
        totalWin = 0
        resultsPayload = {
          bid,
          fid: [],
          success: true,
          die: false,
          score: 0,
          income: 0,
          chairId: 0,
          diefids: [],
          winscore: [0],
          cannonlevel: 0,
          fishscore: [],
          pauseTime: 0,
        }
      }

      const endBalance = this.utils.FixNumber(startBalance + totalWin)
      this.gameBalanceInCents = endBalance
      await saveUserBalanceToCache(this.sys.userName, endBalance)

      if (totalWin > 0) {
        this.balanceDelta += totalWin
        await this.sys.SetBank(-totalWin, '', tx)
      }

      this.sys.SaveLogReport({ balance: endBalance, bet: betAmount, win: totalWin })

      const finalResponse = {
        answerType: 'game.colliderResult',
        Win: totalWin * 100,
        Balance: endBalance,
        curBet: betAmount,
        responseView: [4, 0, 0, 0, 6, 'game.colliderResult'.length],
        msg: {
          player: {
            gender: 0,
            id: `accessKey|USD|${this.sys.userName}`,
            gold: 0,
            delta: 0,
            gain: 0,
            cost: 0,
            ratio: 0,
            rmpRatioCredit: Math.round(endBalance * 100),
            denom: 0.0,
          },
          result: [resultsPayload],
        },
        route: 'game.colliderResult',
        id: 0,
        type: 3,
      }

      this.FormatAndSendMessage(dat, [JSON.stringify(finalResponse)], dat.messageView)
    })
  }

  private async syncBalance(): Promise<void> {
    if (this.balanceDelta === 0) {
      return
    }

    const deltaToSync = this.balanceDelta
    this.balanceDelta = 0 // Optimistic update

    try {
      await this.sys.SetBalance(deltaToSync)
    } catch (error) {
      this.balanceDelta += deltaToSync // Revert if failed
      this.sys.InternalErrorLog(`[SpaceCatKA] Balance sync failed: ${error}`)
    }
  }

  private async syncJackpots(): Promise<void> {
    if (this.jackpotContributionDelta === 0) {
      return
    }

    const deltaToSync = this.jackpotContributionDelta
    this.jackpotContributionDelta = 0 // Optimistic update

    try {
      await this.sys.UpdateJackpots(deltaToSync)
    } catch (error) {
      this.jackpotContributionDelta += deltaToSync // Revert if failed
      this.sys.InternalErrorLog(`[SpaceCatKA] Jackpot sync failed: ${error}`)
    }
  }

  private async syncState(): Promise<void> {
    await Promise.all([this.syncBalance(), this.syncJackpots()])
  }

  private FishesUpdate(): void {
    if (this.PingRequest) {
      this.Ping(this.PingRequest)
    }
  }

  private StartFishesUpdate(): void {
    this.StopFishesUpdate()
    this.fishesUpdateInterval = setInterval(() => this.FishesUpdate(), 10000)
  }

  private StopFishesUpdate(): void {
    if (this.fishesUpdateInterval) {
      clearInterval(this.fishesUpdateInterval)
      this.fishesUpdateInterval = null
    }
  }

  private Ping(dat: IIncomingData): void {
    if (!this.isReady) {
      return
    }
    const { Bet, BetCnt, GamePause, WaveTime, WaveTimeLimit, CurScene, IsGroupFish, Fishes } = this.gameData
    if (
      Bet === undefined ||
      BetCnt === undefined ||
      GamePause === undefined ||
      WaveTime === undefined ||
      WaveTimeLimit === undefined ||
      CurScene === undefined ||
      IsGroupFish === undefined ||
      !Fishes
    ) {
      return
    }

    const now = Date.now()
    const balanceInCents = this.gameBalanceInCents ?? 0
    const responses: string[] = []

    const baseResponse = {
      answerType: 'game.fire',
      responseView: [4, 0, 0, 0, 6, 'game.fire'.length],
      msg: {
        player: {
          nickName: this.sys.userName,
          gender: 1,
          avatarUrl: '',
          gameServerId: 'player-server-3',
          connectorId: 'connector-server-3',
          teamId: '',
          gameId: '10007',
          tableId: '0AB57DB3C77E99746D9E0AE0BF896412',
          gameState: 'playing',
          id: '9dab0ea6-0cb0-4b8c-951a-e10077945f2b',
          areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
          gold: 100,
          delta: Bet * 100,
          gain: 0,
          cost: Bet * 100,
          ratio: 1,
          rmpRatioCredit: balanceInCents,
          denom: 0.01,
        },
        areaPlayer: {
          id: '13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4',
          areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
          playerId: 'd607e29f-99cc-48bc-a37d-5590b80fa0f6',
          cannonLevel: BetCnt,
          cannonCost: Bet * 100,
          cannonMaxLen: 18,
          skin: 1,
          lockTargetId: 0,
          chairId: 2,
        },
      },
    }

    if (GamePause > now) {
      responses.push(JSON.stringify(baseResponse))
    } else {
      this.gameData.GamePause = now
    }

    if (now - WaveTime >= WaveTimeLimit) {
      this.gameData.Fishes = {}
      this.gameData.CurScene = (CurScene + 1) % 3
      this.gameData.WaveTime = now
      this.gameData.IsGroupFish = -1
      this.gameData.WaveTimeLimit = this.gameData.IsGroupFish === 1 ? 60000 : 120000

      const sceneChangeResponse = {
        answerType: 'game.changeScene',
        responseView: [4, 0, 0, 0, 6, 'game.changeScene'.length],
        msg: { scene: this.gameData.CurScene },
      }
      responses.push(JSON.stringify(sceneChangeResponse))
    } else {
      if (responses.length === 0) {
        responses.push(JSON.stringify(baseResponse))
      }

      const spawnedFishObjects: any[] = []
      let answerType = 'game.onSpawnFishes'
      let groupPayload: any = undefined

      if (IsGroupFish !== 1) {
        const fishCount = this.utils.RandomInt(10, 40)
        const stateArr = [
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'solo',
          'bomb',
          'flock',
          'flock',
        ]
        for (let i = 0; i < fishCount; i++) {
          const sid = this.utils.RandomInt(1, 99999999)
          const fishView = this.utils.RandomInt(0, 24)
          const state = fishView > 15 ? this.utils.ShuffleArray([...stateArr])[0] : 'solo'
          const fishViewStr = `Fish_${String(fishView).padStart(2, '0')}`

          Fishes[sid] = { fishView: fishViewStr, sid, pay: fishPay[fishViewStr] ?? 0, tl: now, state: state as any }
          spawnedFishObjects.push({
            areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
            id: sid,
            type: fishViewStr,
            amount: 1,
            born: 1584296702070,
            alive: this.utils.RandomInt(5, 10),
            state,
            path: `bezier_id_${this.utils.RandomInt(1, 22)}`,
            index: 0,
            score: 1,
            teamid: 'none',
            _id: '70AB57DB3C77E99746D9E0AE0BF896412',
            expired: 1584296782070,
          })
        }
      } else {
        answerType = 'game.onSpawnGroup'
        groupPayload = {
          state: 'group',
          group: 'group_id_rtol',
          path: [],
          seed: 1584453624058,
          alive: this.utils.RandomInt(5, 10),
        }
        const fishViewArr = [17, 18, 19, 20, 21, 22, 13, 14, 15, 16]

        const spawnGroup = (count: number, path: string) => {
          for (let i = 0; i < count; i++) {
            const sid = this.utils.RandomInt(1, 999999999)
            const fishView = this.utils.ShuffleArray([...fishViewArr])[0]
            const fishViewStr = `Fish_${String(fishView).padStart(2, '0')}`
            Fishes[sid] = { fishView: fishViewStr, sid, pay: fishPay[fishViewStr] ?? 0, tl: now, state: 'group' }
            spawnedFishObjects.push({
              areaId: '0AB57DB3C77E99746D9E0AE0BF896412',
              id: sid,
              type: fishViewStr,
              amount: 1,
              born: 1584296702070,
              alive: this.utils.RandomInt(5, 10),
              state: 'group',
              path,
              index: i,
              score: 1,
              teamid: 'none',
              _id: '0AB57DB3C77E99746D9E0AE0BF8964121',
              expired: 1584296782070,
            })
          }
        }
        spawnGroup(80, 'bezier_group_B1')
        spawnGroup(54, 'bezier_group_B2')
      }

      const freshFishes: Record<string, IFish> = {}
      for (const fishId in Fishes) {
        if (now - Fishes[fishId].tl < 20000) {
          freshFishes[fishId] = Fishes[fishId]
        }
      }
      this.gameData.Fishes = freshFishes

      if (spawnedFishObjects.length > 0) {
        const spawnResponse = {
          answerType,
          responseView: [4, 0, 0, 0, 6, answerType.length],
          msg: {
            group: groupPayload,
            fishes: spawnedFishObjects,
          },
        }
        responses.push(JSON.stringify(spawnResponse))
      }
    }

    if (responses.length > 0) {
      this.FormatAndSendMessage(dat, responses, dat.messageView)
    }
  }

  private FormatAndSendMessage(jsnMsg: IIncomingData, pAnswer: string[], messageView: Int8Array): void {
    for (const answerStr of pAnswer) {
      let parsedAnswer: any
      try {
        parsedAnswer = JSON.parse(answerStr)
      } catch (e) {
        console.error('Failed to parse answer JSON:', answerStr)
        continue
      }

      let response: ArrayBuffer

      if (jsnMsg.action === 'areaFishControl.fishHandler.fetchFishInfo') {
        const adv_char = messageView[6] !== 41 ? '+.+' : '++'
        const messagePrefix = messageView[6] !== 41 ? '+.....+' : '+....+'

        response = this.utils.EncodeMessage(messagePrefix + answerStr)

        const responseView = new Int8Array(response)
        const allDataMsg = adv_char + answerStr
        const allDataMsgStr = this.utils.DecimalToHex(allDataMsg.length, 4)

        responseView[0] = 4
        responseView[1] = 0
        responseView[2] = this.utils.HexToDecimal(allDataMsgStr.substring(0, 2))
        responseView[3] = this.utils.HexToDecimal(allDataMsgStr.substring(2, 4))
        responseView[4] = 4
        responseView[5] = messageView[5]
        if (messageView[6] !== 41) {
          responseView[6] = messageView[6]
        }
      } else {
        const answerType = parsedAnswer['answerType'] || ''
        const messageBody = answerType + answerStr
        const allDataMsg = '++' + messageBody
        const allDataMsgStr = this.utils.DecimalToHex(allDataMsg.length, 4)

        response = this.utils.EncodeMessage('+....+' + messageBody)
        const responseView = new Int8Array(response)

        responseView[0] = 4
        responseView[1] = 0
        responseView[2] = this.utils.HexToDecimal(allDataMsgStr.substring(0, 2))
        responseView[3] = this.utils.HexToDecimal(allDataMsgStr.substring(2, 4))
        responseView[4] = parsedAnswer['responseView']?.[4] ?? 0
        responseView[5] = parsedAnswer['responseView']?.[5] ?? 0
      }

      this.emitter.emit('outgoingMessage', response)

      if (jsnMsg.action === 'playerControl.tableHandler.leaveTable') {
        const leaveResponse = this.utils.EncodeMessage('+.....{"code":200}')
        const leaveResponseView = new Int8Array(leaveResponse)
        leaveResponseView[0] = 4
        leaveResponseView[1] = 0
        leaveResponseView[2] = 0
        leaveResponseView[3] = 14
        leaveResponseView[4] = 4
        leaveResponseView[5] = messageView[5]
        this.emitter.emit('outgoingMessage', leaveResponse)
      }
    }
  }
}

export function createGameController(emitter: IEmitter, sys: ISys, utils: IUtils, gameName: string): Game {
  return new Game(emitter, sys, utils)
}
