import { z } from 'zod';
import { VipLevelWithRelationsSchema, VipLevelOptionalDefaultsWithRelationsSchema } from './VipLevelSchema'
import type { VipLevelWithRelations, VipLevelOptionalDefaultsWithRelations } from './VipLevelSchema'
import { VipSpinPrizeWithRelationsSchema, VipSpinPrizeOptionalDefaultsWithRelationsSchema } from './VipSpinPrizeSchema'
import type { VipSpinPrizeWithRelations, VipSpinPrizeOptionalDefaultsWithRelations } from './VipSpinPrizeSchema'

/////////////////////////////////////////
// VIP TIERS SCHEMA
/////////////////////////////////////////

export const VipTiersSchema = z.object({
  id: z.string(),
  tiersName: z.string(),
  icon: z.string(),
  order: z.number(),
  weeklyCashback: z.boolean(),
  weeklyCashbackMin: z.number(),
  weeklyCashbackPercent: z.number(),
  monthlyCashback: z.boolean(),
  monthlyCashbackMin: z.number(),
  monthlyCashbackPercent: z.number(),
  levelUpBonus: z.number(),
  noFeeWithdrawal: z.boolean(),
})

export type VipTiers = z.infer<typeof VipTiersSchema>

/////////////////////////////////////////
// VIP TIERS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipTiersOptionalDefaultsSchema = VipTiersSchema.merge(z.object({
  id: z.string().optional(),
  weeklyCashback: z.boolean().optional(),
  weeklyCashbackMin: z.number().optional(),
  weeklyCashbackPercent: z.number().optional(),
  monthlyCashback: z.boolean().optional(),
  monthlyCashbackMin: z.number().optional(),
  monthlyCashbackPercent: z.number().optional(),
  levelUpBonus: z.number().optional(),
  noFeeWithdrawal: z.boolean().optional(),
}))

export type VipTiersOptionalDefaults = z.infer<typeof VipTiersOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP TIERS RELATION SCHEMA
/////////////////////////////////////////

export type VipTiersRelations = {
  levels: VipLevelWithRelations[];
  spinPrizes: VipSpinPrizeWithRelations[];
};

export type VipTiersWithRelations = z.infer<typeof VipTiersSchema> & VipTiersRelations

export const VipTiersWithRelationsSchema: z.ZodType<VipTiersWithRelations> = VipTiersSchema.merge(z.object({
  levels: z.lazy(() => VipLevelWithRelationsSchema).array(),
  spinPrizes: z.lazy(() => VipSpinPrizeWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// VIP TIERS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipTiersOptionalDefaultsRelations = {
  levels: VipLevelOptionalDefaultsWithRelations[];
  spinPrizes: VipSpinPrizeOptionalDefaultsWithRelations[];
};

export type VipTiersOptionalDefaultsWithRelations = z.infer<typeof VipTiersOptionalDefaultsSchema> & VipTiersOptionalDefaultsRelations

export const VipTiersOptionalDefaultsWithRelationsSchema: z.ZodType<VipTiersOptionalDefaultsWithRelations> = VipTiersOptionalDefaultsSchema.merge(z.object({
  levels: z.lazy(() => VipLevelOptionalDefaultsWithRelationsSchema).array(),
  spinPrizes: z.lazy(() => VipSpinPrizeOptionalDefaultsWithRelationsSchema).array(),
}))

export default VipTiersSchema;
