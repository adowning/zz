import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';
import settingService from '../common/setting.service';
import * as rewardService from './reward.service';
import type { RewardStatusResponseType, RewardConvertPayloadType, RewardConvertResponseType, RewardActivityResponseType, RewardDashboardResponseType } from './reward.schema';

export const getRewardStatus = async (c: Context): Promise<TypedResponse<RewardStatusResponseType, 200, "json">> => {
    try {
        const user = c.get('user');
        const userId = user.id;
        const currency = user.currency || 'USD';

        const setting = await settingService.getSetting();
        if (!setting) {
            throw new HTTPException(500, { message: 'Settings not found' });
        }

        const commissionRewards = await rewardService.getCommissionRewardStatus(userId);

        let commissionReward = 0;
        let commissionAvailable = 0;
        let referralReward = 0;
        let referralAvailable = 0;

        const rates = setting.rates as Record<string, number>;
        commissionRewards.forEach((c) => {
            const rate = rates[c.id] || 1;
            commissionReward += c.totalCommissionWager * (1 / rate);
            commissionAvailable += c.totalCommissionAmount * (1 / rate);
            referralReward += c.totalReferralWager * (1 / rate);
            referralAvailable += c.totalReferralAmount * (1 / rate);
        });

        const userRate = rates[currency] || 1;

        return c.json({
            commissionReward: commissionReward * userRate,
            commissionAvailable: commissionAvailable * userRate,
            referralReward: referralReward * userRate,
            referralAvailable: referralAvailable * userRate
        });
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error getting reward status:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

export const getRewardLog = async (c: Context) => {
    try {
        const user = c.get('user');
        const userId = user.id;
        const logs = await rewardService.getRewardLog(userId, c.req.query());
        return c.json(logs);
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error getting reward logs:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

export const getRewardDashboard = async (c: Context): Promise<TypedResponse<RewardDashboardResponseType, 200, "json">> => {
    try {
        const user = c.get('user');
        const userId = user.id;
        const currency = user.currency || 'USD';

        const codeData = await rewardService.getLastReferralCode(userId);
        const friends = await rewardService.getUsersByInvitorId(userId);
        const rewardData = await rewardService.getRewardDashboard(userId, currency);

        return c.json({
            ...rewardData,
            code: codeData?.code || '',
            friends: friends.length
        });
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error getting reward dashboard:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

export const getRewardConvert = async (c: Context): Promise<TypedResponse<RewardConvertResponseType, 200, "json">> => {
    try {
        const user = c.get('user');
        const userId = user.id;
        const currency = user.currency || 'USD';

        const data: RewardConvertPayloadType = await c.req.json();
        const { type } = data;

        const rewardData = await rewardService.getRewardDashboard(userId, currency);

        if (type === 'commission') {
            await rewardService.convertCommission(userId);
            const updatedBalance = await rewardService.depositBalance(userId, rewardData.totalCommissionAmount || 0, currency);

            await rewardService.createTransaction({
                userId,
                tnxId: new Date().valueOf().toString(),
                amount: Number((rewardData.totalCommissionAmount || 0).toFixed(2)),
                beforeAmount: Number((updatedBalance.amount - (rewardData.totalCommissionAmount || 0))),
                afterAmount: Number(updatedBalance.amount.toFixed(2)),
                currencyName: currency,
                type: 'commission',
                typeDescription: 'Commission Rewards',
                provider: 'referral-system'
            });
            return c.json({ status: false });
        }

        if (type === 'referral') {
            await rewardService.convertReferral(userId);
            const updatedBalance = await rewardService.depositBalance(userId, rewardData.totalAvailableReferral || 0, currency);

            await rewardService.createTransaction({
                userId,
                tnxId: new Date().valueOf().toString(),
                amount: Number((rewardData.totalAvailableReferral || 0).toFixed(2)),
                beforeAmount: Number((updatedBalance.amount - (rewardData.totalAvailableReferral || 0))),
                afterAmount: Number(updatedBalance.amount.toFixed(2)),
                currencyName: currency,
                type: 'referral',
                typeDescription: 'Referral Rewards',
                provider: 'referral-system'
            });
            return c.json({ status: true });
        }

        return c.json({ status: false });
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error converting rewards:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

export const getRewardActivity = async (c: Context): Promise<TypedResponse<RewardActivityResponseType, 200, "json">> => {
    try {
        const user = c.get('user');
        const userId = user.id;
        const currency = user.currency || 'USD';

        const data = await rewardService.getRewardActivity(userId, currency);
        // Convert Date objects to ISO strings for JSON response
        const serializedData = data.map(item => ({
            ...item,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString()
        }));

        return c.json(serializedData);
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error getting reward activity:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};