import { and, eq } from 'drizzle-orm'

import db from '#/db'
import { transactions, users, wallets, operatorSwitchHistories } from '#/db/'
import { publishUserUpdated } from '#/lib/websocket.service'
import { nanoid } from 'nanoid'
import type { Context } from 'hono'

/**
 * Debits a specified amount from a user's active wallet.
 * Throws an error if the user or wallet is not found, or if funds are insufficient.
 */
export async function debitFromwallets(
  userId: string,
  amountToDebit: number,
  description: string,
): Promise<number> {
  if (amountToDebit <= 0) {
    throw new Error('Debit amount must be positive.')
  }

return  await db.transaction(async (tx) => {
    const user = await tx.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        activeWallet: true
      },
    })

    if (!user?.activeWallet) {
      throw new Error('Active wallet not found for user.')
    }


    if (user.activeWallet.balance < amountToDebit) {
      throw new Error('Insufficient funds.')
    }

    const newBalance = user.activeWallet.balance - amountToDebit

    await tx
      .update(wallets)
      .set({ balance: newBalance })
      .where(eq(wallets.id, user.activeWallet.id))
    const id = nanoid()
    await tx.insert(transactions).values({
      id,
      walletId: user.activeWallet.id,
      userId,
      type: 'BET_PLACE',
      amount: amountToDebit,
      balanceBefore: user.activeWallet.balance,
      balanceAfter: newBalance,
      description,
    })
    return newBalance

  })

  // After the transaction is successful, notify the client with a wallet patch.
  publishUserUpdated(userId, {
    wallet: {
      // We do not know exact balance here without another query; client will refresh via snapshot if needed.
      // If you prefer an exact number, fetch the updated balance and include it.
    },
  })
}

/**
 * Credits a specified amount to a user's active wallet.
 */
export async function creditTowallets(
  userId: string,
  amountToCredit: number,
  description: string,
): Promise<void> {
  if (amountToCredit <= 0) {
    return // No need to process zero or negative credits.
  }

  await db.transaction(async (tx) => {
    const user = await tx.query.users.findFirst({
      where: eq(users.id, userId),
      with: { activeWallet: true },
    })

    if (!user?.activeWallet) {
      throw new Error('Active wallet not found for user.')
    }

    // const wallet = user.activeWallet.filter(w => w.isActive === true)[0]

    const newBalance = user.activeWallet.balance + amountToCredit

    await tx
      .update(wallets)
      .set({ balance: newBalance })
      .where(eq(wallets.id, user.activeWallet.id))
    const id = nanoid()

    await tx.insert(transactions).values({
      id,
      walletId: user.activeWallet.id,
      userId,
      type: 'BET_WIN',
      amount: amountToCredit,
      balanceBefore: user.activeWallet.balance,
      balanceAfter: newBalance,
      description,
    })
  })

  // After crediting, send an update to the client.
  publishUserUpdated(userId, {
    wallet: {
      // Optionally include balance or last transaction info
    },
  })
}

/**
 * Helpers to read auth user from context
 */
function getAuthUserId(c: Context): string {
  const user = (c as any).var?.user
  if (!user?.id) {
    throw new Error('Unauthorized')
  }
  return String(user.id)
}

/**
 * GET /wallets/me
 * Return active wallet summary for the authenticated user.
 */
export function getMyWallet(c: Context) {
  // const userId = getAuthUserId(c)
  const wallet = c.get('wallet')

  return c.json(wallet, 200)
  // Fetch user's activeWalletId then select that wallet
  // await db
  //   .select({ activeWalletId: users.activeWalletId })
  //   .from(users)
  //   .where(eq(users.id, userId))
  //   .limit(1)
  // Router's typed response expects { wallet: ... } for all outcomes;
  // return wallet: null on missing user to satisfy schema.
  // if (!u) {return c.json({ wallet: null }, 200)}

  // if (!u.activeWalletId) {
  //   // No active wallet set
  //   return c.json(
  //     {
  //       wallet: null,
  //     },
  //     200,
  //   )
}

