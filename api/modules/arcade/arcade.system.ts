import { EventEmitter } from 'events'
import db from '#/db'
// Import your auto-generated schema tables.
import * as schema from '#/db/schema'
import { gameSpins } from '#/db/schema'
import chalk from 'chalk'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { GameSession, User } from '~/types'
import { debitFromwallets } from '../wallet/wallet.service'
import { Utils } from './arcade.utils' // Assuming this Utils class exists and is in the same directory

// A generic type for the Drizzle instance. Replace `any` with the specific type
// from your Drizzle driver if you have it (e.g., `PostgresJsDatabase<typeof schema>`).
type DrizzleDB = any

/**
 * Interface for the system/platform dependency.
 */
export interface ISys {
  userName: string
  conn: { connection: { _closing: boolean } }
  address: number
  count_balance: number
  shopPercent: number
  bankType: string
  CreateConnection(): Promise<void>
  GetBalance(tx?: DrizzleDB): Promise<number>
  GetBalanceB(tx?: DrizzleDB): Promise<number>
  StartTransaction(): Promise<void>
  rollback(): Promise<void>
  Commit(): Promise<void>
  UpdateJackpots(bet: number, tx?: DrizzleDB): Promise<void>
  SetBalance(amount: number, tx?: DrizzleDB): Promise<void>
  SetBank(amount: number, type: 'bet' | '', tx?: DrizzleDB): Promise<void>
  GetBank(tx?: DrizzleDB): Promise<number>
  GetSettings(): Promise<any>
  SaveLogReport(report: { balance: number; bet: number; win: number }): void
  InternalErrorLog(error: string): void
}

export class System implements ISys {
  public emitter: EventEmitter
  public utils: Utils
  public gameName: string = ''
  public userId: string = ''
  public user: User
  public gameSession: GameSession
  public userName: string = ''
  public operatorId: string = ''
  public bankType: string = 'balance'
  public conn: { connection: { _closing: boolean } } = { connection: { _closing: false } }
  public address: number = 0
  public count_balance: number = 0
  public shopPercent: number = 0

  private db: DrizzleDB
  private activeTicker: NodeJS.Timeout

  constructor(
    db: DrizzleDB,
    user: User,
    gameSession: GameSession,
    emitter: EventEmitter,
    utils: Utils,
    userId: string,
    bank = 'balance',
  ) {
    this.db = db
    this.emitter = emitter
    this.gameSession = gameSession
    this.user = user
    this.bankType = bank
    this.utils = utils
    this.userId = userId
    this.activeTicker = setInterval(() => this.CheckActive(), 30000) // Check every 30 seconds
  }

  public ClearTicker(): void {
    clearInterval(this.activeTicker)
  }

  public setGameName(gameName: string): void {
    this.gameName = gameName
  }

  public setAuthenticatedUser(userId: string, userName: string, operatorId: string): void {
    this.userId = userId
    this.userName = userName
    this.operatorId = operatorId
    this.emitter.emit('AuthAccept')
  }

  private async CheckActive(): Promise<void> {
    if (!this.userId) {
      return
    }

    try {
      const userResult = await this.db
        .select({ isActive: schema.users.isActive })
        .from(schema.users)
        .where(eq(schema.users.id, this.userId))

      const user = userResult[0]

      if (!user || !user.isActive) {
        this.emitter.emit('CloseSocket')
        this.ClearTicker()
      }
    } catch (error) {
      console.error('Error checking user active status:', error)
      this.emitter.emit('CloseSocket')
      this.ClearTicker()
    }
  }

  public CreateConnection(): Promise<void> {
    // Drizzle handles connections automatically.
    return Promise.resolve()
  }

