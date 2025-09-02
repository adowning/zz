import { z } from 'zod';

export const VipRankScalarFieldEnumSchema = z.enum(['id','name','minXp','dailyBonusCoinPct','hourlyBonusCoinPct','purchaseBonusCoinPct','levelUpBonusCoinPct','hasConcierge','hasVipLoungeAccess','isInvitationOnly']);

export default VipRankScalarFieldEnumSchema;
