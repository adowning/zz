import { z } from 'zod';

export const JackpotContributionsScalarFieldEnumSchema = z.enum(['id','jackpotId','userId','gameSpinId','contributionAmountCoins','createdAt']);

export default JackpotContributionsScalarFieldEnumSchema;
