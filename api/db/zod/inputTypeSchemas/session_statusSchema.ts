import { z } from 'zod';

export const session_statusSchema = z.enum(['ACTIVE','COMPLETED','EXPIRED','ABANDONED','TIMEOUT','OTP_PENDING']);

export type session_statusType = `${z.infer<typeof session_statusSchema>}`

export default session_statusSchema;
