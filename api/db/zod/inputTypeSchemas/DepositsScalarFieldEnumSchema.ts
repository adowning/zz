import { z } from 'zod';

export const DepositsScalarFieldEnumSchema = z.enum(['id','userId','amount','status','idNumber','firstName','lastName','channelsId','note','currency','createdAt','updatedAt']);

export default DepositsScalarFieldEnumSchema;
