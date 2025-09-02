import chalk from 'chalk'
import { eq } from 'drizzle-orm'

import db from '#/db'
import { vipRanks } from '#/db/'

export const VIP_RANK_CONFIG = [
  {
    id: 1,
    name: 'Bronze',
    minXp: 0,
    dailyBonusCoinPct: 5,
    hourlyBonusCoinPct: 2,
    purchaseBonusCoinPct: 10,
    levelUpBonusCoinPct: 15,
    hasConcierge: false,
    hasVipLoungeAccess: false,
    isInvitationOnly: false,
  },
  {
    id: 2,
    name: 'Silver',
    minXp: 1000,
    dailyBonusCoinPct: 10,
    hourlyBonusCoinPct: 5,
    purchaseBonusCoinPct: 15,
    levelUpBonusCoinPct: 20,
    hasConcierge: false,
    hasVipLoungeAccess: true,
    isInvitationOnly: false,
  },
  {
    id: 3,
    name: 'Gold',
    minXp: 5000,
    dailyBonusCoinPct: 15,
    hourlyBonusCoinPct: 8,
    purchaseBonusCoinPct: 20,
    levelUpBonusCoinPct: 25,
    hasConcierge: true,
    hasVipLoungeAccess: true,
    isInvitationOnly: false,
  },
  {
    id: 4,
    name: 'Platinum',
    minXp: 15000,
    dailyBonusCoinPct: 20,
    hourlyBonusCoinPct: 12,
    purchaseBonusCoinPct: 25,
    levelUpBonusCoinPct: 30,
    hasConcierge: true,
    hasVipLoungeAccess: true,
    isInvitationOnly: true,
  },
  {
    id: 5,
    name: 'Diamond',
    minXp: 50000,
    dailyBonusCoinPct: 25,
    hourlyBonusCoinPct: 15,
    purchaseBonusCoinPct: 30,
    levelUpBonusCoinPct: 35,
    hasConcierge: true,
    hasVipLoungeAccess: true,
    isInvitationOnly: true,
  },
]

export async function initializevipRanks(): Promise<void> {
  try {
    const result = await db
      .select({ count: vipRanks.id })
      .from(vipRanks)
      .limit(1)

    const existingRanksCount = result.length > 0 ? Number(result[0].count) : 0

    if (existingRanksCount === 0) {
      console.log(chalk.yellow('Initializing VIP ranks...'))

      const rankData = VIP_RANK_CONFIG.map((config) => ({
        id: config.id,
        name: config.name,
        minXp: config.minXp,
        dailyBonusCoinPct: config.dailyBonusCoinPct,
        hourlyBonusCoinPct: config.hourlyBonusCoinPct,
        purchaseBonusCoinPct: config.purchaseBonusCoinPct,
        levelUpBonusCoinPct: config.levelUpBonusCoinPct,
        hasConcierge: config.hasConcierge,
        hasVipLoungeAccess: config.hasVipLoungeAccess,
        isInvitationOnly: config.isInvitationOnly,
      }))

      await db.insert(vipRanks).values(rankData)
      console.log(chalk.green('VIP ranks initialized successfully.'))
      console.log(chalk.blue('Created ranks:'))
      VIP_RANK_CONFIG.forEach((rank) => {
        console.log(chalk.blue(`  - ${rank.name} (min XP: ${rank.minXp})`))
      })
    } else {
      console.log(chalk.blue(`${existingRanksCount} VIP ranks already exist. Skipping initialization.`))
    }
  } catch (error) {
    console.error(chalk.red('Error initializing VIP ranks:'), error)
    throw new Error('Could not initialize VIP ranks')
  }
}

// Function to check if VIP ranks need to be seeded
export async function needsVipRankSeeding(): Promise<boolean> {
  try {
    const result = await db
      .select({ count: vipRanks.id })
      .from(vipRanks)
      .limit(1)

    const existingRanksCount = result.length > 0 ? Number(result[0].count) : 0
    return existingRanksCount === 0
  } catch (error) {
    console.error(chalk.red('Error checking VIP ranks seeding status:'), error)
    return true
  }
}

// Function to get all VIP ranks
export async function getAllvipRanks() {
  try {
    return await db.select().from(vipRanks)
  } catch (error) {
    console.error(chalk.red('Error fetching VIP ranks:'), error)
    throw new Error('Could not fetch VIP ranks')
  }
}

// Function to get VIP rank by ID
export async function getVipRankById(id: number) {
  try {
    const [rank] = await db
      .select()
      .from(vipRanks)
      .where(eq(vipRanks.id, id))
    return rank
  } catch (error) {
    console.error(chalk.red(`Error fetching VIP rank by ID ${id}:`), error)
    throw new Error('Could not fetch VIP rank by ID')
  }
}

// initializevipRanks()