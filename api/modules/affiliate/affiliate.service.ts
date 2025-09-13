import db, { AffiliateSchema } from '#/db'
import { affiliateLogs, affiliates, transactions, users } from '#/db/schema'
import { and, count, eq, ilike, inArray, ne, sql, sum } from 'drizzle-orm'
import moment from 'moment'
import { z } from 'zod'
import settingService from '../common/setting.service'
import { CreateAffiliateLogSchema } from './affiliate.schema'
import { hashPassword } from './utils'

// Affiliate Service
export const usernameTaken = async (username: string, id?: string) => {
  const result = await db.query.affiliates.findFirst({
    where: id ? and(eq(affiliates.username, username), ne(affiliates.id, id)) : eq(affiliates.username, username),
  })
  return !!result
}

export const emailTaken = async (email: string, id?: string) => {
  const result = await db.query.affiliates.findFirst({
    where: id ? and(eq(affiliates.email, email), ne(affiliates.id, id)) : eq(affiliates.email, email),
  })
  return !!result
}

export const getAffiliateById = async (id: string) => {
  return await db.query.affiliates.findFirst({ where: eq(affiliates.id, id) })
}

export const getAffiliateByparentId = async (parentId: string) => {
  return await db.query.affiliates.findMany({ where: eq(affiliates.parentId, parentId) })
}

export const getAffiliateByUsername = async (username: string) => {
  return await db.query.affiliates.findFirst({
    where: eq(affiliates.username, username.toLowerCase().replaceAll(' ', '')),
  })
}

export const getAffiliateByReferralCode = async (referralCode: string) => {
  return await db.query.affiliates.findFirst({ where: eq(affiliates.referralCode, referralCode) })
}

export const getAffiliateByEmail = async (email: string) => {
  return await db.query.affiliates.findFirst({ where: eq(affiliates.email, email.toLowerCase().replaceAll(' ', '')) })
}

export const createAffiliate = async (data: z.infer<typeof AffiliateSchema>) => {
  const { password, ...rest } = data
  const hashedPassword = await hashPassword(password)
  return await db
    .insert(affiliates)
    .values({ ...rest, password: hashedPassword })
    .returning()
}

export const updatePassword = async (id: string, password: string) => {
  const newPassword = await hashPassword(password)
  return await db.update(affiliates).set({ password: newPassword }).where(eq(affiliates.id, id))
}

export const patchUpdate = async (id: string, data: Partial<z.infer<typeof AffiliateSchema>>) => {
  return await db.update(affiliates).set(data).where(eq(affiliates.id, id)).returning()
}

export const getDashboard = async (filter: { parentId: string; duration: string }) => {
  const conditions = [sql`${filter.parentId} = ANY(${affiliates.path})`]
  if (filter.duration === '30') {
    const startDate = moment().subtract(30, 'days').startOf('day').toDate()
    conditions.push(sql`${affiliates.createdAt} >= ${startDate}`)
  }

  return await db
    .select({
      role: affiliates.role,
      count: count(affiliates.id),
    })
    .from(affiliates)
    .where(and(...conditions))
    .groupBy(affiliates.role)
}

export const getDashboardChildren = async (
  parentId: string,
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const childrenAffiliates = await db.query.affiliates.findMany({
    where: and(eq(affiliates.parentId, parentId), sql`${affiliates.createdAt} BETWEEN ${startDate} AND ${endDate}`),
  })

  const childrenIds = childrenAffiliates.map((a) => a.id)

  if (childrenIds.length === 0) {
    return []
  }

  const transactionData = await db
    .select({
      userId: transactions.userId,
      totalAmount: sum(transactions.amount),
      currency: transactions.currencyName,
    })
    .from(transactions)
    .where(
      and(
        inArray(transactions.userId, childrenIds),
        sql`${transactions.createdAt} BETWEEN ${startDate} AND ${endDate}`,
      ),
    )
    .groupBy(transactions.userId, transactions.currencyName)

  const setting = (await settingService.getSetting()) as any
  const rates = setting.rates

  const affiliateProfits = new Map<string, number>()

  for (const item of transactionData) {
    const rate = rates[item.currency as string] || 1
    const profit = (affiliateProfits.get(item.userId) || 0) + Number(item.totalAmount) * rate
    affiliateProfits.set(item.userId, profit)
  }

  return childrenAffiliates.map((affiliate) => {
    const profit = affiliateProfits.get(affiliate.id) || 0
    const commissionRate = setting?.commission[affiliate.role] || 0
    const commission = profit * (commissionRate / 100)
    return { ...affiliate, profit, commission }
  })
}

export const getChildrenAffiliate = async (
  parentId: string,
  filter: { username?: string; currentPage: number; rowsPerPage: number },
) => {
  const conditions = [sql`${parentId} = ANY(${affiliates.path})`, eq(affiliates.status, 'active')]
  if (filter.username) {
    conditions.push(ilike(affiliates.username, `%${filter.username}%`))
  }

  const total = await db
    .select({ value: count() })
    .from(affiliates)
    .where(and(...conditions))
  const data = await db.query.affiliates.findMany({
    where: and(...conditions),
    limit: filter.rowsPerPage,
    offset: (filter.currentPage - 1) * filter.rowsPerPage,
  })

  return { data, total: total[0].value }
}

