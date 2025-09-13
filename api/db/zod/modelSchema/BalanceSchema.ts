import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import { CurrencyWithRelationsSchema, CurrencyOptionalDefaultsWithRelationsSchema } from './CurrencySchema'
import type { CurrencyWithRelations, CurrencyOptionalDefaultsWithRelations } from './CurrencySchema'

/////////////////////////////////////////
// BALANCE SCHEMA
/////////////////////////////////////////

export const BalanceSchema = z.object({
  id: z.number(),
  amount: z.number(),
  pending: z.number(),
  bonus: z.number(),
  withdrawable: z.number(),
  turnover: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  currencyId: z.string(),
})

export type Balance = z.infer<typeof BalanceSchema>

/////////////////////////////////////////
// BALANCE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BalanceOptionalDefaultsSchema = BalanceSchema.merge(z.object({
  id: z.number().optional(),
  amount: z.number().optional(),
  pending: z.number().optional(),
  bonus: z.number().optional(),
  withdrawable: z.number().optional(),
  turnover: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type BalanceOptionalDefaults = z.infer<typeof BalanceOptionalDefaultsSchema>

/////////////////////////////////////////
// BALANCE RELATION SCHEMA
/////////////////////////////////////////

export type BalanceRelations = {
  user: UsersWithRelations;
  currency: CurrencyWithRelations;
};

export type BalanceWithRelations = z.infer<typeof BalanceSchema> & BalanceRelations

export const BalanceWithRelationsSchema: z.ZodType<BalanceWithRelations> = BalanceSchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
  currency: z.lazy(() => CurrencyWithRelationsSchema),
}))

/////////////////////////////////////////
// BALANCE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type BalanceOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
  currency: CurrencyOptionalDefaultsWithRelations;
};

export type BalanceOptionalDefaultsWithRelations = z.infer<typeof BalanceOptionalDefaultsSchema> & BalanceOptionalDefaultsRelations

export const BalanceOptionalDefaultsWithRelationsSchema: z.ZodType<BalanceOptionalDefaultsWithRelations> = BalanceOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  currency: z.lazy(() => CurrencyOptionalDefaultsWithRelationsSchema),
}))

export default BalanceSchema;
