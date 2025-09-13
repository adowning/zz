import { z } from 'zod';

/////////////////////////////////////////
// AFFILIATE SCHEMA
/////////////////////////////////////////

export const AffiliateSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  status: z.string(),
  email: z.string(),
  role: z.string(),
  referralCode: z.string(),
  parentId: z.string().nullable(),
  path: z.string().array(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Affiliate = z.infer<typeof AffiliateSchema>

/////////////////////////////////////////
// AFFILIATE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AffiliateOptionalDefaultsSchema = AffiliateSchema.merge(z.object({
  id: z.string().optional(),
  path: z.string().array().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type AffiliateOptionalDefaults = z.infer<typeof AffiliateOptionalDefaultsSchema>

/////////////////////////////////////////
// AFFILIATE RELATION SCHEMA
/////////////////////////////////////////

export type AffiliateRelations = {
  parent?: AffiliateWithRelations | null;
  children: AffiliateWithRelations[];
};

export type AffiliateWithRelations = z.infer<typeof AffiliateSchema> & AffiliateRelations

export const AffiliateWithRelationsSchema: z.ZodType<AffiliateWithRelations> = AffiliateSchema.merge(z.object({
  parent: z.lazy(() => AffiliateWithRelationsSchema).nullable(),
  children: z.lazy(() => AffiliateWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// AFFILIATE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AffiliateOptionalDefaultsRelations = {
  parent?: AffiliateOptionalDefaultsWithRelations | null;
  children: AffiliateOptionalDefaultsWithRelations[];
};

export type AffiliateOptionalDefaultsWithRelations = z.infer<typeof AffiliateOptionalDefaultsSchema> & AffiliateOptionalDefaultsRelations

export const AffiliateOptionalDefaultsWithRelationsSchema: z.ZodType<AffiliateOptionalDefaultsWithRelations> = AffiliateOptionalDefaultsSchema.merge(z.object({
  parent: z.lazy(() => AffiliateOptionalDefaultsWithRelationsSchema).nullable(),
  children: z.lazy(() => AffiliateOptionalDefaultsWithRelationsSchema).array(),
}))

export default AffiliateSchema;
