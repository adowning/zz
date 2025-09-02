import { randNumber, randPassword, randPastDate, randUserName } from '@ngneat/falso'
import { eq, sql,  } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../api/db/schema'
import db from '../../api/db/'

export async function seedUsers( count: number, operatorId: string) {
  console.log(`🌱 Seeding ${count} random users, each with a wallet...`)

  const allVipLevels = await db.select().from(schema.vipRanks)

  if (allVipLevels.length === 0) {
    throw new Error('VIP levels must be seeded before users.')
  }

  for (let i = 0; i < count; i++) {
    const username = randUserName()
    const password = randPassword()
    const hashedPassword = await Bun.password.hash(password)
    const createdAt = randPastDate({ years: 1 })
    const avatarN = randNumber({ min: 1, max: 9 })
    const playerAvatar = `avatar-0${avatarN}.webp`

    await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(schema.users)
        .values({
          username: username,
          totalXpGained: 0,
          passwordHash: hashedPassword,
          createdAt,
          avatarUrl: playerAvatar,
          // vipLevel: rand(allVipLevels).level,
        })
        .returning()
    
      const initialBalance = randNumber({ min: 1000, max: 20000 })

      const walletId = crypto.randomUUID()
     const [newWallet] = await tx.insert(schema.wallets).values({
        id: walletId,
        userId: newUser.id,
        balance: initialBalance,
        operatorId: operatorId,
      }).returning()

      if (!newWallet) {
        throw new Error(`Wallet not found for user ${newUser.id}`)
      }

     const x = await db.update(schema.users).set({ activeWalletId: newWallet.id }).where(eq(schema.users.id, newUser.id))
      await  db.update(schema.users)
      .set({ activeWalletId: newWallet.id })
      .where(sql`${schema.users.id} = ${newUser.id}`)

     console.log(x)
     // await tx.insert(schema.balances).values({
      //   userId: newUser.id,
      //   amount: initialBalance,
      //   availableBalance: initialBalance,
      // })

      await tx.insert(schema.authSessions).values({
        userId: newUser.id,
        status: 'ACTIVE',
      })

      console.log(`👤 Created user '${username}' (Password: ${password}) with an associated wallet and auth session.`)
    })
  }
}

export async function seedHardcodedUser(db: NodePgDatabase<typeof schema>, operatorId: string) {
  console.log("🔒 Seeding hardcoded user 'asdf' with a wallet...")
  const username = 'asdf'
  const password = 'asdfasdf'

  const [existingUser] = await db.select().from(schema.users).where(eq(schema.users.username, username))

  if (existingUser) {
    console.log("✅ Hardcoded user 'asdf' already exists.")
    return
  }

  const hashedPassword = await Bun.password.hash(password)
  await db.transaction(async (tx) => {
    const [newUser] = await tx
      .insert(schema.users)
      .values({
        username,
        totalXpGained: 0,
        avatarUrl: `avatar-01.webp`,
        passwordHash: hashedPassword,
        // vipLevel: 1,
      })
      .returning()
    const walletId = crypto.randomUUID()
  const [newWallet] = await tx.insert(schema.wallets).values({
      id: `wallet_${walletId}`,
      userId: newUser.id,
      operatorId: operatorId,
      balance: 50000,
    }).returning()
    console.log(newWallet)
    await db.update(schema.users).set({ activeWalletId: newWallet.id }).where(eq(schema.users.id, newUser.id))
    // await tx.insert(schema.balances).values({
    //   userId: newUser.id,
    //   amount: 50000,
    //   availableBalance: 50000,
    // })

    await tx.insert(schema.authSessions).values({
      userId: newUser.id,
      status: 'ACTIVE',
    })
  })

  console.log(`✅ Hardcoded user 'asdf' created. Password is '${password}'`)
}
export async function seedWallets(db: NodePgDatabase<typeof schema>, operatorId: string) {
const users = await db.select().from(schema.users)
  for (const user of users) {
    const existingWallet = await db.select().from(schema.wallets).where(eq(schema.wallets.userId, user.id))
    if (existingWallet.length > 0) {
      await db.update(schema.users).set({ activeWalletId: existingWallet[0].id }).where(eq(schema.users.id, user.id))
  console.log(`✅ seeded wallet `)
   
    }
  const exisitngOperator = await db.select().from(schema.operators)
    if (exisitngOperator.length > 0) {
      await db.update(schema.users).set({ activeOperatorId: exisitngOperator[0].id }).where(eq(schema.users.id, user.id))
  console.log(`✅ seeded operator `)
   
    }

}
}
