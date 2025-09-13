import db, {
  affiliateLogs,
  AffiliateLogSchema,
  transactions,
  users,
  vipCashbacks,
  VipCashbackSchema,
  vipLevels,
  VipLevelSchema,
  vipLevelUpBonuses,
  VipLevelUpBonusSchema,
  vipSpinPrizes,
  VipSpinPrizeSchema,
  vipSpinRewards,
  VipSpinRewardSchema,
  vipTiers,
  VipTiersSchema,
  wallets,
} from '#/db'
import { nanoid } from '#/utils/nanoid'
import { and, eq, gt, gte, inArray, lte, sum } from 'drizzle-orm'
// import {
//     vipTiers,
//     vipLevels,
//     vipCashback,
//     vipLevelUpBonus,
//     vipSpinPrizes,
//     vipSpinRewards,
//     affiliateLogs,
//     CreateVipTiersSchema,
//     CreateVipLevelSchema,
//     CreateVipCashbackSchema,
//     CreateVipLevelUpBonusSchema,
//     CreateVipSpinPrizeSchema,
//     CreateVipSpinRewardSchema,
//     CreateAffiliateLogSchema,
// } from './vip.schema';
import moment from 'moment'
import { z } from 'zod'

// import {
//   CreateAffiliateLogSchema,
//   CreateVipCashbackSchema,
//   CreateVipLevelSchema,
//   CreateVipLevelUpBonusSchema,
//   CreateVipSpinPrizeSchema,
//   CreateVipSpinRewardSchema,
//   CreateVipTiersSchema,

// } from './vip.schema'

// Constants
// const REWARD_WAGER_STEP = [
//     { wager: 1000, amount: 0.5 },
//     { wager: 5000, amount: 2.5 },
//     { wager: 17000, amount: 5 },
//     { wager: 49000, amount: 12 },
//     { wager: 129000, amount: 25 },
//     { wager: 321000, amount: 50 },
//     { wager: 769000, amount: 80 },
//     { wager: 1793000, amount: 120 },
//     { wager: 4097000, amount: 205 },
//     { wager: 9217000, amount: 500 }
// ];

// Helper Functions
// function getClosestStep(value: number) {
//     let left = 0;
//     let right = REWARD_WAGER_STEP.length - 1;
//     let result = null;

//     while (left <= right) {
//         const mid = Math.floor((left + right) / 2);
//         if (REWARD_WAGER_STEP[mid].wager <= value) {
//             result = REWARD_WAGER_STEP[mid];
//             left = mid + 1;
//         } else {
//             right = mid - 1;
//         }
//     }
//     return result;
// }

function getMinMaxXpLevels(levels: { xp: number }[]) {
  if (levels.length === 0) {
    return { min: null, max: null }
  }
  let min = levels[0]
  let max = levels[0]
  for (const level of levels) {
    if (level.xp < min.xp) {
      min = level
    }
    if (level.xp > max.xp) {
      max = level
    }
  }
  return { min, max }
}

// VIP Tiers Service
export const createVipTiers = async (data: z.infer<typeof VipTiersSchema>) => {
  const insertData = { ...data }
  if (!insertData.id) {
    insertData.id = nanoid()
  }
  return await db
    .insert(vipTiers)
    .values(insertData as any)
    .returning()
}

export const patchUpdateVipTiers = async (id: string, data: Partial<z.infer<typeof VipTiersSchema>>) => {
  return await db.update(vipTiers).set(data).where(eq(vipTiers.id, id)).returning()
}

export const getVipTiersById = async (id: string) => {
  return await db.query.vipTiers.findFirst({ where: eq(vipTiers.id, id) })
}

export const getVipTiersList = async () => {
  return await db.query.vipTiers.findMany({ orderBy: (vipTiers, { asc }) => [asc(vipTiers.order)] })
}

export const deleteVipTiersById = async (id: string) => {
  return await db.delete(vipTiers).where(eq(vipTiers.id, id)).returning()
}

