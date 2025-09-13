
import { Context } from 'hono';
import * as service from './vip.service';

// VIP Tiers Controller
export const createVipTiers = async (c: Context) => {
    const body = await c.req.json();
    const data = await service.createVipTiers(body);
    return c.json(data[0], 201);
};

export const patchUpdateVipTiers = async (c: Context) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const data = await service.patchUpdateVipTiers(id, body);
    return c.json(data);
};

export const getVipTiersById = async (c: Context) => {
    const id = c.req.param('id');
    const data = await service.getVipTiersById(id);
    return c.json(data);
};

export const getVipTiersList = async (c: Context) => {
    const data = await service.getVipTiersList();
    return c.json(data, 200);
};

export const deleteVipTiersById = async (c: Context) => {
    const id = c.req.param('id');
    await service.deleteVipTiersById(id);
    return c.json({ message: 'VIP Tier deleted' });
};


// VIP Level Controller
export const createVipLevel = async (c: Context) => {
    const body = await c.req.json();
    const data = await service.createVipLevel(body);
    return c.json(data[0], 201);
};

export const patchUpdateVipLevel = async (c: Context) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const data = await service.patchUpdateVipLevel(id, body);
    return c.json(data);
};

export const getVipLevelById = async (c: Context) => {
    const id = c.req.param('id');
    const data = await service.getVipLevelById(id);
    return c.json(data);
};

export const getVipLevels = async (c: Context) => {
    const data = await service.getVipLevels();
    return c.json(data, 200);
};

export const getVipLevelList = async (c: Context) => {
    const parentId = c.req.param('parentId');
    const data = await service.getVipLevelList(parentId);
    return c.json(data);
};

export const deleteVipLevelById = async (c: Context) => {
    const id = c.req.param('id');
    await service.deleteVipLevelById(id);
    return c.json({ message: 'VIP Level deleted' });
};


// VIP Cashback Controller
export const createVipCashback = async (c: Context) => {
    const body = await c.req.json();
    const data = await service.createVipCashback(body);
    return c.json(data[0], 201);
};

export const getVipCashbackList = async (c: Context) => {
    const userId = c.req.param('userId');
    const data = await service.getVipCashbackList(userId);
    return c.json(data, 200);
};

export const triggerWeeklyCashback = async (c: Context) => {
    await service.weeklyCashback();
    return c.json({ message: 'Weekly cashback process triggered.' }, 200);
};

export const triggerMonthlyCashback = async (c: Context) => {
    await service.monthlyCashback();
    return c.json({ message: 'Monthly cashback process triggered.' }, 200);
};


// VIP Level Up Bonus Controller
export const getAvailableBonus = async (c: Context) => {
    const userId = c.req.param('userId');
    const data = await service.getAvailableBonus(userId);
    return c.json(data, 200);
};

export const calculateLevelUp = async (c: Context) => {
    const { userId, turnover } = await c.req.json();
    await service.calculateLevelUp(userId, turnover);
    return c.json({ message: 'Level up calculation complete.' }, 200);
};


// VIP Spin Prize Controller
export const createVipSpinPrize = async (c: Context) => {
    const body = await c.req.json();
    const data = await service.createVipSpinPrize(body);
    return c.json(data[0], 201);
};

export const getVipSpinPrizeList = async (c: Context) => {
    const data = await service.getVipSpinPrizeList();
    return c.json(data);
};

export const getVipSpinPrizes = async (c: Context) => {
    const data = await service.getVipSpinPrizes();
    return c.json(data, 200);
};


// VIP Spin Reward Controller
export const createVipSpinReward = async (c: Context) => {
    const body = await c.req.json();
    const data = await service.createVipSpinReward(body);
    return c.json(data[0], 201);
};

export const getTotalBonus = async (c: Context) => {
    const total = await service.getTotalBonus();
    return c.json({ total: Number(total) }, 200);
};

export const getWinners = async (c: Context) => {
    const data = await service.getWinners();
    return c.json(data, 200);
};

export const getLastSpin = async (c: Context) => {
    const userId = c.req.param('userId');
    const data = await service.getLastSpin(userId);
    return c.json(data, 200);
};
