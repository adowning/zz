import { z } from 'zod';
import { OperatorsWithRelationsSchema, OperatorsOptionalDefaultsWithRelationsSchema } from './OperatorsSchema'
import type { OperatorsWithRelations, OperatorsOptionalDefaultsWithRelations } from './OperatorsSchema'
import { TransactionsWithRelationsSchema, TransactionsOptionalDefaultsWithRelationsSchema } from './TransactionsSchema'
import type { TransactionsWithRelations, TransactionsOptionalDefaultsWithRelations } from './TransactionsSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// WALLETS SCHEMA
/////////////////////////////////////////

export const WalletsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  balance: z.number(),
  paymentMethod: z.string(),
  currency: z.string(),
  address: z.string().nullable(),
  cashtag: z.string().nullable(),
  operatorId: z.string(),
  lastUsedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Wallets = z.infer<typeof WalletsSchema>

/////////////////////////////////////////
// WALLETS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WalletsOptionalDefaultsSchema = WalletsSchema.merge(z.object({
  balance: z.number().optional(),
  paymentMethod: z.string().optional(),
  currency: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WalletsOptionalDefaults = z.infer<typeof WalletsOptionalDefaultsSchema>

/////////////////////////////////////////
// WALLETS RELATION SCHEMA
/////////////////////////////////////////

export type WalletsRelations = {
  operator: OperatorsWithRelations;
  transactions: TransactionsWithRelations[];
  user: UsersWithRelations;
  activeForUser?: UsersWithRelations | null;
};

export type WalletsWithRelations = z.infer<typeof WalletsSchema> & WalletsRelations

export const WalletsWithRelationsSchema: z.ZodType<WalletsWithRelations> = WalletsSchema.merge(z.object({
  operator: z.lazy(() => OperatorsWithRelationsSchema),
  transactions: z.lazy(() => TransactionsWithRelationsSchema).array(),
  user: z.lazy(() => UsersWithRelationsSchema),
  activeForUser: z.lazy(() => UsersWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// WALLETS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type WalletsOptionalDefaultsRelations = {
  operator: OperatorsOptionalDefaultsWithRelations;
  transactions: TransactionsOptionalDefaultsWithRelations[];
  user: UsersOptionalDefaultsWithRelations;
  activeForUser?: UsersOptionalDefaultsWithRelations | null;
};

export type WalletsOptionalDefaultsWithRelations = z.infer<typeof WalletsOptionalDefaultsSchema> & WalletsOptionalDefaultsRelations

export const WalletsOptionalDefaultsWithRelationsSchema: z.ZodType<WalletsOptionalDefaultsWithRelations> = WalletsOptionalDefaultsSchema.merge(z.object({
  operator: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema),
  transactions: z.lazy(() => TransactionsOptionalDefaultsWithRelationsSchema).array(),
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  activeForUser: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default WalletsSchema;
