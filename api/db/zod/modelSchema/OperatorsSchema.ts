import { z } from 'zod';
import { GamesWithRelationsSchema, GamesOptionalDefaultsWithRelationsSchema } from './GamesSchema'
import type { GamesWithRelations, GamesOptionalDefaultsWithRelations } from './GamesSchema'
import { ProductsWithRelationsSchema, ProductsOptionalDefaultsWithRelationsSchema } from './ProductsSchema'
import type { ProductsWithRelations, ProductsOptionalDefaultsWithRelations } from './ProductsSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import { OperatorSwitchHistoryWithRelationsSchema, OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema } from './OperatorSwitchHistorySchema'
import type { OperatorSwitchHistoryWithRelations, OperatorSwitchHistoryOptionalDefaultsWithRelations } from './OperatorSwitchHistorySchema'
import { WalletsWithRelationsSchema, WalletsOptionalDefaultsWithRelationsSchema } from './WalletsSchema'
import type { WalletsWithRelations, WalletsOptionalDefaultsWithRelations } from './WalletsSchema'

/////////////////////////////////////////
// OPERATORS SCHEMA
/////////////////////////////////////////

export const OperatorsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  name: z.string(),
  operatorSecret: z.string(),
  operatorAccess: z.string(),
  callbackUrl: z.string(),
  isActive: z.boolean(),
  allowedIps: z.string(),
  description: z.string().nullable(),
  productIds: z.string().nullable(),
  balance: z.number(),
  netRevenue: z.number(),
  acceptedPayments: z.string().array(),
  ownerId: z.string().nullable(),
  lastUsedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Operators = z.infer<typeof OperatorsSchema>

/////////////////////////////////////////
// OPERATORS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OperatorsOptionalDefaultsSchema = OperatorsSchema.merge(z.object({
  isActive: z.boolean().optional(),
  netRevenue: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OperatorsOptionalDefaults = z.infer<typeof OperatorsOptionalDefaultsSchema>

/////////////////////////////////////////
// OPERATORS RELATION SCHEMA
/////////////////////////////////////////

export type OperatorsRelations = {
  games: GamesWithRelations[];
  products: ProductsWithRelations[];
  users: UsersWithRelations[];
  switchedFromHistory: OperatorSwitchHistoryWithRelations[];
  switchedToHistory: OperatorSwitchHistoryWithRelations[];
  Wallets: WalletsWithRelations[];
};

export type OperatorsWithRelations = z.infer<typeof OperatorsSchema> & OperatorsRelations

export const OperatorsWithRelationsSchema: z.ZodType<OperatorsWithRelations> = OperatorsSchema.merge(z.object({
  games: z.lazy(() => GamesWithRelationsSchema).array(),
  products: z.lazy(() => ProductsWithRelationsSchema).array(),
  users: z.lazy(() => UsersWithRelationsSchema).array(),
  switchedFromHistory: z.lazy(() => OperatorSwitchHistoryWithRelationsSchema).array(),
  switchedToHistory: z.lazy(() => OperatorSwitchHistoryWithRelationsSchema).array(),
  Wallets: z.lazy(() => WalletsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// OPERATORS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OperatorsOptionalDefaultsRelations = {
  games: GamesOptionalDefaultsWithRelations[];
  products: ProductsOptionalDefaultsWithRelations[];
  users: UsersOptionalDefaultsWithRelations[];
  switchedFromHistory: OperatorSwitchHistoryOptionalDefaultsWithRelations[];
  switchedToHistory: OperatorSwitchHistoryOptionalDefaultsWithRelations[];
  Wallets: WalletsOptionalDefaultsWithRelations[];
};

export type OperatorsOptionalDefaultsWithRelations = z.infer<typeof OperatorsOptionalDefaultsSchema> & OperatorsOptionalDefaultsRelations

export const OperatorsOptionalDefaultsWithRelationsSchema: z.ZodType<OperatorsOptionalDefaultsWithRelations> = OperatorsOptionalDefaultsSchema.merge(z.object({
  games: z.lazy(() => GamesOptionalDefaultsWithRelationsSchema).array(),
  products: z.lazy(() => ProductsOptionalDefaultsWithRelationsSchema).array(),
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema).array(),
  switchedFromHistory: z.lazy(() => OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema).array(),
  switchedToHistory: z.lazy(() => OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema).array(),
  Wallets: z.lazy(() => WalletsOptionalDefaultsWithRelationsSchema).array(),
}))

export default OperatorsSchema;
