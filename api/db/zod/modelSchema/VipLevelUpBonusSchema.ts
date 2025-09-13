import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// VIP LEVEL UP BONUS SCHEMA
/////////////////////////////////////////

export const VipLevelUpBonusSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  levelName: z.string(),
  levelXp: z.number(),
  createdAt: z.coerce.date(),
})

export type VipLevelUpBonus = z.infer<typeof VipLevelUpBonusSchema>

/////////////////////////////////////////
// VIP LEVEL UP BONUS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipLevelUpBonusOptionalDefaultsSchema = VipLevelUpBonusSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type VipLevelUpBonusOptionalDefaults = z.infer<typeof VipLevelUpBonusOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP LEVEL UP BONUS RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelUpBonusRelations = {
  user: UsersWithRelations;
};

export type VipLevelUpBonusWithRelations = z.infer<typeof VipLevelUpBonusSchema> & VipLevelUpBonusRelations

export const VipLevelUpBonusWithRelationsSchema: z.ZodType<VipLevelUpBonusWithRelations> = VipLevelUpBonusSchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP LEVEL UP BONUS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipLevelUpBonusOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
};

export type VipLevelUpBonusOptionalDefaultsWithRelations = z.infer<typeof VipLevelUpBonusOptionalDefaultsSchema> & VipLevelUpBonusOptionalDefaultsRelations

export const VipLevelUpBonusOptionalDefaultsWithRelationsSchema: z.ZodType<VipLevelUpBonusOptionalDefaultsWithRelations> = VipLevelUpBonusOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default VipLevelUpBonusSchema;
