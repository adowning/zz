import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { VipTiersWithRelationsSchema, VipTiersOptionalDefaultsWithRelationsSchema } from './VipTiersSchema'
import type { VipTiersWithRelations, VipTiersOptionalDefaultsWithRelations } from './VipTiersSchema'

/////////////////////////////////////////
// VIP SPIN PRIZE SCHEMA
/////////////////////////////////////////

export const VipSpinPrizeSchema = z.object({
  id: z.string(),
  tiersId: z.string(),
  prizes: JsonValueSchema,
})

export type VipSpinPrize = z.infer<typeof VipSpinPrizeSchema>

/////////////////////////////////////////
// VIP SPIN PRIZE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipSpinPrizeOptionalDefaultsSchema = VipSpinPrizeSchema.merge(z.object({
  id: z.string().optional(),
}))

export type VipSpinPrizeOptionalDefaults = z.infer<typeof VipSpinPrizeOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP SPIN PRIZE RELATION SCHEMA
/////////////////////////////////////////

export type VipSpinPrizeRelations = {
  tiers: VipTiersWithRelations;
};

export type VipSpinPrizeWithRelations = z.infer<typeof VipSpinPrizeSchema> & VipSpinPrizeRelations

export const VipSpinPrizeWithRelationsSchema: z.ZodType<VipSpinPrizeWithRelations> = VipSpinPrizeSchema.merge(z.object({
  tiers: z.lazy(() => VipTiersWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP SPIN PRIZE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipSpinPrizeOptionalDefaultsRelations = {
  tiers: VipTiersOptionalDefaultsWithRelations;
};

export type VipSpinPrizeOptionalDefaultsWithRelations = z.infer<typeof VipSpinPrizeOptionalDefaultsSchema> & VipSpinPrizeOptionalDefaultsRelations

export const VipSpinPrizeOptionalDefaultsWithRelationsSchema: z.ZodType<VipSpinPrizeOptionalDefaultsWithRelations> = VipSpinPrizeOptionalDefaultsSchema.merge(z.object({
  tiers: z.lazy(() => VipTiersOptionalDefaultsWithRelationsSchema),
}))

export default VipSpinPrizeSchema;
