import { z } from 'zod';
import { SettingWithRelationsSchema, SettingOptionalDefaultsWithRelationsSchema } from './SettingSchema'
import type { SettingWithRelations, SettingOptionalDefaultsWithRelations } from './SettingSchema'

/////////////////////////////////////////
// COMMISSION SCHEMA
/////////////////////////////////////////

export const CommissionSchema = z.object({
  id: z.number(),
  master: z.number(),
  affiliate: z.number(),
  subAffiliate: z.number(),
  settingId: z.number(),
})

export type Commission = z.infer<typeof CommissionSchema>

/////////////////////////////////////////
// COMMISSION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CommissionOptionalDefaultsSchema = CommissionSchema.merge(z.object({
  id: z.number().optional(),
  master: z.number().optional(),
  affiliate: z.number().optional(),
  subAffiliate: z.number().optional(),
}))

export type CommissionOptionalDefaults = z.infer<typeof CommissionOptionalDefaultsSchema>

/////////////////////////////////////////
// COMMISSION RELATION SCHEMA
/////////////////////////////////////////

export type CommissionRelations = {
  setting: SettingWithRelations;
};

export type CommissionWithRelations = z.infer<typeof CommissionSchema> & CommissionRelations

export const CommissionWithRelationsSchema: z.ZodType<CommissionWithRelations> = CommissionSchema.merge(z.object({
  setting: z.lazy(() => SettingWithRelationsSchema),
}))

/////////////////////////////////////////
// COMMISSION OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type CommissionOptionalDefaultsRelations = {
  setting: SettingOptionalDefaultsWithRelations;
};

export type CommissionOptionalDefaultsWithRelations = z.infer<typeof CommissionOptionalDefaultsSchema> & CommissionOptionalDefaultsRelations

export const CommissionOptionalDefaultsWithRelationsSchema: z.ZodType<CommissionOptionalDefaultsWithRelations> = CommissionOptionalDefaultsSchema.merge(z.object({
  setting: z.lazy(() => SettingOptionalDefaultsWithRelationsSchema),
}))

export default CommissionSchema;
