import { z } from 'zod';

export const message_typeSchema = z.enum(['update_wallet','update_vip','update_balance','update_gameSession']);

export type message_typeType = `${z.infer<typeof message_typeSchema>}`

export default message_typeSchema;
