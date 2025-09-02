import { z } from 'zod';
import { Prisma } from '@prisma/client'
import { session_statusSchema } from '../inputTypeSchemas/session_statusSchema'
import { AuthSessionsWithRelationsSchema, AuthSessionsOptionalDefaultsWithRelationsSchema } from './AuthSessionsSchema'
import type { AuthSessionsWithRelations, AuthSessionsOptionalDefaultsWithRelations } from './AuthSessionsSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// GAME SESSIONS SCHEMA
/////////////////////////////////////////

export const GameSessionsSchema = z.object({
  status: session_statusSchema,
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  authSessionId: z.string(),
  userId: z.string(),
  gameId: z.string().nullable(),
  totalWagered: z.number(),
  totalWon: z.number(),
  totalXpGained: z.number(),
  rtp: z.instanceof(Prisma.Decimal, { message: "Field 'rtp' must be a Decimal. Location: ['Models', 'GameSessions']"}).nullable(),
  duration: z.number(),
  createdAt: z.coerce.date(),
  endAt: z.coerce.date().nullable(),
  startingBalance: z.number(),
})

export type GameSessions = z.infer<typeof GameSessionsSchema>

/////////////////////////////////////////
// GAME SESSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GameSessionsOptionalDefaultsSchema = GameSessionsSchema.merge(z.object({
  status: session_statusSchema.optional(),
  totalWagered: z.number().optional(),
  totalWon: z.number().optional(),
  totalXpGained: z.number().optional(),
  duration: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  startingBalance: z.number().optional(),
}))

export type GameSessionsOptionalDefaults = z.infer<typeof GameSessionsOptionalDefaultsSchema>

/////////////////////////////////////////
// GAME SESSIONS RELATION SCHEMA
/////////////////////////////////////////

export type GameSessionsRelations = {
  authSessions: AuthSessionsWithRelations;
  users: UsersWithRelations;
};

export type GameSessionsWithRelations = z.infer<typeof GameSessionsSchema> & GameSessionsRelations

export const GameSessionsWithRelationsSchema: z.ZodType<GameSessionsWithRelations> = GameSessionsSchema.merge(z.object({
  authSessions: z.lazy(() => AuthSessionsWithRelationsSchema),
  users: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// GAME SESSIONS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type GameSessionsOptionalDefaultsRelations = {
  authSessions: AuthSessionsOptionalDefaultsWithRelations;
  users: UsersOptionalDefaultsWithRelations;
};

export type GameSessionsOptionalDefaultsWithRelations = z.infer<typeof GameSessionsOptionalDefaultsSchema> & GameSessionsOptionalDefaultsRelations

export const GameSessionsOptionalDefaultsWithRelationsSchema: z.ZodType<GameSessionsOptionalDefaultsWithRelations> = GameSessionsOptionalDefaultsSchema.merge(z.object({
  authSessions: z.lazy(() => AuthSessionsOptionalDefaultsWithRelationsSchema),
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default GameSessionsSchema;
