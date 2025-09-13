// Referral Code Type
export interface ReferralCode {
  id: string;
  userId: string;
  name: string;
  code: string;
  commissionRate: number;
  referralCount: number;
  createdAt: string;
  updatedAt: string;
  // Optional joined user data
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

// Reward Data Type
export interface RewardData {
  totalCommissionAmount: number;
  totalReferralAmount: number;
  totalCommissionReward: number;
  totalAvailableReferral: number;
  friends: number;
  code: string;
}

// Reward Status Type
export interface RewardStatus {
  commissionReward: number;
  commissionAvailable: number;
  referralReward: number;
  referralAvailable: number;
}

// Referral Status Type
export interface ReferralStatus {
  friendCount: number;
  referralCount: number;
}

// Referral Log Data Type (for commission/reflection logs)
export interface ReferralLogData {
  id: string;
  invitorId: string;
  childId: string;
  currency: string;
  referralCode: string;
  betAmount: number;
  commissionAmount: number;
  commissionWager: number;
  totalReferralAmount: number;
  referralAmount: number;
  referralWager: number;
  lastVipLevelAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    username?: string;
    createdAt?: string;
    id?: string;
  };
  balance?: {
    turnover: number;
  };
  wagerAmount?: number | string;
  referralData?: {
    code?: string;
    commissionRate?: number;
  };
}

// Pagination Response Type
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  rowsPerPage: number;
}

// Create Referral Code Payload
export interface CreateReferralCodePayload {
  codeName: string;
}

// Convert Reward Payload
export interface ConvertRewardPayload {
  walletType: 1 | 2; // 1 for commission, 2 for referral
}