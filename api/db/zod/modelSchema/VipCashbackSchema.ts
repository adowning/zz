import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// VIP CASHBACK SCHEMA
/////////////////////////////////////////

export const VipCashbackSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
  tiersName: z.string(),
  type: z.string(),
  createdAt: z.coerce.date(),
})

export type VipCashback = z.infer<typeof VipCashbackSchema>

/////////////////////////////////////////
// VIP CASHBACK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VipCashbackOptionalDefaultsSchema = VipCashbackSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type VipCashbackOptionalDefaults = z.infer<typeof VipCashbackOptionalDefaultsSchema>

/////////////////////////////////////////
// VIP CASHBACK RELATION SCHEMA
/////////////////////////////////////////

export type VipCashbackRelations = {
  user: UsersWithRelations;
};

export type VipCashbackWithRelations = z.infer<typeof VipCashbackSchema> & VipCashbackRelations

export const VipCashbackWithRelationsSchema: z.ZodType<VipCashbackWithRelations> = VipCashbackSchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// VIP CASHBACK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type VipCashbackOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
};

export type VipCashbackOptionalDefaultsWithRelations = z.infer<typeof VipCashbackOptionalDefaultsSchema> & VipCashbackOptionalDefaultsRelations

export const VipCashbackOptionalDefaultsWithRelationsSchema: z.ZodType<VipCashbackOptionalDefaultsWithRelations> = VipCashbackOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default VipCashbackSchema;
