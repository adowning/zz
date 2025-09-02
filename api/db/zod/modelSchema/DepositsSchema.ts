import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// DEPOSITS SCHEMA
/////////////////////////////////////////

export const DepositsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  userId: z.string().nullable(),
  amount: z.number().nullable(),
  status: z.string().nullable(),
  idNumber: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  channelsId: z.string().nullable(),
  note: z.string().nullable(),
  currency: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Deposits = z.infer<typeof DepositsSchema>

/////////////////////////////////////////
// DEPOSITS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DepositsOptionalDefaultsSchema = DepositsSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DepositsOptionalDefaults = z.infer<typeof DepositsOptionalDefaultsSchema>

/////////////////////////////////////////
// DEPOSITS RELATION SCHEMA
/////////////////////////////////////////

export type DepositsRelations = {
  users?: UsersWithRelations | null;
};

export type DepositsWithRelations = z.infer<typeof DepositsSchema> & DepositsRelations

export const DepositsWithRelationsSchema: z.ZodType<DepositsWithRelations> = DepositsSchema.merge(z.object({
  users: z.lazy(() => UsersWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// DEPOSITS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type DepositsOptionalDefaultsRelations = {
  users?: UsersOptionalDefaultsWithRelations | null;
};

export type DepositsOptionalDefaultsWithRelations = z.infer<typeof DepositsOptionalDefaultsSchema> & DepositsOptionalDefaultsRelations

export const DepositsOptionalDefaultsWithRelationsSchema: z.ZodType<DepositsOptionalDefaultsWithRelations> = DepositsOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default DepositsSchema;
