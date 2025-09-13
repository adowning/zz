import { z } from 'zod';
import { VipTiersWithRelationsSchema, VipTiersOptionalDefaultsWithRelationsSchema } from './VipTiersSchema'
import type { VipTiersWithRelations, VipTiersOptionalDefaultsWithRelations } from './VipTiersSchema'
import { SettingWithRelationsSchema, SettingOptionalDefaultsWithRelationsSchema } from './SettingSchema'
import type { SettingWithRelations, SettingOptionalDefaultsWithRelations } from './SettingSchema'

/////////////////////////////////////////
// VIP LEVEL SCHEMA
/////////////////////////////////////////

export const VipLevelSchema = z.object({
  id: z.string(),
  parentId: z.string(),
  levelName: z.string(),
  xp: z.number(),
  settingId: z.number(),
})

export type VipLevel = z.infer<typeof VipLevelSchema>

/////////////////////////////////////////
// VIP LEVEL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipLevelOptionalDefaultsSchema = VipLevelSchema.merge(z.object({
  id: z.string().optional(),
}))

export type VipLevelOptionalDefaults = z.infer<typeof VipLevelOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP LEVEL RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelRelations = {
  parent: VipTiersWithRelations;
  setting: SettingWithRelations;
};

export type VipLevelWithRelations = z.infer<typeof VipLevelSchema> & VipLevelRelations

export const VipLevelWithRelationsSchema: z.ZodType<VipLevelWithRelations> = VipLevelSchema.merge(z.object({
  parent: z.lazy(() => VipTiersWithRelationsSchema),
  setting: z.lazy(() => SettingWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP LEVEL OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelOptionalDefaultsRelations = {
  parent: VipTiersOptionalDefaultsWithRelations;
  setting: SettingOptionalDefaultsWithRelations;
};

export type VipLevelOptionalDefaultsWithRelations = z.infer<typeof VipLevelOptionalDefaultsSchema> & VipLevelOptionalDefaultsRelations

export const VipLevelOptionalDefaultsWithRelationsSchema: z.ZodType<VipLevelOptionalDefaultsWithRelations> = VipLevelOptionalDefaultsSchema.merge(z.object({
  parent: z.lazy(() => VipTiersOptionalDefaultsWithRelationsSchema),
  setting: z.lazy(() => SettingOptionalDefaultsWithRelationsSchema),
}))

export default VipLevelSchema;