// VIP Level Service
export const createVipLevel = async (data: z.infer<typeof VipLevelSchema>) => {
  const insertData = { ...data }
  if (!insertData.id) {
    insertData.id = nanoid()
  }
  return await db
    .insert(vipLevels)
    .values(insertData as any)
    .returning()
}

export const patchUpdateVipLevel = async (id: string, data: Partial<z.infer<typeof VipLevelSchema>>) => {
  return await db.update(vipLevels).set(data).where(eq(vipLevels.id, id)).returning()
}

export const getVipLevelById = async (id: string) => {
  return await db.query.vipLevels.findFirst({ where: eq(vipLevels.id, id) })
}

export const getVipLevels = async () => {
  return await db.select().from(vipLevels).orderBy(vipLevels.xp)
}

export const getVipLevelList = async (parentId: string) => {
  return await db.query.vipLevels.findMany({ where: eq(vipLevels.parentId, parentId) })
}

export const deleteVipLevelById = async (id: string) => {
  return await db.delete(vipLevels).where(eq(vipLevels.id, id)).returning()
}

export const deleteVipLevelByParentId = async (parentId: string) => {
  return await db.delete(vipLevels).where(eq(vipLevels.parentId, parentId)).returning()
}

// VIP Cashback Service
export const createVipCashback = async (log: z.infer<typeof VipCashbackSchema>) => {
  return await db
    .insert(vipCashbacks)
    .values(log as any)
    .returning()
}

export const bulkCreateVipCashback = async (logs: z.infer<typeof VipCashbackSchema>[]) => {
  return await db
    .insert(vipCashbacks)
    .values(logs as any)
    .returning()
}

export const patchUpdateVipCashback = async (id: string, data: Partial<z.infer<typeof VipCashbackSchema>>) => {
  return await db.update(vipCashbacks).set(data).where(eq(vipCashbacks.id, id)).returning()
}

export const getVipCashbackById = async (id: string) => {
  return await db.query.vipCashbacks.findFirst({ where: eq(vipCashbacks.id, id) })
}

export const getVipCashbackList = async (userId: string) => {
  return await db.query.vipCashbacks.findMany({ where: eq(vipCashbacks.userId, userId) })
}

export const deleteVipCashbackById = async (id: string) => {
  return await db.delete(vipCashbacks).where(eq(vipCashbacks.id, id)).returning()
}

