import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { affiliateApi } from '../services/affiliate.service';
import type {
  ReferralCode,
  RewardData,
  RewardStatus,
  ReferralLogData,
  ReferralStatus
} from '../types/affiliate';

import { postApiReferralCode, getApiReferralCode,  } from '@/gen/api/referral'
export const useAffiliateStore = defineStore('affiliate', () => {
  // State
  const referralCodes = ref<ReferralCode[]>([]);
  const rewardData = ref<Partial<RewardData>>({});
  const rewardStatus = ref<RewardStatus | null>(null);
  const referralStatus = ref<ReferralStatus | null>(null);
  const commissionLog = ref<ReferralLogData[]>([]);
  const referralLog = ref<ReferralLogData[]>([]);
  const isLoading = ref(false);
  const totalCommissionLogCount = ref(0);
  const totalReferralLogCount = ref(0);

  // Getters
  const shareLink = computed(() => {
    const code = rewardData.value.code || '';
    return code ? `https://app.cashflowcasino.com/?r=p-${code}` : '';
  });

  const totalReward = computed(() => {
    const commission = rewardData.value.totalCommissionAmount || 0;
    const referral = rewardData.value.totalReferralAmount || 0;
    return commission + referral;
  });

  // Actions
  const loadRewardDashboard = async () => {
    try {
      isLoading.value = true;
      const result = await getApiReferralCode() //affiliateApi.getRewardDashboard();
      rewardData.value = { ...rewardData.value, ...result };
    } catch (error) {
      console.error('Failed to load reward dashboard:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const loadReferralCodes = async () => {
    try {
      isLoading.value = true;
      const result = await affiliateApi.getReferralCode();
      referralCodes.value = result;
    } catch (error) {
      console.error('Failed to load referral codes:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const loadRewardStatus = async () => {
    try {
      const result = await affiliateApi.getRewardStatus();
      rewardStatus.value = result;
    } catch (error) {
      console.error('Failed to load reward status:', error);
      throw error;
    }
  };

  const loadReferralStatus = async () => {
    try {
      const result = await affiliateApi.getReferralStatus();
      referralStatus.value = result;
    } catch (error) {
      console.error('Failed to load referral status:', error);
      throw error;
    }
  };

  const loadCommissionLog = async (page: number = 1, limit: number = 10) => {
    try {
      isLoading.value = true;
      const result = await affiliateApi.getRewardLog({
        type: 'commission',
        currentPage: page,
        rowsPerPage: limit
      });
      commissionLog.value = result.data;
      totalCommissionLogCount.value = result.total;
    } catch (error) {
      console.error('Failed to load commission log:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const loadReferralLog = async (page: number = 1, limit: number = 10) => {
    try {
      isLoading.value = true;
      const result = await affiliateApi.getRewardLog({
        type: 'reward',
        currentPage: page,
        rowsPerPage: limit
      });
      referralLog.value = result.data;
      totalReferralLogCount.value = result.total;
    } catch (error) {
      console.error('Failed to load referral log:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const createReferralCode = async (name: string) => {
    console.log('name')
    try {
      const result =  await postApiReferralCode({ name,  }) //await affiliateApi.generateReferralCode({ codeName: name });
      console.log('Created referral code:', result);
      await loadReferralCodes(); // Refresh the list
      return result;
    } catch (error) {
      console.error('Failed to create referral code:', error);
      throw error;
    }
  };

  const convertReward = async (walletType: 1 | 2) => {
    try {
      const result = await affiliateApi.convert({ walletType });
      await loadRewardStatus(); // Refresh status
      return result;
    } catch (error) {
      console.error('Failed to convert reward:', error);
      throw error;
    }
  };

  const loadData = async () => {
    await Promise.all([
      loadRewardDashboard(),
      loadReferralCodes(),
      loadRewardStatus(),
      loadReferralStatus()
    ]);
  };

  return {
    // State
    referralCodes,
    rewardData,
    rewardStatus,
    referralStatus,
    commissionLog,
    referralLog,
    isLoading,
    totalCommissionLogCount,
    totalReferralLogCount,

    // Getters
    shareLink,
    totalReward,

    // Actions
    loadData,
    loadRewardDashboard,
    loadReferralCodes,
    loadRewardStatus,
    loadReferralStatus,
    loadCommissionLog,
    loadReferralLog,
    createReferralCode,
    convertReward,
  };
});