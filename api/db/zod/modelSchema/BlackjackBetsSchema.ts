import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import { BlackjackGamesWithRelationsSchema, BlackjackGamesOptionalDefaultsWithRelationsSchema } from './BlackjackGamesSchema'
import type { BlackjackGamesWithRelations, BlackjackGamesOptionalDefaultsWithRelations } from './BlackjackGamesSchema'
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'

/////////////////////////////////////////
// BLACKJACK BETS SCHEMA
/////////////////////////////////////////

export const BlackjackBetsSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  userId: z.string(),
  gameId: z.string(),
  seat: z.number(),
  amount: JsonValueSchema,
  cards: JsonValueSchema.nullable(),
  cardsLeft: JsonValueSchema.nullable(),
  cardsRight: JsonValueSchema.nullable(),
  actions: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
})

export type BlackjackBets = z.infer<typeof BlackjackBetsSchema>

/////////////////////////////////////////
// BLACKJACK BETS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BlackjackBetsOptionalDefaultsSchema = BlackjackBetsSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
}))

export type BlackjackBetsOptionalDefaults = z.infer<typeof BlackjackBetsOptionalDefaultsSchema>

/////////////////////////////////////////
// BLACKJACK BETS RELATION SCHEMA
/////////////////////////////////////////

export type BlackjackBetsRelations = {
  blackjackGames: BlackjackGamesWithRelations;
  users: UsersWithRelations;
};

export type BlackjackBetsWithRelations = Omit<z.infer<typeof BlackjackBetsSchema>, "cards" | "cardsLeft" | "cardsRight" | "actions"> & {
  cards?: JsonValueType | null;
  cardsLeft?: JsonValueType | null;
  cardsRight?: JsonValueType | null;
  actions?: JsonValueType | null;
} & BlackjackBetsRelations

export const BlackjackBetsWithRelationsSchema: z.ZodType<BlackjackBetsWithRelations> = BlackjackBetsSchema.merge(z.object({
  blackjackGames: z.lazy(() => BlackjackGamesWithRelationsSchema),
  users: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// BLACKJACK BETS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type BlackjackBetsOptionalDefaultsRelations = {
  blackjackGames: BlackjackGamesOptionalDefaultsWithRelations;
  users: UsersOptionalDefaultsWithRelations;
};

export type BlackjackBetsOptionalDefaultsWithRelations = Omit<z.infer<typeof BlackjackBetsOptionalDefaultsSchema>, "cards" | "cardsLeft" | "cardsRight" | "actions"> & {
  cards?: JsonValueType | null;
  cardsLeft?: JsonValueType | null;
  cardsRight?: JsonValueType | null;
  actions?: JsonValueType | null;
} & BlackjackBetsOptionalDefaultsRelations

export const BlackjackBetsOptionalDefaultsWithRelationsSchema: z.ZodType<BlackjackBetsOptionalDefaultsWithRelations> = BlackjackBetsOptionalDefaultsSchema.merge(z.object({
  blackjackGames: z.lazy(() => BlackjackGamesOptionalDefaultsWithRelationsSchema),
  users: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
}))

export default BlackjackBetsSchema;
