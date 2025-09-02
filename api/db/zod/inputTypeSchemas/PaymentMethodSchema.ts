import { z } from 'zod';

export const PaymentMethodSchema = z.enum(['INSTORE_CASH','INSTORE_CARD','CASH_APP']);

export type PaymentMethodType = `${z.infer<typeof PaymentMethodSchema>}`

export default PaymentMethodSchema;
