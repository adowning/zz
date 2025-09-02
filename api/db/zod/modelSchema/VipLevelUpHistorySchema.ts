import { z } from 'zod';
import { VipInfoWithRelationsSchema, VipInfoOptionalDefaultsWithRelationsSchema } from './VipInfoSchema'
import type { VipInfoWithRelations, VipInfoOptionalDefaultsWithRelations } from './VipInfoSchema'

/////////////////////////////////////////
// VIP LEVEL UP HISTORY SCHEMA
/////////////////////////////////////////

export const VipLevelUpHistorySchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  previousLevel: z.number(),
  newLevel: z.number(),
  timestamp: z.coerce.date(),
  VipInfoId: z.string(),
})

export type VipLevelUpHistory = z.infer<typeof VipLevelUpHistorySchema>

/////////////////////////////////////////
// VIP LEVEL UP HISTORY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipLevelUpHistoryOptionalDefaultsSchema = VipLevelUpHistorySchema.merge(z.object({
  timestamp: z.coerce.date().optional(),
}))

export type VipLevelUpHistoryOptionalDefaults = z.infer<typeof VipLevelUpHistoryOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP LEVEL UP HISTORY RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelUpHistoryRelations = {
  VipInfo: VipInfoWithRelations;
};

export type VipLevelUpHistoryWithRelations = z.infer<typeof VipLevelUpHistorySchema> & VipLevelUpHistoryRelations

export const VipLevelUpHistoryWithRelationsSchema: z.ZodType<VipLevelUpHistoryWithRelations> = VipLevelUpHistorySchema.merge(z.object({
  VipInfo: z.lazy(() => VipInfoWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP LEVEL UP HISTORY OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelUpHistoryOptionalDefaultsRelations = {
  VipInfo: VipInfoOptionalDefaultsWithRelations;
};

export type VipLevelUpHistoryOptionalDefaultsWithRelations = z.infer<typeof VipLevelUpHistoryOptionalDefaultsSchema> & VipLevelUpHistoryOptionalDefaultsRelations

export const VipLevelUpHistoryOptionalDefaultsWithRelationsSchema: z.ZodType<VipLevelUpHistoryOptionalDefaultsWithRelations> = VipLevelUpHistoryOptionalDefaultsSchema.merge(z.object({
  VipInfo: z.lazy(() => VipInfoOptionalDefaultsWithRelationsSchema),
}))

export default VipLevelUpHistorySchema;
