import { z } from 'zod';
import { JackpotContributionsWithRelationsSchema, JackpotContributionsOptionalDefaultsWithRelationsSchema } from './JackpotContributionsSchema'
import type { JackpotContributionsWithRelations, JackpotContributionsOptionalDefaultsWithRelations } from './JackpotContributionsSchema'
import { JackpotWinsWithRelationsSchema, JackpotWinsOptionalDefaultsWithRelationsSchema } from './JackpotWinsSchema'
import type { JackpotWinsWithRelations, JackpotWinsOptionalDefaultsWithRelations } from './JackpotWinsSchema'

/////////////////////////////////////////
// JACKPOTS SCHEMA
/////////////////////////////////////////

export const JackpotsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  type: z.string(),
  currentAmountCoins: z.number(),
  seedAmountCoins: z.number(),
  minimumBetCoins: z.number(),
  contributionRateBasisPoints: z.number(),
  probabilityPerMillion: z.number(),
  minimumTimeBetweenWinsMinutes: z.number(),
  lastWonAt: z.coerce.date().nullable(),
  lastWonBy: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Jackpots = z.infer<typeof JackpotsSchema>

/////////////////////////////////////////
// JACKPOTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const JackpotsOptionalDefaultsSchema = JackpotsSchema.merge(z.object({
  minimumBetCoins: z.number().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type JackpotsOptionalDefaults = z.infer<typeof JackpotsOptionalDefaultsSchema>

/////////////////////////////////////////
// JACKPOTS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotsRelations = {
  jackpotContributions: JackpotContributionsWithRelations[];
  jackpotWins: JackpotWinsWithRelations[];
};

export type JackpotsWithRelations = z.infer<typeof JackpotsSchema> & JackpotsRelations

export const JackpotsWithRelationsSchema: z.ZodType<JackpotsWithRelations> = JackpotsSchema.merge(z.object({
  jackpotContributions: z.lazy(() => JackpotContributionsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// JACKPOTS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotsOptionalDefaultsRelations = {
  jackpotContributions: JackpotContributionsOptionalDefaultsWithRelations[];
  jackpotWins: JackpotWinsOptionalDefaultsWithRelations[];
};

export type JackpotsOptionalDefaultsWithRelations = z.infer<typeof JackpotsOptionalDefaultsSchema> & JackpotsOptionalDefaultsRelations

export const JackpotsOptionalDefaultsWithRelationsSchema: z.ZodType<JackpotsOptionalDefaultsWithRelations> = JackpotsOptionalDefaultsSchema.merge(z.object({
  jackpotContributions: z.lazy(() => JackpotContributionsOptionalDefaultsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsOptionalDefaultsWithRelationsSchema).array(),
}))

export default JackpotsSchema;
