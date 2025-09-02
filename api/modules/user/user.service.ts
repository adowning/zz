import type { z } from '@hono/zod-openapi'
import type { createInsertSchema } from 'drizzle-zod'

import { eq, ilike, or } from 'drizzle-orm'

import db from '#/db'
import { users } from '#/db/'

import type { Newusers } from '../../db/'

export function findManyUser(
  limit?: number,
  offset?: number,
  filter?: { username?: string; email?: string },
) {
  const query = db.select().from(users)

  if (filter) {
    const { username, email } = filter
    if (username || email) {
      query.where(
        or(
          username ? ilike(users.username, `%${username}%`) : undefined,
          email ? ilike(users.email, `%${email}%`) : undefined,
        ),
      )
    }
  }

  if (limit) {
    query.limit(limit)
  }

  if (offset) {
    query.offset(offset)
  }

  return query
}

export function createUser(
  data: z.infer<ReturnType<typeof createInsertSchema>>,
) {
  return db.insert(users).values(data).returning()
}

export function findUserById(id: string) {
  return db.select().from(users).where(eq(users.id, id))
}

export function updateUser(id: string, data: Partial<Newusers>) {
  // @ts-expect-error - User type mismatch expected
  return db.update(User).set(data).where(eq(User.id, id)).returning()
}

export function deleteUser(id: string) {
  return db.delete(users).where(eq(users.id, id)).returning()
}

// From Pinia Store & HAR files

export function checkUser(userId: string) {
  // Assuming a simple check that returns the user if they exist
  return findUserById(userId)
}

// export async function getUserBalance(userId: string) {
//   return  db.select().from(balances).where(eq(balances.userId, userId));
// }

// export async function setUserCurrency(currencyCode: string) {
//   // This is a simplified example. A real implementation would be more complex.
//   const currency =  db
//     .select()
//     .from(currencies)
//     .where(eq(currencies.code, currencyCode));
//   if (currency.length === 0) {
//     throw new Error("Invalid currency code");
//   }
//   // Logic to update user's currency preference would go here.
//   // For now, we'll just return the currency.
//   return currency[0];
// }

export function sendEmailVerification(userId: string) {
  // Placeholder for sending a verification email
  console.log(`Sending verification email to user`, userId)
  return { status: 'ok', time: Date.now() }
}

export function getUserInfo(userId: string) {
  return findUserById(userId)
}

export function getVipInfo(userId: string) {
  // Assuming vip info is part of the users table for now
  return db
    .select({ vipInfo: users.vipInfoId })
    .from(users)
    .where(eq(users.id, userId))
}

// New Routes
export function getUserAmount() {
  // Placeholder, you will need to implement the actual logic
  return {
    amount: 1000,
    currency: { fiat: true, name: 'USD', symbol: '$', type: 'fiat' },
    withdraw: 500,
    rate: 1,
  }
}
export function setUserRTGSettings(time: number, userId: string) {
  console.log(time)
  console.log(userId)
  return db.update(users).set({ rtgBlockTime: time }).where(eq(users.id, userId)).returning()
}
export function updateUserInfo(data: Newusers) {
  // Placeholder, you will need to implement the actual logic
  return { data }
}

export function updateEmail(data: { email: string; password: string }) {
  // Placeholder, you will need to implement the actual logic
  return { ...data }
}

export function updatePassword(data: {
  now_password: string;
  new_password: string;
}) {
  // Placeholder, you will need to implement the actual logic
  console.log(data)
}

export function suspendUser(data: { time: number }) {
  // Placeholder, you will need to implement the actual logic
  console.log(data)
}

// export async function getBalanceList() {
//   return  db.select().from(balances);
// }

// Game Routes
export function enterGame() {
  // Placeholder
  return {}
}

export function userGame() {
  // Placeholder
  return []
}

export function favoriteGame() {
  // Placeholder
  return { success: true }
}

// export async function getGameHistory(userId: string) {
//   return  db.select().from(GameHistory).where(eq(gameHistory.userId, userId));
// }

export function spinPage() {
  // Placeholder
  return {}
}

export function spin() {
  // Placeholder
  return {}
}

export function favoriteGameList() {
  // Placeholder
  return []
}
