import { z } from 'zod';

export const TransactionStatusSchema = z.enum(['PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED','REFUNDED','EXPIRED','REJECTED','REQUIRES_ACTION','ON_HOLD']);

export type TransactionStatusType = `${z.infer<typeof TransactionStatusSchema>}`

export default TransactionStatusSchema;
