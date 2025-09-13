import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import { OperatorsWithRelationsSchema, OperatorsOptionalDefaultsWithRelationsSchema } from './OperatorsSchema'
import type { OperatorsWithRelations, OperatorsOptionalDefaultsWithRelations } from './OperatorsSchema'

/////////////////////////////////////////
// GAMES SCHEMA
/////////////////////////////////////////

export const GamesSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  tags: z.string(),
  thumbnailUrl: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  developer: z.string(),
  providerId: z.string().nullable(),
  totalWagered: z.number(),
  totalWon: z.number(),
  goldsvetData: JsonValueSchema.nullable(),
  targetRtp: z.number().nullable(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  operatorId: z.string().nullable(),
  isHorizontal: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  status: z.number(),
})

export type Games = z.infer<typeof GamesSchema>

/////////////////////////////////////////
// GAMES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GamesOptionalDefaultsSchema = GamesSchema.merge(z.object({
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  isHorizontal: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.number().optional(),
}))

export type GamesOptionalDefaults = z.infer<typeof GamesOptionalDefaultsSchema>

/////////////////////////////////////////
// GAMES RELATION SCHEMA
/////////////////////////////////////////

export type GamesRelations = {
  operators?: OperatorsWithRelations | null;
};

export type GamesWithRelations = Omit<z.infer<typeof GamesSchema>, "goldsvetData"> & {
  goldsvetData?: JsonValueType | null;
} & GamesRelations

export const GamesWithRelationsSchema: z.ZodType<GamesWithRelations> = GamesSchema.merge(z.object({
  operators: z.lazy(() => OperatorsWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// GAMES OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type GamesOptionalDefaultsRelations = {
  operators?: OperatorsOptionalDefaultsWithRelations | null;
};

export type GamesOptionalDefaultsWithRelations = Omit<z.infer<typeof GamesOptionalDefaultsSchema>, "goldsvetData"> & {
  goldsvetData?: JsonValueType | null;
} & GamesOptionalDefaultsRelations

export const GamesOptionalDefaultsWithRelationsSchema: z.ZodType<GamesOptionalDefaultsWithRelations> = GamesOptionalDefaultsSchema.merge(z.object({
  operators: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default GamesSchema;
