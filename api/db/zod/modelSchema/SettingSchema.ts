import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { VipLevelWithRelationsSchema, VipLevelOptionalDefaultsWithRelationsSchema } from './VipLevelSchema'
import type { VipLevelWithRelations, VipLevelOptionalDefaultsWithRelations } from './VipLevelSchema'
import { CommissionWithRelationsSchema, CommissionOptionalDefaultsWithRelationsSchema } from './CommissionSchema'
import type { CommissionWithRelations, CommissionOptionalDefaultsWithRelations } from './CommissionSchema'

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  id: z.number(),
  name: z.string(),
  referralCodeCount: z.number(),
  referralCommissionRate: z.number(),
  rates: JsonValueSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Setting = z.infer<typeof SettingSchema>

/////////////////////////////////////////
// SETTING OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SettingOptionalDefaultsSchema = SettingSchema.merge(z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  referralCodeCount: z.number().optional(),
  referralCommissionRate: z.number().optional(),
  rates: JsonValueSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type SettingOptionalDefaults = z.infer<typeof SettingOptionalDefaultsSchema>

/////////////////////////////////////////
// SETTING RELATION SCHEMA
/////////////////////////////////////////

export type SettingRelations = {
  vipLevels: VipLevelWithRelations[];
  commission?: CommissionWithRelations | null;
};

export type SettingWithRelations = z.infer<typeof SettingSchema> & SettingRelations

export const SettingWithRelationsSchema: z.ZodType<SettingWithRelations> = SettingSchema.merge(z.object({
  vipLevels: z.lazy(() => VipLevelWithRelationsSchema).array(),
  commission: z.lazy(() => CommissionWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// SETTING OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SettingOptionalDefaultsRelations = {
  vipLevels: VipLevelOptionalDefaultsWithRelations[];
  commission?: CommissionOptionalDefaultsWithRelations | null;
};

export type SettingOptionalDefaultsWithRelations = z.infer<typeof SettingOptionalDefaultsSchema> & SettingOptionalDefaultsRelations

export const SettingOptionalDefaultsWithRelationsSchema: z.ZodType<SettingOptionalDefaultsWithRelations> = SettingOptionalDefaultsSchema.merge(z.object({
  vipLevels: z.lazy(() => VipLevelOptionalDefaultsWithRelationsSchema).array(),
  commission: z.lazy(() => CommissionOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default SettingSchema;
