import { z } from 'zod';
import { BalanceWithRelationsSchema, BalanceOptionalDefaultsWithRelationsSchema } from './BalanceSchema'
import type { BalanceWithRelations, BalanceOptionalDefaultsWithRelations } from './BalanceSchema'

/////////////////////////////////////////
// CURRENCY SCHEMA
/////////////////////////////////////////

export const CurrencySchema = z.object({
  id: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>

/////////////////////////////////////////
// CURRENCY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CurrencyOptionalDefaultsSchema = CurrencySchema.merge(z.object({
}))

export type CurrencyOptionalDefaults = z.infer<typeof CurrencyOptionalDefaultsSchema>

/////////////////////////////////////////
// CURRENCY RELATION SCHEMA
/////////////////////////////////////////

export type CurrencyRelations = {
  balances: BalanceWithRelations[];
};

export type CurrencyWithRelations = z.infer<typeof CurrencySchema> & CurrencyRelations

export const CurrencyWithRelationsSchema: z.ZodType<CurrencyWithRelations> = CurrencySchema.merge(z.object({
  balances: z.lazy(() => BalanceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// CURRENCY OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type CurrencyOptionalDefaultsRelations = {
  balances: BalanceOptionalDefaultsWithRelations[];
};

export type CurrencyOptionalDefaultsWithRelations = z.infer<typeof CurrencyOptionalDefaultsSchema> & CurrencyOptionalDefaultsRelations

export const CurrencyOptionalDefaultsWithRelationsSchema: z.ZodType<CurrencyOptionalDefaultsWithRelations> = CurrencyOptionalDefaultsSchema.merge(z.object({
  balances: z.lazy(() => BalanceOptionalDefaultsWithRelationsSchema).array(),
}))

export default CurrencySchema;
