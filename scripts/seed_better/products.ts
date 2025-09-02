import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../api/db/schema'
import productsData from './json/products.json'

export async function seedProducts(
  db: NodePgDatabase<typeof schema>,
  operatorId: string
) {
  console.log('🛍️ Seeding products...')

  if (!operatorId) {
    throw new Error('An Operator ID is required to seed products.')
  }

  const productsToInsert = productsData.map((product) => ({
    ...product,
    id: `prod_${crypto.randomUUID()}`, // Ensure a unique ID for each product
    operatorId: operatorId, // Link each product to the default operator
  }))

  await db
    .insert(schema.products)
    .values(productsToInsert)
    .onConflictDoNothing()

  console.log(`✅ ${productsData.length} products seeded.`)
}
