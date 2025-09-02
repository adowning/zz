import { z } from 'zod';

/////////////////////////////////////////
// APP VERSIONS SCHEMA
/////////////////////////////////////////

export const AppVersionsSchema = z.object({
  id: z.number(),
  appId: z.string(),
  version: z.string(),
  platform: z.string(),
  updateType: z.string(),
  downloadUrl: z.string(),
  changelog: z.string().array(),
  mandatory: z.boolean(),
  releaseDate: z.coerce.date(),
  fileSize: z.number(),
  checksum: z.string(),
})

export type AppVersions = z.infer<typeof AppVersionsSchema>

/////////////////////////////////////////
// APP VERSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AppVersionsOptionalDefaultsSchema = AppVersionsSchema.merge(z.object({
  id: z.number().optional(),
  mandatory: z.boolean().optional(),
}))

export type AppVersionsOptionalDefaults = z.infer<typeof AppVersionsOptionalDefaultsSchema>

export default AppVersionsSchema;
