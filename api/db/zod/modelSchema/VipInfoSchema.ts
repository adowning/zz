import { z } from 'zod';
import { VipRankWithRelationsSchema, VipRankOptionalDefaultsWithRelationsSchema } from './VipRankSchema'
import type { VipRankWithRelations, VipRankOptionalDefaultsWithRelations } from './VipRankSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import { VipLevelUpHistoryWithRelationsSchema, VipLevelUpHistoryOptionalDefaultsWithRelationsSchema } from './VipLevelUpHistorySchema'
import type { VipLevelUpHistoryWithRelations, VipLevelUpHistoryOptionalDefaultsWithRelations } from './VipLevelUpHistorySchema'

/////////////////////////////////////////
// VIP INFO SCHEMA
/////////////////////////////////////////

export const VipInfoSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  level: z.number(),
  xp: z.number(),
  totalXp: z.number(),
  userId: z.string(),
  currentRankid: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type VipInfo = z.infer<typeof VipInfoSchema>

/////////////////////////////////////////
// VIP INFO OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipInfoOptionalDefaultsSchema = VipInfoSchema.merge(z.object({
  level: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type VipInfoOptionalDefaults = z.infer<typeof VipInfoOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP INFO RELATION SCHEMA
/////////////////////////////////////////

export type VipInfoRelations = {
  vipRank?: VipRankWithRelations | null;
  users: UsersWithRelations;
  vipLevelUpHistory: VipLevelUpHistoryWithRelations[];
};

export type VipInfoWithRelations = z.infer<typeof VipInfoSchema> & VipInfoRelations

export const VipInfoWithRelationsSchema: z.ZodType<VipInfoWithRelations> = VipInfoSchema.merge(z.object({
  vipRank: z.lazy(() => VipRankWithRelationsSchema).nullable(),
  users: z.lazy(() => UsersWithRelationsSchema),
  vipLevelUpHistory: z.lazy(() => VipLevelUpHistoryWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// VIP INFO OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipInfoOptionalDefaultsRelations = {
  vipRank?: VipRankOptionalDefaultsWithRelations | null;
  users: UsersOptionalDefaultsWithRelations;
  vipLevelUpHistory: VipLevelUpHistoryOptionalDefaultsWithRelations[];
};

export type VipInfoOptionalDefaultsWithRelations = z.infer<typeof VipInfoOptionalDefaultsSchema> & VipInfoOptionalDefaultsRelations

export const VipInfoOptionalDefaultsWithRelationsSchema: z.ZodType<VipInfoOptionalDefaultsWithRelations> = VipInfoOptionalDefaultsSchema.merge(z.object({
  vipRank: z.lazy(() => VipRankOptionalDefaultsWithRelationsSchema).nullable(),
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  vipLevelUpHistory: z.lazy(() => VipLevelUpHistoryOptionalDefaultsWithRelationsSchema).array(),
}))

export default VipInfoSchema;
