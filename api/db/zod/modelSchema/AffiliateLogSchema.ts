import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// AFFILIATE LOG SCHEMA
/////////////////////////////////////////

export const AffiliateLogSchema = z.object({
  id: z.string(),
  invitorId: z.string(),
  childId: z.string(),
  currency: z.string(),
  referralCode: z.string(),
  betAmount: z.number(),
  commissionAmount: z.number(),
  commissionWager: z.number(),
  totalReferralAmount: z.number(),
  referralAmount: z.number(),
  referralWager: z.number(),
  lastVipLevelAmount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type AffiliateLog = z.infer<typeof AffiliateLogSchema>

/////////////////////////////////////////
// AFFILIATE LOG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AffiliateLogOptionalDefaultsSchema = AffiliateLogSchema.merge(z.object({
  id: z.string().optional(),
  betAmount: z.number().optional(),
  commissionAmount: z.number().optional(),
  commissionWager: z.number().optional(),
  totalReferralAmount: z.number().optional(),
  referralAmount: z.number().optional(),
  referralWager: z.number().optional(),
  lastVipLevelAmount: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type AffiliateLogOptionalDefaults = z.infer<typeof AffiliateLogOptionalDefaultsSchema>

/////////////////////////////////////////
// AFFILIATE LOG RELATION SCHEMA
/////////////////////////////////////////

export type AffiliateLogRelations = {
  invitor: UsersWithRelations;
  child: UsersWithRelations;
};

export type AffiliateLogWithRelations = z.infer<typeof AffiliateLogSchema> & AffiliateLogRelations

export const AffiliateLogWithRelationsSchema: z.ZodType<AffiliateLogWithRelations> = AffiliateLogSchema.merge(z.object({
  invitor: z.lazy(() => UsersWithRelationsSchema),
  child: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// AFFILIATE LOG OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AffiliateLogOptionalDefaultsRelations = {
  invitor: UsersOptionalDefaultsWithRelations;
  child: UsersOptionalDefaultsWithRelations;
};

export type AffiliateLogOptionalDefaultsWithRelations = z.infer<typeof AffiliateLogOptionalDefaultsSchema> & AffiliateLogOptionalDefaultsRelations

export const AffiliateLogOptionalDefaultsWithRelationsSchema: z.ZodType<AffiliateLogOptionalDefaultsWithRelations> = AffiliateLogOptionalDefaultsSchema.merge(z.object({
  invitor: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  child: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default AffiliateLogSchema;
