import { z } from 'zod';

export const BlackjackMessageScalarFieldEnumSchema = z.enum(['id','event','requestId','payload','createdAt']);

export default BlackjackMessageScalarFieldEnumSchema;