  public async GetBalance(tx?: DrizzleDB): Promise<number> {
    console.log(chalk.yellowBright('GetBalance'))
    if (!this.userId) {
      throw new Error('User not authenticated. Cannot get balance.')
    }
    const dbClient = tx || this.db

    const userResult = await dbClient
      .select({ activeWalletId: schema.users.activeWalletId })
      .from(schema.users)
      .where(eq(schema.users.id, this.userId))

    const user = userResult[0]
    if (!user || !user.activeWalletId) {
      console.warn(`User ${this.userId} has no active wallet.`)
      return 0
    }

    const walletResult = await dbClient
      .select({ balance: schema.wallets.balance })
      .from(schema.wallets)
      .where(eq(schema.wallets.id, user.activeWalletId))

    const wallet = walletResult[0]
    return wallet?.balance ?? 0
  }

  public GetBalanceB(tx?: any): Promise<number> {
    return this.GetBalance(tx)
  }

  public async StartTransaction(): Promise<void> {
    // This is a conceptual placeholder for transaction logic flow.
  }

  public async rollback(): Promise<void> {
    // In a Drizzle transaction, you throw an error to trigger a rollback.
    // await console.log("Rolling back transaction...");
  }

  public Rollback(): Promise<void> {
    // Capitalized version required by SystemLib interface
    return this.rollback()
  }

  public async Commit(): Promise<void> {
    // A Drizzle transaction commits automatically on successful completion.
    // await console.log("Committing transaction...");
  }

  public async UpdateJackpots(amount: number): Promise<void> {
    // Updated to match SystemLib interface signature
    const contributionRate = 0.01
    const contribution = amount * contributionRate

    await this.db.update(schema.jackpots).set({
      currentAmountCoins: sql`${schema.jackpots.currentAmountCoins} + ${Math.floor(contribution * 100)}`,
    })
  }

  public async SetBalance(amount: number): Promise<void> {
    console.log(chalk.yellowBright('Setting Balance'))

    if (!this.userId) {
      throw new Error('User not authenticated. Cannot set balance.')
    }
    // const dbClient = tx || this.db;
    const amountInCents = amount * 100

    // const userResult = await dbClient
    //     .select({ activeWalletId: schema.users.activeWalletId })
    //     .from(schema.users)
    //     .where(eq(schema.users.id, this.userId));
    await debitFromwallets(this.userId, Math.abs(amountInCents), `gameSession ${this.gameSession.id}`)

    // const user = userResult[0];
    // if (!user || !user.activeWalletId) {
    //     throw new Error(`Cannot set balance: User ${this.userId} has no active wallet.`);
    // }

    // await dbClient
    //     .update(schema.wallets)
    //     .set({ balance: sql`${schema.wallets.balance} + ${amountInCents}` })
    //     .where(eq(schema.wallets.id, user.activeWalletId));
  }

  public async SetBank(amount: number, type: 'bet' | '', tx?: DrizzleDB): Promise<void> {
    if (!this.operatorId) {
      throw new Error('Operator ID not set. Cannot set bank.')
    }
    const dbClient = tx || this.db
    const fieldToUpdate = this.bankType || 'balance'

    const finalAmount = parseFloat(amount.toFixed(2))

    // Type-safe column mapping to fix TypeScript error
    const updateData: any = {}

    switch (fieldToUpdate) {
      case 'balance':
        updateData.balance = sql`${schema.operators.balance} + ${Math.floor(finalAmount * 100)}`
        break
      case 'netRevenue':
        updateData.netRevenue = sql`${schema.operators.netRevenue} + ${Math.floor(finalAmount * 100)}`
        break
      default:
        throw new Error(`Unsupported bank type: ${fieldToUpdate}. Use 'balance' or 'netRevenue'`)
    }

    await dbClient.update(schema.operators).set(updateData).where(eq(schema.operators.id, this.operatorId))
  }

