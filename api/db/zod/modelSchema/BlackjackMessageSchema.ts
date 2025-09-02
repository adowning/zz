import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// BLACKJACK MESSAGE SCHEMA
/////////////////////////////////////////

export const BlackjackMessageSchema = z.object({
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  event: z.string().nullable(),
  requestId: z.string().nullable(),
  payload: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
})

export type BlackjackMessage = z.infer<typeof BlackjackMessageSchema>

/////////////////////////////////////////
// BLACKJACK MESSAGE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BlackjackMessageOptionalDefaultsSchema = BlackjackMessageSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
}))

export type BlackjackMessageOptionalDefaults = z.infer<typeof BlackjackMessageOptionalDefaultsSchema>

export default BlackjackMessageSchema;
