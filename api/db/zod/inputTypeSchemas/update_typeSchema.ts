import { z } from 'zod';

export const update_typeSchema = z.enum(['BINARY','OTA']);

export type update_typeType = `${z.infer<typeof update_typeSchema>}`

export default update_typeSchema;
