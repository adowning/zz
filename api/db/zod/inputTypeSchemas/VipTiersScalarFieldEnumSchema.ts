import { z } from 'zod';

export const VipTiersScalarFieldEnumSchema = z.enum(['id','tiersName','icon','order','weeklyCashback','weeklyCashbackMin','weeklyCashbackPercent','monthlyCashback','monthlyCashbackMin','monthlyCashbackPercent','levelUpBonus','noFeeWithdrawal']);

export default VipTiersScalarFieldEnumSchema;
