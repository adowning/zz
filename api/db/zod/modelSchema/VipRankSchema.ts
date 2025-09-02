import { z } from 'zod';
import { VipInfoWithRelationsSchema, VipInfoOptionalDefaultsWithRelationsSchema } from './VipInfoSchema'
import type { VipInfoWithRelations, VipInfoOptionalDefaultsWithRelations } from './VipInfoSchema'

/////////////////////////////////////////
// VIP RANK SCHEMA
/////////////////////////////////////////

export const VipRankSchema = z.object({
  id: z.number(),
  name: z.string(),
  minXp: z.number(),
  dailyBonusCoinPct: z.number(),
  hourlyBonusCoinPct: z.number(),
  purchaseBonusCoinPct: z.number(),
  levelUpBonusCoinPct: z.number(),
  hasConcierge: z.boolean(),
  hasVipLoungeAccess: z.boolean(),
  isInvitationOnly: z.boolean(),
})

export type VipRank = z.infer<typeof VipRankSchema>

/////////////////////////////////////////
// VIP RANK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipRankOptionalDefaultsSchema = VipRankSchema.merge(z.object({
}))

export type VipRankOptionalDefaults = z.infer<typeof VipRankOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP RANK RELATION SCHEMA
/////////////////////////////////////////

export type VipRankRelations = {
  VipInfo: VipInfoWithRelations[];
};

export type VipRankWithRelations = z.infer<typeof VipRankSchema> & VipRankRelations

export const VipRankWithRelationsSchema: z.ZodType<VipRankWithRelations> = VipRankSchema.merge(z.object({
  VipInfo: z.lazy(() => VipInfoWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// VIP RANK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipRankOptionalDefaultsRelations = {
  VipInfo: VipInfoOptionalDefaultsWithRelations[];
};

export type VipRankOptionalDefaultsWithRelations = z.infer<typeof VipRankOptionalDefaultsSchema> & VipRankOptionalDefaultsRelations

export const VipRankOptionalDefaultsWithRelationsSchema: z.ZodType<VipRankOptionalDefaultsWithRelations> = VipRankOptionalDefaultsSchema.merge(z.object({
  VipInfo: z.lazy(() => VipInfoOptionalDefaultsWithRelationsSchema).array(),
}))

export default VipRankSchema;
