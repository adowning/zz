import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as referralService from './referral.service';
import { generateReferral } from './utils';
import settingService from '../common/setting.service';
import type { CreateReferralCodePayloadType, ReferralStatusResponseType } from './referral.schema';

export const getReferralStatus = async (c: Context) => {
    const user = c.get('user');
    const userId = user.id;

    // Get friends count using invitorId
    const friends = await referralService.getUsersByInvitorId(userId);

    // Get setting for referral count limit
    const setting = await settingService.getSetting();
    if (!setting) {
        throw new HTTPException(500, { message: 'Settings not found' });
    }

    const response: ReferralStatusResponseType = {
        friendCount: friends.length,
        referralCount: setting.referralCodeCount || 0,
    };

    return c.json(response);
};

export const getReferralCodes = async (c: Context) => {
    const user = c.get('user');
    const userId = user.id;

    const referralCodes = await referralService.getReferralCodes(userId);
    return c.json(referralCodes);
};

export const createReferralCode = async (c: Context) => {
    try {
        const data: CreateReferralCodePayloadType = await c.req.json();
        const user = c.get('user');
        const userId = user.id;
        console.log('Creating referral code for user:', userId, 'with data:', data);
        // Get current referral codes count and settings
        const referralCodesCount = await referralService.getReferralCodesCount(userId);
        const setting = await settingService.getSetting();
        if (!setting) {
            // throw new HTTPException(500, { message: 'Settings not found' });
           return c.json({ error: 'Settings not found', status: 500 });
        }

        if (referralCodesCount >= (setting.referralCodeCount || 0)) {
            // throw new HTTPException(400, { message: 'You can not create any more referral codes' });
           return c.json({ error: 'You can not create any more referral codes', status: 400 });
      
        }

        // Generate unique referral code
        let code = generateReferral(9, false);
        let otpCheck = await referralService.getReferralCodeByCode(code);
        console.log('Referral code created:', code);

        let attempts = 0;
        const maxAttempts = 10;
        while (otpCheck && attempts < maxAttempts) {
            code = generateReferral(9, false);
            otpCheck = await referralService.getReferralCodeByCode(code);
            attempts++;
        }

        if (attempts >= maxAttempts) {
            throw new HTTPException(500, { message: 'Unable to generate unique referral code' });
        }

        const referralCode = await referralService.createReferralCode({
            ...data,
            userId,
            code,
            commissionRate: setting.referralCommissionRate || 0,
        });
        console.log('Referral code created:', referralCode);
        return c.json(referralCode);
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error creating referral code:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

export const deleteReferralCode = async (c: Context) => {
    try {
        const { referralCodeId } = c.req.param();
        const user = c.get('user');

        const referralCode = await referralService.getReferralCodeById(referralCodeId);
        if (!referralCode) {
            throw new HTTPException(404, { message: 'Referral code not found' });
        }

        // Check if user owns this referral code
        if (referralCode.userId !== user.id) {
            throw new HTTPException(403, { message: 'Forbidden' });
        }

        const result = await referralService.deleteReferralCodeById(referralCodeId);
        if (!result) {
            throw new HTTPException(500, { message: 'Failed to delete referral code' });
        }

        return c.body(null, 204);
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error('Error deleting referral code:', error);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};