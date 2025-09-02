import { z } from 'zod';
import { GameSpinsWithRelationsSchema, GameSpinsOptionalDefaultsWithRelationsSchema } from './GameSpinsSchema'
import type { GameSpinsWithRelations, GameSpinsOptionalDefaultsWithRelations } from './GameSpinsSchema'
import { JackpotsWithRelationsSchema, JackpotsOptionalDefaultsWithRelationsSchema } from './JackpotsSchema'
import type { JackpotsWithRelations, JackpotsOptionalDefaultsWithRelations } from './JackpotsSchema'

/////////////////////////////////////////
// JACKPOT CONTRIBUTIONS SCHEMA
/////////////////////////////////////////

export const JackpotContributionsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  jackpotId: z.string(),
  userId: z.string().nullable(),
  gameSpinId: z.string(),
  contributionAmountCoins: z.number(),
  createdAt: z.coerce.date(),
})

export type JackpotContributions = z.infer<typeof JackpotContributionsSchema>

/////////////////////////////////////////
// JACKPOT CONTRIBUTIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const JackpotContributionsOptionalDefaultsSchema = JackpotContributionsSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
}))

export type JackpotContributionsOptionalDefaults = z.infer<typeof JackpotContributionsOptionalDefaultsSchema>

/////////////////////////////////////////
// JACKPOT CONTRIBUTIONS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotContributionsRelations = {
  gameSpins: GameSpinsWithRelations;
  jackpots: JackpotsWithRelations;
};

export type JackpotContributionsWithRelations = z.infer<typeof JackpotContributionsSchema> & JackpotContributionsRelations

export const JackpotContributionsWithRelationsSchema: z.ZodType<JackpotContributionsWithRelations> = JackpotContributionsSchema.merge(z.object({
  gameSpins: z.lazy(() => GameSpinsWithRelationsSchema),
  jackpots: z.lazy(() => JackpotsWithRelationsSchema),
}))

/////////////////////////////////////////
// JACKPOT CONTRIBUTIONS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotContributionsOptionalDefaultsRelations = {
  gameSpins: GameSpinsOptionalDefaultsWithRelations;
  jackpots: JackpotsOptionalDefaultsWithRelations;
};

export type JackpotContributionsOptionalDefaultsWithRelations = z.infer<typeof JackpotContributionsOptionalDefaultsSchema> & JackpotContributionsOptionalDefaultsRelations

export const JackpotContributionsOptionalDefaultsWithRelationsSchema: z.ZodType<JackpotContributionsOptionalDefaultsWithRelations> = JackpotContributionsOptionalDefaultsSchema.merge(z.object({
  gameSpins: z.lazy(() => GameSpinsOptionalDefaultsWithRelationsSchema),
  jackpots: z.lazy(() => JackpotsOptionalDefaultsWithRelationsSchema),
}))

export default JackpotContributionsSchema;