export const getAffiliateUsers = async (
  parentId: string,
  filter: { username?: string; currentPage: number; rowsPerPage: number },
) => {
  const conditions = [sql`${parentId} = ANY(${users.path})`, eq(users.status, 'ACTIVE')]
  if (filter.username) {
    conditions.push(ilike(users.username, `%${filter.username}%`))
  }

  const total = await db
    .select({ value: count() })
    .from(users)
    .where(and(...conditions))
  const data = await db.query.users.findMany({
    where: and(...conditions),
    limit: filter.rowsPerPage,
    offset: (filter.currentPage - 1) * filter.rowsPerPage,
    with: {
      // affiliate: true,
    },
  })

  return { data, total: total[0].value }
}

export const getTreeAffiliate = async (parentId: string) => {
  const affiliatesTree = await db.query.affiliates.findMany({
    where: sql`${parentId} = ANY(${affiliates.path}) OR ${affiliates.id} = ${parentId}`,
    columns: { username: true, role: true, parentId: true },
  })

  const usersTree = await db.query.users.findMany({
    where: sql`${parentId} = ANY(${users.path})`,
    columns: { id: true, username: true, invitorId: true },
  })

  const usersAsAffiliates = usersTree.map((u) => ({
    username: u.username,
    role: 'user',
    parentId: u.invitorId,
  }))

  return [...affiliatesTree, ...usersAsAffiliates]
}

// Affiliate Log Service
export const createAffiliateLog = async (log: z.infer<typeof CreateAffiliateLogSchema>) => {
  return await db.insert(affiliateLogs).values(log).returning()
}

export const updateAffiliateLog = async (
  condition: { invitorId: string; childId: string },
  log: Partial<z.infer<typeof CreateAffiliateLogSchema>>,
) => {
  return await db
    .update(affiliateLogs)
    .set(log)
    .where(and(eq(affiliateLogs.invitorId, condition.invitorId), eq(affiliateLogs.childId, condition.childId)))
    .returning()
}

export const getCommissionRewardStatus = async (userId: string) => {
  return await db
    .select({
      currency: affiliateLogs.currency,
      totalCommissionWager: sum(affiliateLogs.commissionWager),
      totalCommissionAmount: sum(affiliateLogs.commissionAmount),
      totalReferralAmount: sum(affiliateLogs.referralAmount),
      totalReferralWager: sum(affiliateLogs.referralWager),
    })
    .from(affiliateLogs)
    .where(eq(affiliateLogs.invitorId, userId))
    .groupBy(affiliateLogs.currency)
}

export const getRewardLog = async (filter: {
  userId: string
  type: string
  currentPage: number
  rowsPerPage: number
}) => {
  const conditions = eq(affiliateLogs.invitorId, filter.userId)
  const total = await db.select({ value: count() }).from(affiliateLogs).where(conditions)

  const query = db.query.affiliateLogs.findMany({
    where: conditions,
    limit: filter.rowsPerPage,
    offset: (filter.currentPage - 1) * filter.rowsPerPage,
    with: {
      child: {
        columns: { id: true, username: true, createdAt: true },
      },
    },
  })

  const data = await query
  return { data, total: total[0].value }
}

export const getAffiliateLogByUser = async (condition: { invitorId: string; childId: string }) => {
  return await db.query.affiliateLogs.findFirst({
    where: and(eq(affiliateLogs.invitorId, condition.invitorId), eq(affiliateLogs.childId, condition.childId)),
  })
}

export const getRewardDashboard = async (userId: string, currency: string) => {
  const result = await db
    .select({
      currency: affiliateLogs.currency,
      totalBetAmount: sum(affiliateLogs.betAmount),
      totalCommissionAmount: sum(affiliateLogs.commissionAmount),
      totalCommissionWager: sum(affiliateLogs.commissionWager),
      totalReferralAmount: sum(affiliateLogs.totalReferralAmount),
      totalAvailableReferral: sum(affiliateLogs.referralAmount),
      totalReferralWager: sum(affiliateLogs.referralWager),
    })
    .from(affiliateLogs)
    .where(eq(affiliateLogs.invitorId, userId))
    .groupBy(affiliateLogs.currency)

  const data = {
    totalBetAmount: 0,
    totalCommissionAmount: 0,
    totalCommissionWager: 0,
    totalReferralAmount: 0,
    totalAvailableReferral: 0,
    totalReferralWager: 0,
  }

  const setting = await settingService.getSetting()
  const rates = setting?.rates as any[]

  result.forEach((element) => {
    const rate = 1 / (rates[parseInt(element.currency)] || 1)
    data.totalBetAmount += Number(element.totalBetAmount) * rate
    data.totalCommissionAmount += Number(element.totalCommissionAmount) * rate
    data.totalCommissionWager += Number(element.totalCommissionWager) * rate
    data.totalReferralAmount += Number(element.totalReferralAmount) * rate
    data.totalAvailableReferral += Number(element.totalAvailableReferral) * rate
    data.totalReferralWager += Number(element.totalReferralWager) * rate
  })

  const targetRate = rates[parseInt(currency)] || 1
  // Object.keys(data).forEach((key) => {
  //   data[parseInt(key)]  *= targetRate
  // })
  Object.keys(data).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    data[parseInt(key)] *= targetRate
  })

  return data
}

export const convertCommission = async (userId: string) => {
  return await db
    .update(affiliateLogs)
    .set({
      commissionWager: sql`${affiliateLogs.commissionWager} + ${affiliateLogs.commissionAmount}`,
      commissionAmount: 0,
    })
    .where(eq(affiliateLogs.invitorId, userId))
}

export const convertReferral = async (userId: string) => {
  return await db
    .update(affiliateLogs)
    .set({
      referralWager: sql`${affiliateLogs.referralWager} + ${affiliateLogs.referralAmount}`,
      referralAmount: 0,
    })
    .where(eq(affiliateLogs.invitorId, userId))
}
