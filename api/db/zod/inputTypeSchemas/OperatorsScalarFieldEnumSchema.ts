import { z } from 'zod';

export const OperatorsScalarFieldEnumSchema = z.enum(['id','name','operatorSecret','operatorAccess','callbackUrl','isActive','allowedIps','description','productIds','balance','netRevenue','acceptedPayments','ownerId','lastUsedAt','createdAt','updatedAt']);

export default OperatorsScalarFieldEnumSchema;
