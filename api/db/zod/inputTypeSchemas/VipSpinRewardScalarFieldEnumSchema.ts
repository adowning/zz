import { z } from 'zod';

export const VipSpinRewardScalarFieldEnumSchema = z.enum(['id','userId','amount','currency','createdAt']);

export default VipSpinRewardScalarFieldEnumSchema;
