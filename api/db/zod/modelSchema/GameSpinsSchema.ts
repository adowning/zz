import { z } from 'zod';
import { JackpotContributionsWithRelationsSchema, JackpotContributionsOptionalDefaultsWithRelationsSchema } from './JackpotContributionsSchema'
import type { JackpotContributionsWithRelations, JackpotContributionsOptionalDefaultsWithRelations } from './JackpotContributionsSchema'
import { JackpotWinsWithRelationsSchema, JackpotWinsOptionalDefaultsWithRelationsSchema } from './JackpotWinsSchema'
import type { JackpotWinsWithRelations, JackpotWinsOptionalDefaultsWithRelations } from './JackpotWinsSchema'

/////////////////////////////////////////
// GAME SPINS SCHEMA
/////////////////////////////////////////

export const GameSpinsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  playerName: z.string().nullable(),
  gameName: z.string().nullable(),
  gameId: z.string().nullable(),
  spinData: z.string().nullable(),
  grossWinAmount: z.number(),
  wagerAmount: z.number(),
  spinNumber: z.number(),
  playerAvatar: z.string().nullable(),
  currencyId: z.string().nullable(),
  sessionId: z.string(),
  userId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  occurredAt: z.coerce.date(),
  sessionDataId: z.string().nullable(),
  type: z.string().nullable(),
  operatorId: z.string().nullable(),
  status: z.string().nullable(),
  playerBalanceAtStart: z.number(),
  playerBalance: z.number(),
  gamePlayerWinTotalTodayid: z.number(),
  playerBetTotalToday: z.number(),
  sessionTotalWinAmount: z.number(),
  sessionTotalBetAmount: z.number(),
  gameSessionRtp: z.number(),
  playerRtpToday: z.number(),
  winAmount: z.number(),
  betAmount: z.number(),
})

export type GameSpins = z.infer<typeof GameSpinsSchema>

/////////////////////////////////////////
// GAME SPINS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GameSpinsOptionalDefaultsSchema = GameSpinsSchema.merge(z.object({
  spinNumber: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  playerBalanceAtStart: z.number().optional(),
  playerBalance: z.number().optional(),
  gamePlayerWinTotalTodayid: z.number().optional(),
  playerBetTotalToday: z.number().optional(),
  sessionTotalWinAmount: z.number().optional(),
  sessionTotalBetAmount: z.number().optional(),
  gameSessionRtp: z.number().optional(),
  playerRtpToday: z.number().optional(),
  winAmount: z.number().optional(),
  betAmount: z.number().optional(),
}))

export type GameSpinsOptionalDefaults = z.infer<typeof GameSpinsOptionalDefaultsSchema>

/////////////////////////////////////////
// GAME SPINS RELATION SCHEMA
/////////////////////////////////////////

export type GameSpinsRelations = {
  jackpotContributions: JackpotContributionsWithRelations[];
  jackpotWins?: JackpotWinsWithRelations | null;
};

export type GameSpinsWithRelations = z.infer<typeof GameSpinsSchema> & GameSpinsRelations

export const GameSpinsWithRelationsSchema: z.ZodType<GameSpinsWithRelations> = GameSpinsSchema.merge(z.object({
  jackpotContributions: z.lazy(() => JackpotContributionsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// GAME SPINS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type GameSpinsOptionalDefaultsRelations = {
  jackpotContributions: JackpotContributionsOptionalDefaultsWithRelations[];
  jackpotWins?: JackpotWinsOptionalDefaultsWithRelations | null;
};

export type GameSpinsOptionalDefaultsWithRelations = z.infer<typeof GameSpinsOptionalDefaultsSchema> & GameSpinsOptionalDefaultsRelations

export const GameSpinsOptionalDefaultsWithRelationsSchema: z.ZodType<GameSpinsOptionalDefaultsWithRelations> = GameSpinsOptionalDefaultsSchema.merge(z.object({
  jackpotContributions: z.lazy(() => JackpotContributionsOptionalDefaultsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default GameSpinsSchema;
