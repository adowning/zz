import { z } from 'zod';
import { UsersWithRelationsSchema, UsersOptionalDefaultsWithRelationsSchema } from './UsersSchema'
import type { UsersWithRelations, UsersOptionalDefaultsWithRelations } from './UsersSchema'
import { OperatorsWithRelationsSchema, OperatorsOptionalDefaultsWithRelationsSchema } from './OperatorsSchema'
import type { OperatorsWithRelations, OperatorsOptionalDefaultsWithRelations } from './OperatorsSchema'

/////////////////////////////////////////
// OPERATOR SWITCH HISTORY SCHEMA
/////////////////////////////////////////

export const OperatorSwitchHistorySchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  userId: z.string(),
  fromOperatorId: z.string().nullable(),
  toOperatorId: z.string(),
  switchedAt: z.coerce.date(),
})

export type OperatorSwitchHistory = z.infer<typeof OperatorSwitchHistorySchema>

/////////////////////////////////////////
// OPERATOR SWITCH HISTORY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OperatorSwitchHistoryOptionalDefaultsSchema = OperatorSwitchHistorySchema.merge(z.object({
  switchedAt: z.coerce.date().optional(),
}))

export type OperatorSwitchHistoryOptionalDefaults = z.infer<typeof OperatorSwitchHistoryOptionalDefaultsSchema>

/////////////////////////////////////////
// OPERATOR SWITCH HISTORY RELATION SCHEMA
/////////////////////////////////////////

export type OperatorSwitchHistoryRelations = {
  user: UsersWithRelations;
  fromOperator?: OperatorsWithRelations | null;
  toOperator: OperatorsWithRelations;
};

export type OperatorSwitchHistoryWithRelations = z.infer<typeof OperatorSwitchHistorySchema> & OperatorSwitchHistoryRelations

export const OperatorSwitchHistoryWithRelationsSchema: z.ZodType<OperatorSwitchHistoryWithRelations> = OperatorSwitchHistorySchema.merge(z.object({
  user: z.lazy(() => UsersWithRelationsSchema),
  fromOperator: z.lazy(() => OperatorsWithRelationsSchema).nullable(),
  toOperator: z.lazy(() => OperatorsWithRelationsSchema),
}))

/////////////////////////////////////////
// OPERATOR SWITCH HISTORY OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OperatorSwitchHistoryOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
  fromOperator?: OperatorsOptionalDefaultsWithRelations | null;
  toOperator: OperatorsOptionalDefaultsWithRelations;
};

export type OperatorSwitchHistoryOptionalDefaultsWithRelations = z.infer<typeof OperatorSwitchHistoryOptionalDefaultsSchema> & OperatorSwitchHistoryOptionalDefaultsRelations

export const OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema: z.ZodType<OperatorSwitchHistoryOptionalDefaultsWithRelations> = OperatorSwitchHistoryOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
  fromOperator: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema).nullable(),
  toOperator: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema),
}))

export default OperatorSwitchHistorySchema;
