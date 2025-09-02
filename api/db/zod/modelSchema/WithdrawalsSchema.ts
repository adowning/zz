import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// WITHDRAWALS SCHEMA
/////////////////////////////////////////

export const WithdrawalsSchema = z.object({
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
  currencyType: z.string().nullable(),
  currency: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Withdrawals = z.infer<typeof WithdrawalsSchema>

/////////////////////////////////////////
// WITHDRAWALS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WithdrawalsOptionalDefaultsSchema = WithdrawalsSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WithdrawalsOptionalDefaults = z.infer<typeof WithdrawalsOptionalDefaultsSchema>

/////////////////////////////////////////
// WITHDRAWALS RELATION SCHEMA
/////////////////////////////////////////

export type WithdrawalsRelations = {
  users?: UsersWithRelations | null;
};

export type WithdrawalsWithRelations = z.infer<typeof WithdrawalsSchema> & WithdrawalsRelations

export const WithdrawalsWithRelationsSchema: z.ZodType<WithdrawalsWithRelations> = WithdrawalsSchema.merge(z.object({
  users: z.lazy(() => UsersWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// WITHDRAWALS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type WithdrawalsOptionalDefaultsRelations = {
  users?: UsersOptionalDefaultsWithRelations | null;
};

export type WithdrawalsOptionalDefaultsWithRelations = z.infer<typeof WithdrawalsOptionalDefaultsSchema> & WithdrawalsOptionalDefaultsRelations

export const WithdrawalsOptionalDefaultsWithRelationsSchema: z.ZodType<WithdrawalsOptionalDefaultsWithRelations> = WithdrawalsOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default WithdrawalsSchema;