  public async GetBank(tx?: DrizzleDB): Promise<number> {
    if (!this.operatorId) {
      throw new Error('Operator ID not set. Cannot get bank.')
    }
    const dbClient = tx || this.db
    const bankColumn = this.bankType || 'balance'
    console.log(bankColumn)
    let operatorResult
    // Type-safe column mapping to fix TypeScript error
    switch (bankColumn) {
      case 'balance':
        operatorResult = await dbClient
          .select({ bankValue: schema.operators.balance })
          .from(schema.operators)
          .where(eq(schema.operators.id, this.operatorId))
        break
      case 'netRevenue':
        operatorResult = await dbClient
          .select({ bankValue: schema.operators.netRevenue })
          .from(schema.operators)
          .where(eq(schema.operators.id, this.operatorId))
        break
      default:
        throw new Error(`Unsupported bank type: ${bankColumn}. Use 'balance' or 'netRevenue'`)
    }

    const operator = operatorResult[0]
    if (!operator) {
      return 0
    }

    const bankValue = operator.bankValue ?? 0
    return typeof bankValue === 'number' ? bankValue / 100 : parseInt(bankValue as string) / 100
  }

  public async GetSettings(): Promise<any> {
    if (!this.gameName) {
      return {}
    }

    const gameResult = await this.db.select().from(schema.games).where(eq(schema.games.name, this.gameName))

    const game = gameResult[0]
    if (!game) {
      return {}
    }

    const gameSettings = game.meta && typeof game.meta === 'object' ? game.meta : {}

    return {
      bet: '1,2,3,5,8,10,20,30,50,80,100,200,300,500,800,1000',
      gamebank: 'balance',
      time1: 10,
      time2: 20,
      time3: 30,
      sum_win1: 1000,
      sum_win2: 2000,
      sum_win3: 3000,
      one_win1: 100,
      one_win2: 200,
      one_win3: 300,
      ...gameSettings,
    }
  }

  public createSpinRecord(
    betAmount: number,
    winAmount: number,
    user: User,
    gameSession: GameSession,
    newBalance: number,
  ): any {
    //   const spinNumber = Number.parseInt(serverMessage.id.split('-')[1] ?? '0', 10) || 0

    return {
      // sessionDataId: data.gameSession.id,
      id: nanoid(),
      playerName: user?.username,
      playerAvatar: user?.avatarUrl,
      gameName: gameSession.gameName,
      sessionId: gameSession.id,
      userId: user.id,
      gameId: gameSession.gameId ?? gameSession.id,
      playerBalanceAtStart: this.count_balance,
      playerBalance: newBalance,
      betAmount: betAmount ?? 0,
      winAmount: winAmount ?? 0,
      gamePlayerWinTotalTodayid: 0,
      playerBetTotalToday: 0,
      sessionTotalWinAmount: 0,
      sessionTotalBetAmount: 0,
      gameSessionRtp: 0,
      playerRtpToday: 0,
      type: 'nolimit',
      status: 'COMPLETED',
      grossWinAmount: (winAmount ?? 0) / 100,
      wagerAmount: (betAmount ?? 0) / 100,
      currencyId: 'USD',
      createdAt: new Date(),
      updatedAt: new Date(),
      occurredAt: new Date(),
    }
  }
  public async SaveLogReport(report: { balance: number; bet: number; win: number }): Promise<void> {
    // Made async to match SystemLib interface requirements
    // console.log("Game Log Report:", {
    //     userId: this.userId,
    //     gameName: this.gameName,
    //     ...report,
    //     timestamp: new Date().toISOString(),
    // });

    const spinRecord = this.createSpinRecord(report.bet, report.win, this.user, this.gameSession, this.count_balance)

    await db.insert(gameSpins).values(spinRecord)

    // userId: this.userId,
    // gameName: this.gameName,
    // betAmount: Math.floor(report.bet * 100),
    // winAmount: Math.floor(report.win * 100),
    // bet: report.bet,
    // win: report.win,
    // balance: report.balance,
    // grossWinAmount: report.win,
    // wagerAmount: report.bet,
    // sessionId: crypto.randomUUID(),
    // occurredAt: new Date(),
    // }).returning();
  }

  public InternalErrorLog(error: string): void {
    // Made async to match SystemLib interface requirements
    console.error('Internal Game Error:', {
      error,
      userId: this.userId,
      gameName: this.gameName,
      timestamp: new Date().toISOString(),
    })
  }

  public PerformGameAction<T>(action: (tx: DrizzleDB) => Promise<T>): Promise<T> {
    return this.db.transaction(action)
  }
}
