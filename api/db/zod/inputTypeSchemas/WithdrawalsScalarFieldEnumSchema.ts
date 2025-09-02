import { z } from 'zod';

export const WithdrawalsScalarFieldEnumSchema = z.enum(['id','userId','amount','status','idNumber','firstName','lastName','channelsId','note','currencyType','currency','createdAt','updatedAt']);

export default WithdrawalsScalarFieldEnumSchema;
