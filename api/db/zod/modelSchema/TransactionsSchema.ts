import { z } from 'zod';
import { ProductsWithRelationsSchema, ProductsOptionalDefaultsWithRelationsSchema } from './ProductsSchema'
import type { ProductsWithRelations, ProductsOptionalDefaultsWithRelations } from './ProductsSchema'
import { WalletsWithRelationsSchema, WalletsOptionalDefaultsWithRelationsSchema } from './WalletsSchema'
import type { WalletsWithRelations, WalletsOptionalDefaultsWithRelations } from './WalletsSchema'

/////////////////////////////////////////
// TRANSACTIONS SCHEMA
/////////////////////////////////////////

export const TransactionsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  processedAt: z.coerce.date().nullable(),
  walletId: z.string().nullable(),
  type: z.string(),
  status: z.string(),
  amount: z.number(),
  netAmount: z.number().nullable(),
  feeAmount: z.number().nullable(),
  productId: z.string().nullable(),
  paymentMethod: z.string().nullable(),
  balanceBefore: z.number().nullable(),
  balanceAfter: z.number().nullable(),
  bonusBalanceBefore: z.number().nullable(),
  bonusBalanceAfter: z.number().nullable(),
  bonusAmount: z.number().nullable(),
  wageringRequirement: z.number().nullable(),
  wageringProgress: z.number().nullable(),
  description: z.string().nullable(),
  provider: z.string().nullable(),
  providerTxId: z.string().nullable(),
  relatedGameId: z.string().nullable(),
  relatedRoundId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  operatorId: z.string().nullable(),
  userId: z.string().nullable(),
})

export type Transactions = z.infer<typeof TransactionsSchema>

/////////////////////////////////////////
// TRANSACTIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TransactionsOptionalDefaultsSchema = TransactionsSchema.merge(z.object({
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TransactionsOptionalDefaults = z.infer<typeof TransactionsOptionalDefaultsSchema>

/////////////////////////////////////////
// TRANSACTIONS RELATION SCHEMA
/////////////////////////////////////////

export type TransactionsRelations = {
  products?: ProductsWithRelations | null;
  wallets?: WalletsWithRelations | null;
};

export type TransactionsWithRelations = z.infer<typeof TransactionsSchema> & TransactionsRelations

export const TransactionsWithRelationsSchema: z.ZodType<TransactionsWithRelations> = TransactionsSchema.merge(z.object({
  products: z.lazy(() => ProductsWithRelationsSchema).nullable(),
  wallets: z.lazy(() => WalletsWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// TRANSACTIONS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TransactionsOptionalDefaultsRelations = {
  products?: ProductsOptionalDefaultsWithRelations | null;
  wallets?: WalletsOptionalDefaultsWithRelations | null;
};

export type TransactionsOptionalDefaultsWithRelations = z.infer<typeof TransactionsOptionalDefaultsSchema> & TransactionsOptionalDefaultsRelations

export const TransactionsOptionalDefaultsWithRelationsSchema: z.ZodType<TransactionsOptionalDefaultsWithRelations> = TransactionsOptionalDefaultsSchema.merge(z.object({
  products: z.lazy(() => ProductsOptionalDefaultsWithRelationsSchema).nullable(),
  wallets: z.lazy(() => WalletsOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default TransactionsSchema;
