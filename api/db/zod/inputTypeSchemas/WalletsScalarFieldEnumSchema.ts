import { z } from 'zod';

export const WalletsScalarFieldEnumSchema = z.enum(['id','balance','paymentMethod','currency','address','cashtag','operatorId','lastUsedAt','createdAt','updatedAt','userId']);

export default WalletsScalarFieldEnumSchema;
