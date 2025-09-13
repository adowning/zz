import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// VIP SPIN REWARD SCHEMA
/////////////////////////////////////////

export const VipSpinRewardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
  createdAt: z.coerce.date(),
})

export type VipSpinReward = z.infer<typeof VipSpinRewardSchema>

/////////////////////////////////////////
// VIP SPIN REWARD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipSpinRewardOptionalDefaultsSchema = VipSpinRewardSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type VipSpinRewardOptionalDefaults = z.infer<typeof VipSpinRewardOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP SPIN REWARD RELATION SCHEMA
/////////////////////////////////////////

export type VipSpinRewardRelations = {
  user: UsersWithRelations;
};

export type VipSpinRewardWithRelations = z.infer<typeof VipSpinRewardSchema> & VipSpinRewardRelations

export const VipSpinRewardWithRelationsSchema: z.ZodType<VipSpinRewardWithRelations> = VipSpinRewardSchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP SPIN REWARD OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipSpinRewardOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
};

export type VipSpinRewardOptionalDefaultsWithRelations = z.infer<typeof VipSpinRewardOptionalDefaultsSchema> & VipSpinRewardOptionalDefaultsRelations

export const VipSpinRewardOptionalDefaultsWithRelationsSchema: z.ZodType<VipSpinRewardOptionalDefaultsWithRelations> = VipSpinRewardOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default VipSpinRewardSchema;
