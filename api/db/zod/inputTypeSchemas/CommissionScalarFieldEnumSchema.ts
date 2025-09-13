import { z } from 'zod';

export const CommissionScalarFieldEnumSchema = z.enum(['id','master','affiliate','subAffiliate','settingId']);

export default CommissionScalarFieldEnumSchema;
