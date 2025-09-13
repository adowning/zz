import { z } from 'zod';

export const VipLevelUpBonusScalarFieldEnumSchema = z.enum(['id','userId','amount','levelName','levelXp','createdAt']);

export default VipLevelUpBonusScalarFieldEnumSchema;
