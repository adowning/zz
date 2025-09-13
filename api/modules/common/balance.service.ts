import db from '#/db'
import { balances, currencies } from '#/db/schema'
import { and, eq, sql } from 'drizzle-orm'

// import vipLevelUpBonusService from './vip-level-up-bonus.service';

const getBalanceByUser = async (userId: string) => {
  const result = await db
    .select({
      id: balances.id,
      amount: balances.amount,
      bonus: balances.bonus,
      turnover: balances.turnover,
      withdrawable: balances.withdrawable,
      pending: balances.pending,

      currency: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        name: currencies.name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        icon: currencies.icon,
      },
    })
    .from(balances)
    .innerJoin(currencies, eq(balances.currencyId, currencies.id))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .where(and(eq(balances.userId, userId), eq(currencies.status, true)))
    .limit(1)

  if (result.length > 0) {
    const balanceData = result[0]
    return {
      _id: balanceData.id,
      amount: balanceData.amount,
      bonus: balanceData.bonus,
      turnover: balanceData.turnover,
      withdrawable: balanceData.withdrawable,
      pending: balanceData.pending,
      currency: balanceData.currency.name,
      icon: balanceData.currency.icon,
    }
  }
  return {}
}

const getBalanceByUserId = async (userId: string) => {
  return await db.query.balances.findFirst({
    where: eq(balances.userId, userId),
  })
}

const createBalance = async (userId: string, currencyId: string) => {
  const result = await db
    .insert(balances)
    .values({
      // id: nanoid(),
      userId,
      currencyId,
      updatedAt: new Date(),
    })
    .returning()
  return result[0]
}

const getCasinoCallbackBalances = async (userIds: string[], currencyId: string) => {
  // Drizzle doesn't have built-in ObjectId validation like Mongoose,
  // but we can filter for valid UUIDs or implement our own validation
  return await db
    .select()
    .from(balances)
    .where(and(eq(balances.currencyId, currencyId), sql`${balances.userId} = ANY(${userIds})`))
}

const withdrawBalance = async (userId: string, amount: number) => {
  const fixedAmount = Number(amount.toFixed(2))
  // For Drizzle, we need to handle conditional updates differently
  const balanceRecord = await db.query.balances.findFirst({
    where: eq(balances.userId, userId),
  })

  if (!balanceRecord) {
    return null
  }

  if (amount < 0 && balanceRecord.amount < Math.abs(amount)) {
    return null
  }

  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${fixedAmount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  return result[0]
}

const depositBalance = async (userId: string, amount: number) => {
  const fixedAmount = Number(amount.toFixed(2))

  // Update user depositCount (this might need to be moved to a separate users service)
  // For now, we'll assume this logic is handled elsewhere

  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${fixedAmount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  return result[0]
}

const creditBalance = async (userId: string, amount: number) => {
  const fixedAmount = Number(amount.toFixed(2))
  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${fixedAmount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  return result[0]
}

const debitBalance = async (userId: string, amount: number) => {
  const fixedAmount = Number(amount.toFixed(2))
  const absAmount = Math.abs(fixedAmount)
  const negativeAmount = absAmount * -1

  // First check if balance exists and has sufficient funds
  const balanceRecord = await db.query.balances.findFirst({
    where: eq(balances.userId, userId),
  })

  if (!balanceRecord || balanceRecord.amount < absAmount) {
    return false
  }

  // Perform the update
  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${negativeAmount}`,
      withdrawable: sql`${balances.withdrawable} + ${absAmount}`,
      turnover: sql`${balances.turnover} + ${absAmount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  const updatedBalance = result[0]
  // vipLevelUpBonusService.calculateLevelUp(userId, updatedBalance.turnover);
  return updatedBalance
}

const debitCreditBalance = async (userId: string, debitAmount: number, updateAmount: number) => {
  const fixedDebitAmount = Number(debitAmount.toFixed(2))
  const absDebit = Math.abs(fixedDebitAmount)
  const fixedUpdateAmount = Number(updateAmount.toFixed(2))

  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${fixedUpdateAmount}`,
      withdrawable: sql`${balances.withdrawable} + ${absDebit}`,
      turnover: sql`${balances.turnover} + ${absDebit}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  const balance = result[0]
  // vipLevelUpBonusService.calculateLevelUp(userId, balance.turnover);
  return balance
}

const depositBonus = async (userId: string, amount: number) => {
  const fixedAmount = Number(amount.toFixed(2))
  const result = await db
    .update(balances)
    .set({
      bonus: sql`${balances.bonus} + ${fixedAmount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId))
    .returning()

  return result[0]
}

const patchUpdate = async (userId: string, data: Record<string, any>) => {
  const updateData: Record<string, any> = { updatedAt: new Date() }

  // Handle increment operations
  if (data.$inc) {
    Object.entries(data.$inc).forEach(([field, value]) => {
      if (field in balances) {
        updateData[field] = sql`${balances[field as keyof typeof balances]} + ${value}`
      }
    })
  }

  // Handle set operations
  if (data.$set) {
    Object.assign(updateData, data.$set)
  }

  const result = await db.update(balances).set(updateData).where(eq(balances.userId, userId)).returning()

  return result[0]
}

export default {
  creditBalance,
  debitBalance,
  debitCreditBalance,
  getBalanceByUser,
  createBalance,
  getCasinoCallbackBalances,
  withdrawBalance,
  depositBalance,
  depositBonus,
  patchUpdate,
  getBalanceByUserId,
}
