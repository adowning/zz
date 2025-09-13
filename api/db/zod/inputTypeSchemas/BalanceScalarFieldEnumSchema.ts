import { z } from 'zod';

export const BalanceScalarFieldEnumSchema = z.enum(['id','amount','pending','bonus','withdrawable','turnover','createdAt','updatedAt','userId','currencyId']);

export default BalanceScalarFieldEnumSchema;
