// model
import { RootFilterQuery, UpdateQuery } from 'mongoose';
import VipTiersModel, { IVipTiers } from '@main/models/vip-tiers.model';

export interface ICreateVipTiers {
    tiersName: String;
    icon: string;
    order: number;
    weeklyCashback: boolean;
    weeklyCashbackMin: number;
    weeklyCashbackPercent: number;
    monthlyCashback: boolean;
    monthlyCashbackMin: number;
    monthlyCashbackPercent: number;
    levelUpBonus: number;
    noFeeWithdrawal: boolean;
}

const createVipTiers = async (log: ICreateVipTiers) => {
    return await VipTiersModel.create(log);
};

const patchUpdate = async (condition: RootFilterQuery<IVipTiers>, data: UpdateQuery<IVipTiers>) => {
    return await VipTiersModel.findOneAndUpdate(condition, data, { new: true });
};

const getVipTiersById = async (id: string) => {
    return await VipTiersModel.findOne({ _id: id }).lean();
};

const getVipTiersList = async () => {
    return await VipTiersModel.find().sort('order');
};

const deleteVipTiersById = async (id: string) => {
    return await VipTiersModel.deleteOne({ _id: id });
};

export default {
    createVipTiers,
    getVipTiersList,
    getVipTiersById,
    patchUpdate,
    deleteVipTiersById
};
