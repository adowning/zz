import { z } from 'zod';
import { GameSpinsWithRelationsSchema, GameSpinsOptionalDefaultsWithRelationsSchema } from './GameSpinsSchema'
import type { GameSpinsWithRelations, GameSpinsOptionalDefaultsWithRelations } from './GameSpinsSchema'
import { JackpotsWithRelationsSchema, JackpotsOptionalDefaultsWithRelationsSchema } from './JackpotsSchema'
import type { JackpotsWithRelations, JackpotsOptionalDefaultsWithRelations } from './JackpotsSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// JACKPOT WINS SCHEMA
/////////////////////////////////////////

export const JackpotWinsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  jackpotId: z.string(),
  winnerId: z.string(),
  winAmountCoins: z.number(),
  gameSpinId: z.string(),
  transactionId: z.string().nullable(),
  createdAt: z.coerce.date(),
  sessionDataId: z.string().nullable(),
})

export type JackpotWins = z.infer<typeof JackpotWinsSchema>

/////////////////////////////////////////
// JACKPOT WINS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const JackpotWinsOptionalDefaultsSchema = JackpotWinsSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
}))

export type JackpotWinsOptionalDefaults = z.infer<typeof JackpotWinsOptionalDefaultsSchema>

/////////////////////////////////////////
// JACKPOT WINS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotWinsRelations = {
  gameSpins: GameSpinsWithRelations;
  jackpots: JackpotsWithRelations;
  user: UsersWithRelations;
};

export type JackpotWinsWithRelations = z.infer<typeof JackpotWinsSchema> & JackpotWinsRelations

export const JackpotWinsWithRelationsSchema: z.ZodType<JackpotWinsWithRelations> = JackpotWinsSchema.merge(z.object({
  gameSpins: z.lazy(() => GameSpinsWithRelationsSchema),
  jackpots: z.lazy(() => JackpotsWithRelationsSchema),
  user: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// JACKPOT WINS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type JackpotWinsOptionalDefaultsRelations = {
  gameSpins: GameSpinsOptionalDefaultsWithRelations;
  jackpots: JackpotsOptionalDefaultsWithRelations;
  user: UsersOptionalDefaultsWithRelations;
};

export type JackpotWinsOptionalDefaultsWithRelations = z.infer<typeof JackpotWinsOptionalDefaultsSchema> & JackpotWinsOptionalDefaultsRelations

export const JackpotWinsOptionalDefaultsWithRelationsSchema: z.ZodType<JackpotWinsOptionalDefaultsWithRelations> = JackpotWinsOptionalDefaultsSchema.merge(z.object({
  gameSpins: z.lazy(() => GameSpinsOptionalDefaultsWithRelationsSchema),
  jackpots: z.lazy(() => JackpotsOptionalDefaultsWithRelationsSchema),
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default JackpotWinsSchema;
