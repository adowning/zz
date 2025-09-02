import { z } from 'zod';

export const VipInfoScalarFieldEnumSchema = z.enum(['id','level','xp','totalXp','userId','currentRankid','createdAt','updatedAt']);

export default VipInfoScalarFieldEnumSchema;
