import { z } from 'zod';
import { OperatorsWithRelationsSchema, OperatorsOptionalDefaultsWithRelationsSchema } from './OperatorsSchema'
import type { OperatorsWithRelations, OperatorsOptionalDefaultsWithRelations } from './OperatorsSchema'
import { TransactionsWithRelationsSchema, TransactionsOptionalDefaultsWithRelationsSchema } from './TransactionsSchema'
import type { TransactionsWithRelations, TransactionsOptionalDefaultsWithRelations } from './TransactionsSchema'

/////////////////////////////////////////
// PRODUCTS SCHEMA
/////////////////////////////////////////

export const ProductsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  title: z.string(),
  productType: z.string(),
  bonusTotalInCredits: z.number(),
  isActive: z.boolean().nullable(),
  priceInCents: z.number(),
  amountToReceiveInCredits: z.number(),
  bestValue: z.number(),
  discountInCents: z.number(),
  bonusSpins: z.number(),
  isPromo: z.boolean().nullable(),
  totalDiscountInCents: z.number(),
  operatorId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Products = z.infer<typeof ProductsSchema>

/////////////////////////////////////////
// PRODUCTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ProductsOptionalDefaultsSchema = ProductsSchema.merge(z.object({
  title: z.string().optional(),
  productType: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ProductsOptionalDefaults = z.infer<typeof ProductsOptionalDefaultsSchema>

/////////////////////////////////////////
// PRODUCTS RELATION SCHEMA
/////////////////////////////////////////

export type ProductsRelations = {
  operators?: OperatorsWithRelations | null;
  transactions: TransactionsWithRelations[];
};

export type ProductsWithRelations = z.infer<typeof ProductsSchema> & ProductsRelations

export const ProductsWithRelationsSchema: z.ZodType<ProductsWithRelations> = ProductsSchema.merge(z.object({
  operators: z.lazy(() => OperatorsWithRelationsSchema).nullable(),
  transactions: z.lazy(() => TransactionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PRODUCTS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ProductsOptionalDefaultsRelations = {
  operators?: OperatorsOptionalDefaultsWithRelations | null;
  transactions: TransactionsOptionalDefaultsWithRelations[];
};

export type ProductsOptionalDefaultsWithRelations = z.infer<typeof ProductsOptionalDefaultsSchema> & ProductsOptionalDefaultsRelations

export const ProductsOptionalDefaultsWithRelationsSchema: z.ZodType<ProductsOptionalDefaultsWithRelations> = ProductsOptionalDefaultsSchema.merge(z.object({
  operators: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema).nullable(),
  transactions: z.lazy(() => TransactionsOptionalDefaultsWithRelationsSchema).array(),
}))

export default ProductsSchema;
