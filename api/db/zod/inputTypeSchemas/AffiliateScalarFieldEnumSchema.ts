import { z } from 'zod';

export const AffiliateScalarFieldEnumSchema = z.enum(['id','username','firstName','lastName','status','email','role','referralCode','parentId','path','password','createdAt','updatedAt']);

export default AffiliateScalarFieldEnumSchema;
