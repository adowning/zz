import { z } from 'zod';

export const JackpotWinsScalarFieldEnumSchema = z.enum(['id','jackpotId','winnerId','winAmountCoins','gameSpinId','transactionId','createdAt','sessionDataId']);

export default JackpotWinsScalarFieldEnumSchema;
