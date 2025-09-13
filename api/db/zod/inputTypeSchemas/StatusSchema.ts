import { z } from 'zod';

export const StatusSchema = z.enum(['ACTIVE','INACTIVE','BANNED']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export default StatusSchema;
