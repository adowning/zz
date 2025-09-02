import { z } from 'zod';

export const VipLevelUpHistoryScalarFieldEnumSchema = z.enum(['id','previousLevel','newLevel','timestamp','VipInfoId']);

export default VipLevelUpHistoryScalarFieldEnumSchema;
