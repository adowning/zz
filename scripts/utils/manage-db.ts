// import { config } from 'config'
import { db } from '#/db'
import { usersTable } from '#/db'
// import { dataSeed } from './seeds/data/seed'
// import { organizationsSeed } from './seeds/organizations/seed'
// import { userSeed } from './seed/user/seed'

/**
 * Deletes all tables and resets it with seed data.
 * Can't be run in production.
 */
const config = {
  mode: 'development',
}
export const resetDb = async () => {
  if (config.mode === 'production')
    return console.error('Not allowed in production.')

  await deleteTables()

  // Reset the database with seeds
  // await userSeed()
  // await organizationsSeed()
  // await dataSeed()

  console.info('Database reset complete.')
}

/**
 * Deletes all tables. Can't be run in production.

 */
export const clearDb = async () => {
  if (config.mode === 'production')
    return console.error('Not allowed in production.')

  await deleteTables()
  console.info('Database clearing complete.')
}

const deleteTables = async () => {
  // await db.delete(organizationsTable)
  // await db.delete(usersTable)

  console.info('Deleted all organizations and users.')
}