export const weeklyCashback = async () => {
  const availableTiers = await db.query.vipTiers.findMany({
    where: eq(vipTiers.weeklyCashback, true),
    with: { levels: true },
  })

  for (const tiers of availableTiers) {
    const { min, max } = getMinMaxXpLevels(tiers.levels)
    if (min === null || max === null) {
      continue
    }

    const usersInTier = await db
      .select({
        userId: users.id,
        currency: wallets.currency,
      })
      .from(users)
      .leftJoin(wallets, eq(users.id, wallets.userId))
      .where(and(gte(users.totalXpGained, min.xp), lte(users.totalXpGained, max.xp)))

    const userIds = usersInTier.map((u) => u.userId)
    if (userIds.length === 0) {
      continue
    }

    const startWeek = moment().subtract(1, 'week').startOf('week').toDate()
    const endWeek = moment().subtract(1, 'week').endOf('week').toDate()

    const betAmounts = await db
      .select({
        userId: transactions.userId,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(
        and(
          inArray(transactions.userId, userIds),
          eq(transactions.type, 'BET'),
          gte(transactions.createdAt, startWeek),
          lte(transactions.createdAt, endWeek),
        ),
      )
      .groupBy(transactions.userId)
      .having(({ total }) => gte(total, tiers.weeklyCashbackMin))

    const logs = betAmounts.map((item) => ({
      id: nanoid(),
      userId: item.userId,
      amount: Number(item.total) * (tiers.weeklyCashbackPercent / 100),
      currency: usersInTier.find((u) => u.userId === item.userId)?.currency || 'USD',
      type: 'weekly',
      tiersName: tiers.tiersName,
      createdAt: new Date(),
    }))

    if (logs.length > 0) {
      await bulkCreateVipCashback(logs)
    }
  }
}

export const monthlyCashback = async () => {
  const availableTiers = await db.query.vipTiers.findMany({
    where: eq(vipTiers.monthlyCashback, true),
    with: { levels: true },
  })

  for (const tiers of availableTiers) {
    const { min, max } = getMinMaxXpLevels(tiers.levels)
    if (min === null || max === null) {
      continue
    }

    const usersInTier = await db
      .select({
        userId: users.id,
        currency: wallets.currency,
      })
      .from(users)
      .leftJoin(wallets, eq(users.id, wallets.userId))
      .where(and(gte(users.totalXpGained, min.xp), lte(users.totalXpGained, max.xp)))

    const userIds = usersInTier.map((u) => u.userId)
    if (userIds.length === 0) {
      continue
    }

    const startMonth = moment().subtract(1, 'month').startOf('month').toDate()
    const endMonth = moment().subtract(1, 'month').endOf('month').toDate()

    const betAmounts = await db
      .select({
        userId: transactions.userId,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(
        and(
          inArray(transactions.userId, userIds),
          eq(transactions.type, 'BET'),
          gte(transactions.createdAt, startMonth),
          lte(transactions.createdAt, endMonth),
        ),
      )
      .groupBy(transactions.userId)
      .having(({ total }) => gte(total, tiers.monthlyCashbackMin))

    const logs = betAmounts.map((item) => ({
      id: nanoid(),
      userId: item.userId,
      amount: Number(item.total) * (tiers.monthlyCashbackPercent / 100),
      currency: usersInTier.find((u) => u.userId === item.userId)?.currency || 'USD',
      type: 'monthly',
      tiersName: tiers.tiersName,
      createdAt: new Date(),
    }))

    if (logs.length > 0) {
      await bulkCreateVipCashback(logs)
    }
  }
}

// VIP Level Up Bonus Service
export const createVipLevelUpBonus = async (log: z.infer<typeof VipLevelUpBonusSchema>) => {
  return await db.insert(vipLevelUpBonuses).values(log).returning()
}

export const patchUpdateVipLevelUpBonus = async (id: string, data: Partial<z.infer<typeof VipLevelUpBonusSchema>>) => {
  return await db.update(vipLevelUpBonuses).set(data).where(eq(vipLevelUpBonuses.id, id)).returning()
}

export const getVipLevelUpBonusById = async (id: string) => {
  return await db.query.vipLevelUpBonuses.findFirst({ where: eq(vipLevelUpBonuses.id, id) })
}

export const getAvailableBonus = async (userId: string) => {
  return await db.query.vipLevelUpBonuses.findFirst({
    where: eq(vipLevelUpBonuses.userId, userId),
    orderBy: (vipLevelUpBonuses, { desc }) => [desc(vipLevelUpBonuses.createdAt)],
  })
}

export const getVipLevelUpBonusList = async () => {
  return await db.query.vipLevelUpBonuses.findMany()
}

export const deleteVipLevelUpBonusById = async (id: string) => {
  return await db.delete(vipLevelUpBonuses).where(eq(vipLevelUpBonuses.id, id)).returning()
}

export const calculateLevelUp = async (userId: string, turnover: number) => {
  const lastBonus = await db.query.vipLevelUpBonuses.findFirst({
    where: eq(vipLevelUpBonuses.userId, userId),
    orderBy: (vipLevelUpBonuses, { desc }) => [desc(vipLevelUpBonuses.levelXp)],
  })

  const nextLevel = await db.query.vipLevels.findFirst({
    where: lastBonus ? gt(vipLevels.xp, lastBonus.levelXp) : undefined,
    orderBy: (vipLevels, { asc }) => [asc(vipLevels.xp)],
    with: { parent: true },
  })

  if (nextLevel && turnover >= nextLevel.xp) {
    await createVipLevelUpBonus({
      id: nanoid(),
      userId,
      amount: nextLevel.parent.levelUpBonus,
      levelName: nextLevel.levelName,
      levelXp: nextLevel.xp,
      createdAt: new Date(),
    })

    // Affiliate logic would go here, but affiliate schema/logic is not fully defined in db/schema.ts
  }
}

// VIP Spin Prize Service
export const createVipSpinPrize = async (prize: z.infer<typeof VipSpinPrizeSchema>) => {
  return await db.insert(vipSpinPrizes).values(prize).returning()
}

export const patchUpdateVipSpinPrize = async (id: string, data: Partial<z.infer<typeof VipSpinPrizeSchema>>) => {
  return await db.update(vipSpinPrizes).set(data).where(eq(vipSpinPrizes.id, id)).returning()
}

export const getVipSpinPrizeById = async (id: string) => {
  return await db.query.vipSpinPrizes.findFirst({ where: eq(vipSpinPrizes.id, id), with: { tiers: true } })
}

export const getVipSpinPrizeList = async () => {
  return await db.query.vipSpinPrizes.findMany({ with: { tiers: true } })
}

export const getVipSpinPrizes = async () => {
  // This is a complex query that would require joining and filtering.
  // For now, returning a simplified version. A full implementation would need more complex raw SQL or advanced Drizzle features.
  return await db.query.vipSpinPrizes.findMany({
    with: {
      tiers: {
        with: {
          levels: {
            orderBy: (levels, { asc }) => [asc(levels.xp)],
            limit: 1,
          },
        },
      },
    },
  })
}

export const deleteVipSpinPrizeById = async (id: string) => {
  return await db.delete(vipSpinPrizes).where(eq(vipSpinPrizes.id, id)).returning()
}

// VIP Spin Reward Service
export const createVipSpinReward = async (log: z.infer<typeof VipSpinRewardSchema>) => {
  const insertData = { ...log }
  if (!insertData.id) {
    insertData.id = nanoid()
  }
  return await db
    .insert(vipSpinRewards)
    .values(insertData as any)
    .returning()
}

export const patchUpdateVipSpinReward = async (id: string, data: Partial<z.infer<typeof VipSpinRewardSchema>>) => {
  return await db.update(vipSpinRewards).set(data).where(eq(vipSpinRewards.id, id)).returning()
}

export const getVipSpinRewardById = async (id: string) => {
  return await db.query.vipSpinRewards.findFirst({ where: eq(vipSpinRewards.id, id) })
}

export const getVipSpinRewardList = async (userId: string) => {
  return await db.query.vipSpinRewards.findMany({ where: eq(vipSpinRewards.userId, userId) })
}

export const deleteVipSpinRewardById = async (id: string) => {
  return await db.delete(vipSpinRewards).where(eq(vipSpinRewards.id, id)).returning()
}

export const getTotalBonus = async () => {
  const result = await db.select({ total: sum(vipSpinRewards.amount) }).from(vipSpinRewards)
  return result[0]?.total || 0
}

export const getWinners = async () => {
  const winners = await db.query.vipSpinRewards.findMany({
    orderBy: (vipSpinRewards, { desc }) => [desc(vipSpinRewards.createdAt)],
    limit: 100,
    with: { user: { columns: { username: true, avatarUrl: true } } },
  })

  return winners.map((winner) => ({
    ...winner,
    playerName: winner.user.username.slice(0, 2) + '****',
  }))
}

export const getLastSpin = async (userId: string) => {
  return await db.query.vipSpinRewards.findFirst({
    where: eq(vipSpinRewards.userId, userId),
    orderBy: (vipSpinRewards, { desc }) => [desc(vipSpinRewards.createdAt)],
  })
}

// Affiliate Log Service (Partial Conversion)
export const createAffiliateLog = async (log: z.infer<typeof AffiliateLogSchema>) => {
  const insertData = { ...log }
  if (!insertData.id) {
    insertData.id = nanoid()
  }
  return await db
    .insert(affiliateLogs)
    .values(insertData as any)
    .returning()
}

export const updateAffiliateLog = async (
  condition: { invitorId: string; childId: string },
  log: Partial<z.infer<typeof AffiliateLogSchema>>,
) => {
  return await db
    .update(affiliateLogs)
    .set(log)
    .where(and(eq(affiliateLogs.invitorId, condition.invitorId), eq(affiliateLogs.childId, condition.childId)))
    .returning()
}
