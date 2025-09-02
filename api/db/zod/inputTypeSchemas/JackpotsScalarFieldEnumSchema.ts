import { z } from 'zod';

export const JackpotsScalarFieldEnumSchema = z.enum(['id','type','currentAmountCoins','seedAmountCoins','minimumBetCoins','contributionRateBasisPoints','probabilityPerMillion','minimumTimeBetweenWinsMinutes','lastWonAt','lastWonBy','isActive','createdAt','updatedAt']);

export default JackpotsScalarFieldEnumSchema;