//   const [w] = await db
//     .select({
//       id: wallets.id,
//       userId: wallets.userId,
//       operatorId: wallets.operatorId,
//       balance: wallets.balance,
//       currency: wallets.currency,
//       isActive: wallets.isActive,
//       lastUsedAt: wallets.lastUsedAt,
//       createdAt: wallets.createdAt,
//       updatedAt: wallets.updatedAt,
//     })
//     .from(wallets)
//     .where(and(eq(wallets.id, u.activeWalletId), eq(wallets.userId, userId)))
//     .limit(1)

//   return c.json({ wallet: w ?? null }, 200)
// }

/**
 * GET /wallets/history
 * List all wallets (active and inactive) for the authenticated user.
 */
export async function getWalletHistory(c: Context) {
  const userId = getAuthUserId(c)

  const data = await db
    .select({
      id: wallets.id,
      userId: wallets.userId,
      operatorId: wallets.operatorId,
      balance: wallets.balance,
      currency: wallets.currency,
      // isActive: wallets.isActive,
      lastUsedAt: wallets.lastUsedAt,
      createdAt: wallets.createdAt,
      updatedAt: wallets.updatedAt,
    })
    .from(wallets)
    .where(eq(wallets.userId, userId))

  return c.json({ wallets: data }, 200)
}

/**
 * POST /wallets/switch-operator
 * Transactionally deactivate current active wallet, activate or create the target operator wallet,
 * set users.activeWalletId, and return the new active wallet.
 *
 * Body: { operatorId: string, idempotencyKey?: string }
 */
// export async function xpostSwitchOperator(c: Context) {
//   const userId = getAuthUserId(c)
//   const body = await c.req.json().catch(() => ({}))
//   const operatorId = body?.operatorId as string | undefined
//   if (!operatorId) {
//     // Router declares BAD_REQUEST as { error: string }
//     return c.json({ error: 'operatorId is required' }, 400)
//   }

//   const result = await db.transaction(async (tx) => {
//     // Lock the user row
//     const [u] = await tx
//       .select({
//         id: users.id,
//         activeWalletId: users.activeWalletId,
//       })
//       .from(users)
//       .where(eq(users.id, userId))
//       .for('update')

//     if (!u) { throw new Error('User not found') }

//     // Deactivate current active wallet if any
//     if (u.activeWalletId) {
//       await tx
//         .update(wallets)
//         .set({ isActive: false })
//         .where(
//           and(eq(wallets.id, u.activeWalletId), eq(wallets.userId, userId)),
//         )
//     }

//     // Find existing wallet for (userId, operatorId)
//     const [existing] = await tx
//       .select({
//         id: wallets.id,
//         isActive: wallets.isActive,
//       })
//       .from(wallets)
//       .where(
//         and(eq(wallets.userId, userId), eq(wallets.operatorId, operatorId)),
//       )
//       .limit(1)
//       .for('update')

//     let targetWalletId: string

//     if (existing) {
//       // Reactivate
//       const w = await tx
//         .update(wallets)
//         .set({
//           isActive: true,
//           lastUsedAt: new Date(),
//           updatedAt: new Date(),
//         })
//         .where(eq(wallets.id, existing.id))
//         .returning({ id: wallets.id, isActive: wallets.isActive })
//       targetWalletId = w[0].id
//       // const wallet = w.filter(w =>  w.isActive === true)[0]

//     } else {
//       // Create new wallet for user/operator
//       const w = await tx
//         .insert(wallets)
//         .values({
//           id: crypto.randomUUID(),
//           userId,
//           operatorId,
//           balance: 0,
//           currency: 'USD',
//           isActive: true,
//           isDefault: false,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           lastUsedAt: new Date().toISOString(),
//         } as any)
//         .returning({ id: wallets.id })
//       targetWalletId = w[0].id
//     }

//     // Update users.activeWalletId
//     await tx
//       .update(users)
//       .set({
//         activeWalletId: targetWalletId,
//         updatedAt: new Date().toISOString() as any,
//       })
//       .where(eq(users.id, userId))

