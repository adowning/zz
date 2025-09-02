import { z } from 'zod';
import { session_statusSchema } from '../inputTypeSchemas/session_statusSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import { GameSessionsWithRelationsSchema, GameSessionsOptionalDefaultsWithRelationsSchema } from './GameSessionsSchema'
import type { GameSessionsWithRelations, GameSessionsOptionalDefaultsWithRelations } from './GameSessionsSchema'

/////////////////////////////////////////
// AUTH SESSIONS SCHEMA
/////////////////////////////////////////

export const AuthSessionsSchema = z.object({
  status: session_statusSchema,
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  userId: z.string(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  deviceId: z.string().nullable(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date().nullable(),
  lastSeen: z.coerce.date(),
  otp: z.string().nullable(),
})

export type AuthSessions = z.infer<typeof AuthSessionsSchema>

/////////////////////////////////////////
// AUTH SESSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AuthSessionsOptionalDefaultsSchema = AuthSessionsSchema.merge(z.object({
  status: session_statusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  lastSeen: z.coerce.date().optional(),
}))

export type AuthSessionsOptionalDefaults = z.infer<typeof AuthSessionsOptionalDefaultsSchema>

/////////////////////////////////////////
// AUTH SESSIONS RELATION SCHEMA
/////////////////////////////////////////

export type AuthSessionsRelations = {
  users: UsersWithRelations;
  gameSessions: GameSessionsWithRelations[];
};

export type AuthSessionsWithRelations = z.infer<typeof AuthSessionsSchema> & AuthSessionsRelations

export const AuthSessionsWithRelationsSchema: z.ZodType<AuthSessionsWithRelations> = AuthSessionsSchema.merge(z.object({
  users: z.lazy(() => UsersWithRelationsSchema),
  gameSessions: z.lazy(() => GameSessionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// AUTH SESSIONS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AuthSessionsOptionalDefaultsRelations = {
  users: UsersOptionalDefaultsWithRelations;
  gameSessions: GameSessionsOptionalDefaultsWithRelations[];
};

export type AuthSessionsOptionalDefaultsWithRelations = z.infer<typeof AuthSessionsOptionalDefaultsSchema> & AuthSessionsOptionalDefaultsRelations

export const AuthSessionsOptionalDefaultsWithRelationsSchema: z.ZodType<AuthSessionsOptionalDefaultsWithRelations> = AuthSessionsOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  gameSessions: z.lazy(() => GameSessionsOptionalDefaultsWithRelationsSchema).array(),
}))

export default AuthSessionsSchema;
