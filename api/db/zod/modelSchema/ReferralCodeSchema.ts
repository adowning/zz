import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// REFERRAL CODE SCHEMA
/////////////////////////////////////////

export const ReferralCodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  commissionRate: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type ReferralCode = z.infer<typeof ReferralCodeSchema>

/////////////////////////////////////////
// REFERRAL CODE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ReferralCodeOptionalDefaultsSchema = ReferralCodeSchema.merge(z.object({
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ReferralCodeOptionalDefaults = z.infer<typeof ReferralCodeOptionalDefaultsSchema>

/////////////////////////////////////////
// REFERRAL CODE RELATION SCHEMA
/////////////////////////////////////////

export type ReferralCodeRelations = {
  user: UsersWithRelations;
};

export type ReferralCodeWithRelations = z.infer<typeof ReferralCodeSchema> & ReferralCodeRelations

export const ReferralCodeWithRelationsSchema: z.ZodType<ReferralCodeWithRelations> = ReferralCodeSchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// REFERRAL CODE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ReferralCodeOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
};

export type ReferralCodeOptionalDefaultsWithRelations = z.infer<typeof ReferralCodeOptionalDefaultsSchema> & ReferralCodeOptionalDefaultsRelations

export const ReferralCodeOptionalDefaultsWithRelationsSchema: z.ZodType<ReferralCodeOptionalDefaultsWithRelations> = ReferralCodeOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default ReferralCodeSchema;
