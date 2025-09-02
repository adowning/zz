import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { randNumber } from '@ngneat/falso'
import * as schema from '../../api/db'
import { vipRanks, users, vipInfo } from '../../api/db'
import { sql, eq } from 'drizzle-orm'
const levels = [
  {

    id: 1,
    level: 1,
    name: 'Bronze',
    depositExp: 1000,
    minXp: 5000,
    uprankAward: 100,
    weekAward: 10,
    hasConcierge: false,
    hasVipLoungeAccess: false,
    isInvitationOnly: false,
    xpForNext: 20000,
    dailyBonusCoinPct: 0.01,
    hourlyBonusCoinPct: 0.01,
    levelUpBonusCoinPct: 0.01,
    purchaseBonusCoinPct: 0.01,
  },
  {
    id: 2,
    level: 2,
    name: 'Silver',
    depositExp: 5000,
    hasVipLoungeAccess: false,
    isInvitationOnly: false,   minXp: 25000,
    uprankAward: 500,
    purchaseBonusCoinPct: 0.01,
       dailyBonusCoinPct: 0.01,
       hasConcierge: false,
hourlyBonusCoinPct: 0.01,
    levelUpBonusCoinPct: 0.01,
    xpForNext: 80000,
    weekAward: 50,
  },
  {
    level: 3,
    id: 3,
    name: 'Gold',
    depositExp: 20000,
    purchaseBonusCoinPct: 0.01,
     hasVipLoungeAccess: false,
    isInvitationOnly: false,   minXp: 100000,
    hasConcierge: false,
    dailyBonusCoinPct: 0.01,
    hourlyBonusCoinPct: 0.01,
    levelUpBonusCoinPct: 0.01,
   uprankAward: 2000,
    xpForNext: 400000,

    weekAward: 200,
  },
  {
      id: 4,
  name: 'Platinum',
    purchaseBonusCoinPct: 0.01,
      hasVipLoungeAccess: false,
    isInvitationOnly: false,  depositExp: 100000,
    hasConcierge: false,
      dailyBonusCoinPct: 0.01,
    hourlyBonusCoinPct: 0.01,
    levelUpBonusCoinPct: 0.01,
   minXp: 500000,
    xpForNext: 2000000,

    uprankAward: 10000,
    weekAward: 1000,
  },
  {
    level: 5,
    id: 5,
    name: 'Diamond',
    depositExp: 500000,
      hasVipLoungeAccess: false,
    isInvitationOnly: false,    dailyBonusCoinPct: 0.01,
    purchaseBonusCoinPct: 0.01,
    hasConcierge: false,
   hourlyBonusCoinPct: 0.01,
    levelUpBonusCoinPct: 0.01,
    minXp: 2500000,
    xpForNext: 9000000,
    uprankAward: 50000,
    weekAward: 5000,
  },
]

// interface VipInfoSeed {
//   userId: string
//   level: number
//   depositExp: number
//   betExp: number
//   rankBetExp: number
//   rankDepositExp: number
//   freeSpinTimes: number
//   weekGift: number
//   monthGift: number
//   upgradeGift: number
//   nowCashBack: number
//   yesterdayCashBack: number
//   historyCashBack: number
// }

function generateRandomVipInfo(userId: string): any {
  const level = randNumber({ min: 1, max: 5 })
  const baseExp = level * 1000
  const depositExp = randNumber({ min: baseExp, max: baseExp * 10 })
  const betExp = randNumber({ min: baseExp * 5, max: baseExp * 50 })
  const id = crypto.randomUUID()
  return {
    id,
    userId,
    level,
    depositExp,
    betExp,
    xp: 0,
    totalXp: 0,
    rankBetExp: randNumber({ min: 0, max: betExp }),
    rankDepositExp: randNumber({ min: 0, max: depositExp }),
    freeSpinTimes: randNumber({ min: 0, max: 20 }),
    weekGift: randNumber({ min: 0, max: 2 }),
    monthGift: randNumber({ min: 0, max: 1 }),
    upgradeGift: randNumber({ min: 0, max: 1 }),
    nowCashBack: randNumber({ min: 0, max: 1000 }),
    yesterdayCashBack: randNumber({ min: 0, max: 1000 }),
    historyCashBack: randNumber({ min: 0, max: 5000 }),
  }
}

export async function seedVipLevels(db: NodePgDatabase<typeof schema>) {
  // const vipLevel = vipLevels
  console.log('💎 Seeding VIP levels...')
  await db.insert(vipRanks).values(levels).onConflictDoNothing()
  console.log('✅ VIP levels seeded.')

  console.log('💎 Seeding VIP info for users...')
  // Get all users who don't have vipInfo yet
  const usersWithoutVipInfo = await db
    .select({ id: users.id })
    .from(users)
    .leftJoin(vipInfo, sql`${users.id} = ${vipInfo.userId}`)
    .where(sql`${vipInfo.userId} IS NULL`)

  console.log(`Found ${usersWithoutVipInfo.length} users without VIP info`)

  // Generate and insert vipInfo for each user
  const vipInfoRecords = usersWithoutVipInfo.map((user) =>
    generateRandomVipInfo(user.id)
  )

  if (vipInfoRecords.length > 0) {
    await db.insert(vipInfo).values(vipInfoRecords)
    console.log(`✅ VIP info created for ${vipInfoRecords.length} users`)
  } else {
    console.log('ℹ️  All users already have VIP info')
  }
    for await (const record of vipInfoRecords) {
  // const [userVipInfo] = await db.select().from(schema.vipInfos).where(eq(schema.vipInfos.userId, newUser.id))
  //    console.log(userVipInfo)
  console.log(record)
      await db.update(schema.users).set({ vipInfoId: record.id }).where(eq(schema.users.id, record.userId))
  }
      // Update existing users with random data (optional, uncomment if needed)
  // const allUsers = await db.select().from(users)
  // const updatePromises = allUsers.map((user) =>
  //   db.update(vipInfo)
  //     .set(generateRandomVipInfo(user.id))
  //     .where(sql`${vipInfo.userId} = ${user.id}`)
  // )
  // await Promise.all(updatePromises)
  // console.log(`✅ VIP info updated for ${allUsers.length} users`)

  return levels
}
