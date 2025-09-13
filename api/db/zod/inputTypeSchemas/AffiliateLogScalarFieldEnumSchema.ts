import { z } from 'zod';

export const AffiliateLogScalarFieldEnumSchema = z.enum(['id','invitorId','childId','currency','referralCode','betAmount','commissionAmount','commissionWager','totalReferralAmount','referralAmount','referralWager','lastVipLevelAmount','createdAt','updatedAt']);

export default AffiliateLogScalarFieldEnumSchema;
