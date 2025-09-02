import { desc, eq, } from 'drizzle-orm'
import db from '#/db'
import { deposits, users } from '#/db/'

export interface CreateDepositData {
  userId: string
  amount: number
  status?: string
  idNumber?: string
  firstName?: string
  lastName?: string
  channelsId?: string
  note?: string
  currency?: string
}

export interface DepositQueryOptions {
  limit?: number
  offset?: number
  status?: string
  userId?: string
}

/**
 * Get top 10 deposits by user based on most recently created
 * @param userId - The user ID to filter deposits for
 * @returns Array of deposits sorted by creation date (newest first)
 */
export async function getTop10DepositsByUser(userId: string): Promise<any[]> {
  if (!userId) {
    throw new Error('User ID is required')
  }

  const result = await db
    .select({
      id: deposits.id,
      userId: deposits.userId,
      amount: deposits.amount,
      status: deposits.status,
      idNumber: deposits.idNumber,
      firstName: deposits.firstName,
      lastName: deposits.lastName,
      channelsId: deposits.channelsId,
      note: deposits.note,
      currency: deposits.currency,
      createdAt: deposits.createdAt,
      updatedAt: deposits.updatedAt,
    })
    .from(deposits)
    .where(eq(deposits.userId, userId))
    .orderBy(desc(deposits.createdAt))
    .limit(10)

  return result
}

/**
 * Create a new deposit
 * @param depositData - The deposit data to create
 * @returns The created deposit
 */
export async function createDeposit(depositData: CreateDepositData): Promise<any> {
  const {
    userId,
    amount,
    // status = 'PENDING',
    // idNumber,
    // firstName,
    // lastName,
    // channelsId,
    // note,
    // currency = 'USD',
  } = depositData

  // Validate required fields
  if (!userId || !amount) {
    throw new Error('User ID and amount are required')
  }

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0')
  }

  // Check if user exists
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!user) {
    throw new Error('User not found')
  }

  // const now = new Date().toISOString()

  const [newDeposit] = await db
    .insert(deposits)
    .values(depositData)
    // .values({
    //   userId: userId, // Keep consistent with interface
    //   amount,
    //   status,
    //   idNumber,
    //   firstName,
    //   lastName,
    //   channelsId,
    //   note,
    //   currency,
    //   createdAt: now,
    //   updatedAt: now,
    // })
    .returning()

  return newDeposit
}

/**
 * Get deposit by ID
 * @param depositId - The deposit ID to retrieve
 * @returns The deposit or null if not found
 */
export async function getDepositById(depositId: string): Promise<any> {
  if (!depositId) {
    throw new Error('Deposit ID is required')
  }

  const [deposit] = await db
    .select({
      id: deposits.id,
      userId: deposits.userId,
      amount: deposits.amount,
      status: deposits.status,
      idNumber: deposits.idNumber,
      firstName: deposits.firstName,
      lastName: deposits.lastName,
      channelsId: deposits.channelsId,
      note: deposits.note,
      currency: deposits.currency,
      createdAt: deposits.createdAt,
      updatedAt: deposits.updatedAt,
    })
    .from(deposits)
    .where(eq(deposits.id, depositId))
    .limit(1)

  return deposit || null
}

/**
 * Update deposit status
 * @param depositId - The deposit ID to update
 * @param status - The new status
 * @returns The updated deposit
 */
export async function updateDepositStatus(depositId: string, status: string): Promise<any> {
  if (!depositId || !status) {
    throw new Error('Deposit ID and status are required')
  }

  const [updatedDeposit] = await db
    .update(deposits)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(deposits.id, depositId))
    .returning()

  if (!updatedDeposit) {
    throw new Error('Deposit not found')
  }

  return updatedDeposit
}