//     // Return active wallet summary
//     const [active] = await tx
//       .select({
//         id: wallets.id,
//         userId: wallets.userId,
//         operatorId: wallets.operatorId,
//         balance: wallets.balance,
//         currency: wallets.currency,
//         lastUsedAt: wallets.lastUsedAt,
//         createdAt: wallets.createdAt,
//         updatedAt: wallets.updatedAt,
//       })
//       .from(wallets)
//       .where(eq(wallets.id, targetWalletId))
//       .limit(1)

//     return active
//   })

//   // Emit WS event for wallet update
//   publishUserUpdated(userId, {
//     wallet: {
//       id: result?.id,
//       operatorId: result?.operatorId,
//       balance: result?.balance,
//       currency: result?.currency,
//       lastUsedAt: result?.lastUsedAt,
//     },
//   })

//   return c.json({ wallet: result }, 200)
// }


export async function postSwitchOperator(c: Context,  ) {
  const userId = getAuthUserId(c)
    const body = await c.req.json().catch(() => ({}))
  const newOperatorId = body?.operatorId as string | undefined
  if (!newOperatorId) {
    // Router declares BAD_REQUEST as { error: string }
    return c.json({ error: 'operatorId is required' }, 400)
  }

  const activeWallet = await db.transaction(async (tx) => {
    // 1. Get the user's CURRENT active operator before we change it.
    const currentUserState = await tx.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        activeOperatorId: true,
      },
    });

    const previousOperatorId = currentUserState?.activeOperatorId || null;

    // Prevent running if the user is already on this operator
    if (previousOperatorId === newOperatorId) {
      console.log(`User ${userId} is already active with operator ${newOperatorId}. No switch needed.`);
      return tx.query.wallets.findFirst({
        where: and(eq(wallets.userId, userId), eq(wallets.operatorId, newOperatorId))
      });
    }

    // ✨ NEW: Zero out the balance of the previous wallet if it exists.
    if (previousOperatorId) {
      await tx.update(wallets)
        .set({ balance: 0 })
        .where(and(
          eq(wallets.userId, userId),
          eq(wallets.operatorId, previousOperatorId)
        ));
    }

    // 2. Find or create the target wallet (same logic as before)
    let targetWallet = await tx.query.wallets.findFirst({
      where: and(eq(wallets.userId, userId), eq(wallets.operatorId, newOperatorId)),
    });

    if (!targetWallet) {
      const newWallets = await tx.insert(wallets).values({
        userId: userId,
        operatorId: newOperatorId,
        balance: 0,
        currency: 'USD',
      }).returning();
      targetWallet = newWallets[0];
    }
    
    if (!targetWallet) {
        throw new Error("Failed to find or create a wallet for the user and operator.");
    }

    // 3. Update the user's active operator and wallet (same logic as before)
    await tx.update(users)
      .set({
        activeOperatorId: newOperatorId,
        activeWalletId: targetWallet.id,
      })
      .where(eq(users.id, userId));

    // 4. Record the switch event in the history log (same logic as before)
    await tx.insert(operatorSwitchHistories).values({
      
      userId: userId,
      fromOperatorId: previousOperatorId,
      toOperatorId: newOperatorId,
    });

    return targetWallet;
  });

   // Emit WS event for wallet update
  publishUserUpdated(userId, {
    wallet: {
      id: activeWallet?.id,
      operatorId: activeWallet?.operatorId,
      balance: activeWallet?.balance,
      currency: activeWallet?.currency,
      lastUsedAt: activeWallet?.lastUsedAt,
    },
  })

  return c.json({ wallet: activeWallet }, 200)
}
export async function updateCashtag(c: Context, cashtag: string): Promise<string> {
  const wallet = c.get('wallet')
  if (!wallet?.id) {
    throw new Error('Unauthorized')
  }
  const updatedWallet = await db
    .update(wallets)
    .set({ cashtag })
    .where(eq(wallets.id, wallet.id)).returning()
  const uwallet = updatedWallet[0]
  return String(uwallet.cashtag)
}
