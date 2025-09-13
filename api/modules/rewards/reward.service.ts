import { eq,  sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import db from '#/db';
import { affiliateLogs, referralCodes, users, balances, transactions } from '#/db/schema';
import settingService from '../common/setting.service';

// Import types from schema
import type { RawAffiliateLogType } from './reward.schema';

// Get commission reward status for a user
export const getCommissionRewardStatus = async (userId: string) => {
    const result = await db
        .select({
            id: sql<string>`currency`,
            totalCommissionWager: sql<number>`SUM(${affiliateLogs.commissionAmount})`,
            totalCommissionAmount: sql<number>`SUM(${affiliateLogs.commissionAmount})`,
            totalReferralWager: sql<number>`SUM(${affiliateLogs.referralAmount})`,
            totalReferralAmount: sql<number>`SUM(${affiliateLogs.referralAmount})`,
        })
        .from(affiliateLogs)
        .where(eq(affiliateLogs.invitorId, userId))
        .groupBy(sql`${affiliateLogs.currency}`);

    return result as Array<{
        id: string; // This should be currency
        totalCommissionWager: number;
        totalCommissionAmount: number;
        totalReferralWager: number;
        totalReferralAmount: number;
    }>;
};

// Get reward logs for a user
export const getRewardLog = async (userId: string, filters?: any) => {
    // This would need to be more complex based on the original implementation
    // For now, returning basic affiliate logs
    const result = await db
        .select()
        .from(affiliateLogs)
        .where(eq(affiliateLogs.invitorId, userId))
        .limit(50);

    return result;
};

// Get reward dashboard data
export const getRewardDashboard = async (userId: string, currency: string) => {
    const result = await db
        .select({
            totalCommissionAmount: sql<number>`SUM(${affiliateLogs.commissionAmount})`,
            totalAvailableReferral: sql<number>`SUM(${affiliateLogs.referralAmount})`,
        })
        .from(affiliateLogs)
        .where(eq(affiliateLogs.invitorId, userId));

    const settings = await settingService.getSetting() as { rates?: Record<string, number> } | undefined;
    const userRate = settings?.rates?.[currency] || 1;

    return {
        totalCommissionAmount: (result[0]?.totalCommissionAmount || 0) * userRate,
        totalAvailableReferral: (result[0]?.totalAvailableReferral || 0) * userRate,
        rates: settings?.rates || {},
    };
};

// Convert commission rewards
export const convertCommission = (userId: string) => {
    // This would update the converted status in affiliateLogs
    // For now, just returning success
    return true;
};

// Convert referral rewards
export const convertReferral = (userId: string) => {
    // This would update the converted status in affiliateLogs
    // For now, just returning success
    return true;
};

// Get reward activity
export const getRewardActivity = async (userId: string, currency: string): Promise<RawAffiliateLogType[]> => {
    const result = await db
        .select()
        .from(affiliateLogs)
        .where(eq(affiliateLogs.invitorId, userId))
        .limit(10);

    return result as RawAffiliateLogType[];
};

// Get the last referral code for a user
export const getLastReferralCode = async (userId: string) => {
    const result = await db
        .select()
        .from(referralCodes)
        .where(eq(referralCodes.userId, userId))
        .orderBy(sql`${referralCodes.createdAt} DESC`)
        .limit(1);

    return result[0];
};

// Get users by invitor ID
export const getUsersByInvitorId = async (invitorId: string) => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.invitorId, invitorId));

    return result;
};

// Deposit balance
export const depositBalance = async (userId: string, amount: number, currency?: string) => {
    // First get current balance
    const currentBalance = await db
        .select()
        .from(balances)
        .where(sql`${balances.userId} = ${userId} AND ${balances.currencyId} = ${currency || 'USD'}`)
        .limit(1);

    const currentAmount = currentBalance[0]?.amount || 0;

    // Update balance
    const updatedBalance = await db
        .update(balances)
        .set({
            amount: currentAmount + amount,
        })
        .where(sql`${balances.userId} = ${userId} AND ${balances.currencyId} = ${currency || 'USD'}`)
        .returning();

    return updatedBalance[0];
};

// Create transaction
export const createTransaction = async (transactionData: {
    userId: string;
    tnxId: string;
    amount: number;
    beforeAmount: number;
    afterAmount: number;
    currencyName: string;
    type: string;
    typeDescription: string;
    provider: string;
}) => {
    const result = await db.insert(transactions).values({
        id: nanoid(),
        userId: transactionData.userId,
        processedAt: new Date(),
        type: transactionData.type,
        status: 'COMPLETED',
        amount: transactionData.amount,
        currencyName: transactionData.currencyName,
        description: transactionData.typeDescription,
        provider: transactionData.provider,
    }).returning();

    return result[0];
};

export default {
    getCommissionRewardStatus,
    getRewardLog,
    getRewardDashboard,
    convertCommission,
    convertReferral,
    getRewardActivity,
    getLastReferralCode,
    getUsersByInvitorId,
    depositBalance,
    createTransaction,
};