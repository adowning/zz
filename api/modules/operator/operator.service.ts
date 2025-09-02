import { eq } from 'drizzle-orm'

import db from '#/db'
import { products, operators } from '#/db/'

export function getOperators() {
  return db.query.operators.findMany()
}

export function getProductsByOperatorId(operatorId: string) {
  return db.query.products.findMany({
    where: eq(products.operatorId, operatorId),
  })
}

/**
 * Get deposit by ID
 * @param depositId - The deposit ID to retrieve
 * @returns The deposit or null if not found
 */
export async function getMyOperatorWithProducts(opertorId: string): Promise<any> {
  if (!opertorId) {
    throw new Error('Deposit ID is required')
  }
  const result = await db.query.operators.findMany({
    where: eq(operators.id, opertorId),
    with: {
      products: true
    }

  });
  // const [deposit] = await db
  //   .select()
  //   .from(operators)
  //   .where(eq(operators.id, opertorId))
  //   .include({
  //     products: true
  //   })
  //   .limit(1)

  return result || null
}
