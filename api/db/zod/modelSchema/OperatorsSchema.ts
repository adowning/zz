import { z } from 'zod'
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema'
import { GamesOptionalDefaultsWithRelationsSchema, GamesWithRelationsSchema } from './GamesSchema'
import type { GamesOptionalDefaultsWithRelations, GamesWithRelations } from './GamesSchema'
import {
  OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema,
  OperatorSwitchHistoryWithRelationsSchema,
} from './OperatorSwitchHistorySchema'
import type {
  OperatorSwitchHistoryOptionalDefaultsWithRelations,
  OperatorSwitchHistoryWithRelations,
} from './OperatorSwitchHistorySchema'
import { ProductsOptionalDefaultsWithRelationsSchema, ProductsWithRelationsSchema } from './ProductsSchema'
import type { ProductsOptionalDefaultsWithRelations, ProductsWithRelations } from './ProductsSchema'
import { UsersOptionalDefaultsWithRelationsSchema, UsersWithRelationsSchema } from './UsersSchema'
import type { UsersOptionalDefaultsWithRelations, UsersWithRelations } from './UsersSchema'
import { WalletsOptionalDefaultsWithRelationsSchema, WalletsWithRelationsSchema } from './WalletsSchema'
import type { WalletsOptionalDefaultsWithRelations, WalletsWithRelations } from './WalletsSchema'

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
  goldsvetData: JsonValueSchema.nullable(),
})

export type Operators = z.infer<typeof OperatorsSchema>

/////////////////////////////////////////
// OPERATORS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OperatorsOptionalDefaultsSchema = OperatorsSchema.merge(
  z.object({
    isActive: z.boolean().optional(),
    netRevenue: z.number().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
)

export type OperatorsOptionalDefaults = z.infer<typeof OperatorsOptionalDefaultsSchema>

/////////////////////////////////////////
// OPERATORS RELATION SCHEMA
/////////////////////////////////////////

export type OperatorsRelations = {
  games: GamesWithRelations[]
  products: ProductsWithRelations[]
  users: UsersWithRelations[]
  switchedFromHistory: OperatorSwitchHistoryWithRelations[]
  switchedToHistory: OperatorSwitchHistoryWithRelations[]
  Wallets: WalletsWithRelations[]
}

export type OperatorsWithRelations = Omit<z.infer<typeof OperatorsSchema>, 'goldsvetData'> & {
  goldsvetData?: JsonValueType | null
} & OperatorsRelations

export const OperatorsWithRelationsSchema: z.ZodType<OperatorsWithRelations> = OperatorsSchema.merge(
  z.object({
    games: z.lazy(() => GamesWithRelationsSchema).array(),
    products: z.lazy(() => ProductsWithRelationsSchema).array(),
    users: z.lazy(() => UsersWithRelationsSchema).array(),
    switchedFromHistory: z.lazy(() => OperatorSwitchHistoryWithRelationsSchema).array(),
    switchedToHistory: z.lazy(() => OperatorSwitchHistoryWithRelationsSchema).array(),
    Wallets: z.lazy(() => WalletsWithRelationsSchema).array(),
  }),
)

/////////////////////////////////////////
// OPERATORS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OperatorsOptionalDefaultsRelations = {
  games: GamesOptionalDefaultsWithRelations[]
  products: ProductsOptionalDefaultsWithRelations[]
  users: UsersOptionalDefaultsWithRelations[]
  switchedFromHistory: OperatorSwitchHistoryOptionalDefaultsWithRelations[]
  switchedToHistory: OperatorSwitchHistoryOptionalDefaultsWithRelations[]
  Wallets: WalletsOptionalDefaultsWithRelations[]
}

export type OperatorsOptionalDefaultsWithRelations = Omit<
  z.infer<typeof OperatorsOptionalDefaultsSchema>,
  'goldsvetData'
> & {
  goldsvetData?: JsonValueType | null
} & OperatorsOptionalDefaultsRelations

export const OperatorsOptionalDefaultsWithRelationsSchema: z.ZodType<OperatorsOptionalDefaultsWithRelations> =
  OperatorsOptionalDefaultsSchema.merge(
    z.object({
      games: z.lazy(() => GamesOptionalDefaultsWithRelationsSchema).array(),
      products: z.lazy(() => ProductsOptionalDefaultsWithRelationsSchema).array(),
      users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema).array(),
      switchedFromHistory: z.lazy(() => OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema).array(),
      switchedToHistory: z.lazy(() => OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema).array(),
      Wallets: z.lazy(() => WalletsOptionalDefaultsWithRelationsSchema).array(),
    }),
  )

export default OperatorsSchema
