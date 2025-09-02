import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import { BlackjackBetsWithRelationsSchema, BlackjackBetsOptionalDefaultsWithRelationsSchema } from './BlackjackBetsSchema'
import type { BlackjackBetsWithRelations, BlackjackBetsOptionalDefaultsWithRelations } from './BlackjackBetsSchema'

/////////////////////////////////////////
// BLACKJACK GAMES SCHEMA
/////////////////////////////////////////

export const BlackjackGamesSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  table: z.number(),
  type: z.string(),
  state: z.string(),
  deck: JsonValueSchema.nullable(),
  dealerCards: JsonValueSchema.nullable(),
  fair: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type BlackjackGames = z.infer<typeof BlackjackGamesSchema>

/////////////////////////////////////////
// BLACKJACK GAMES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BlackjackGamesOptionalDefaultsSchema = BlackjackGamesSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type BlackjackGamesOptionalDefaults = z.infer<typeof BlackjackGamesOptionalDefaultsSchema>

/////////////////////////////////////////
// BLACKJACK GAMES RELATION SCHEMA
/////////////////////////////////////////

export type BlackjackGamesRelations = {
  blackjackBets: BlackjackBetsWithRelations[];
};

export type BlackjackGamesWithRelations = Omit<z.infer<typeof BlackjackGamesSchema>, "deck" | "dealerCards" | "fair"> & {
  deck?: JsonValueType | null;
  dealerCards?: JsonValueType | null;
  fair?: JsonValueType | null;
} & BlackjackGamesRelations

export const BlackjackGamesWithRelationsSchema: z.ZodType<BlackjackGamesWithRelations> = BlackjackGamesSchema.merge(z.object({
  blackjackBets: z.lazy(() => BlackjackBetsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// BLACKJACK GAMES OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type BlackjackGamesOptionalDefaultsRelations = {
  blackjackBets: BlackjackBetsOptionalDefaultsWithRelations[];
};

export type BlackjackGamesOptionalDefaultsWithRelations = Omit<z.infer<typeof BlackjackGamesOptionalDefaultsSchema>, "deck" | "dealerCards" | "fair"> & {
  deck?: JsonValueType | null;
  dealerCards?: JsonValueType | null;
  fair?: JsonValueType | null;
} & BlackjackGamesOptionalDefaultsRelations

export const BlackjackGamesOptionalDefaultsWithRelationsSchema: z.ZodType<BlackjackGamesOptionalDefaultsWithRelations> = BlackjackGamesOptionalDefaultsSchema.merge(z.object({
  blackjackBets: z.lazy(() => BlackjackBetsOptionalDefaultsWithRelationsSchema).array(),
}))

export default BlackjackGamesSchema;
