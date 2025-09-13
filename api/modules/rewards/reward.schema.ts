import { createSelectSchema } from 'drizzle-zod';
import { affiliateLogs } from '#/db/schema';
import { z } from 'zod';

// Create select schema for affiliate logs
export const AffiliateLogSelectSchema = createSelectSchema(affiliateLogs);

// Reward status response schema
export const RewardStatusResponse = z.object({
  commissionReward: z.number(),
  commissionAvailable: z.number(),
  referralReward: z.number(),
  referralAvailable: z.number(),
});

// Reward convert payload schema
export const RewardConvertPayload = z.object({
  type: z.enum(['commission', 'referral']),
});

// Reward convert response schema
export const RewardConvertResponse = z.object({
  status: z.union([z.boolean(), z.string()]),
});

// Reward dashboard response schema
export const RewardDashboardResponse = z.object({
  totalCommissionReward: z.number().optional(),
  totalCommissionAmount: z.number().optional(),
  totalAvailableReferral: z.number().optional(),
  friends: z.number(),
  code: z.string(),
});

// Raw affiliate log data (from database)
export const RawAffiliateLogSchema = z.object({
  id: z.string(),
  invitorId: z.string(),
  childId: z.string(),
  currency: z.string(),
  referralCode: z.string(),
  betAmount: z.number(),
  commissionAmount: z.number(),
  commissionWager: z.number(),
  totalReferralAmount: z.number(),
  referralAmount: z.number(),
  referralWager: z.number(),
  lastVipLevelAmount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Reward activity response schema
export const RewardActivityResponse = z.array(z.object({
  id: z.string(),
  invitorId: z.string(),
  childId: z.string(),
  currency: z.string(),
  referralCode: z.string(),
  betAmount: z.number(),
  commissionAmount: z.number(),
  commissionWager: z.number(),
  totalReferralAmount: z.number(),
  referralAmount: z.number(),
  referralWager: z.number(),
  lastVipLevelAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
}));

// Generic pagination/log query payload
export const RewardLogPayload = z.object({
  // Add pagination and filter parameters as needed
  // This matches the original controller that uses ...req.body
});

// Type definitions
export type RewardStatusResponseType = z.infer<typeof RewardStatusResponse>;
export type RewardConvertPayloadType = z.infer<typeof RewardConvertPayload>;
export type RewardConvertResponseType = z.infer<typeof RewardConvertResponse>;
export type RewardDashboardResponseType = z.infer<typeof RewardDashboardResponse>;
export type RewardActivityResponseType = z.infer<typeof RewardActivityResponse>;
export type RawAffiliateLogType = z.infer<typeof RawAffiliateLogSchema>;
export type RewardLogPayloadType = z.infer<typeof RewardLogPayload>;