import { api } from '../request';

// Affiliate API service
export const affiliateApi = {
  // Get reward dashboard data
  async getRewardDashboard() {
    return api('/reward/dashboard');
  },

  // Get referral codes
  async getReferralCode() {
    return api('/referral-code');
  },

  // Get referral status (friends count, referral limit, etc.)
  async getReferralStatus() {
    return api('/referral-code/status');
  },

  // Create new referral code
  async generateReferralCode(data: { codeName: string }) {
    return api('/referral-code', {
      method: 'POST',
      data,
    });
  },

  // Get reward status (available commissions, referrals, etc.)
  async getRewardStatus() {
    return api('/reward/status');
  },

  // Get reward logs with pagination
  async getRewardLog({ type, currentPage = 1, rowsPerPage = 10 }: {
    type?: string;
    currentPage?: number;
    rowsPerPage?: number;
  }) {
    return api('/reward/get-log', {
      method: 'POST',
      data: {
        currentPage,
        rowsPerPage,
        type,
      },
    });
  },

  // Get reward activity
  async getRewardActivity() {
    return api('/reward/activity');
  },

  // Convert reward (withdraw to balance)
  async convert(data: { walletType: number }) {
    return api('/reward/convert', {
      method: 'POST',
      data: {
        type: data.walletType === 1 ? 'commission' : 'referral',
      },
    });
  },
};