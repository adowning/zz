import { z } from 'zod';

export const ReferralCodeScalarFieldEnumSchema = z.enum(['id','code','name','commissionRate','createdAt','updatedAt','userId']);

export default ReferralCodeScalarFieldEnumSchema;
