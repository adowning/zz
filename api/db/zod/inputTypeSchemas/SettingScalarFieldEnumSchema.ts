import { z } from 'zod';

export const SettingScalarFieldEnumSchema = z.enum(['id','name','referralCodeCount','referralCommissionRate','rates','createdAt','updatedAt']);

export default SettingScalarFieldEnumSchema;
