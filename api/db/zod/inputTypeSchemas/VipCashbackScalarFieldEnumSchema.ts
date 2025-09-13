import { z } from 'zod';

export const VipCashbackScalarFieldEnumSchema = z.enum(['id','userId','amount','currency','tiersName','type','createdAt']);

export default VipCashbackScalarFieldEnumSchema;
