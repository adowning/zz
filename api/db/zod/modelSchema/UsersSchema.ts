import { z } from 'zod';
import { StatusSchema } from '../inputTypeSchemas/StatusSchema'
import { AuthSessionsWithRelationsSchema, AuthSessionsOptionalDefaultsWithRelationsSchema } from './AuthSessionsSchema'
import type { AuthSessionsWithRelations, AuthSessionsOptionalDefaultsWithRelations } from './AuthSessionsSchema'
import { BlackjackBetsWithRelationsSchema, BlackjackBetsOptionalDefaultsWithRelationsSchema } from './BlackjackBetsSchema'
import type { BlackjackBetsWithRelations, BlackjackBetsOptionalDefaultsWithRelations } from './BlackjackBetsSchema'
import { DepositsWithRelationsSchema, DepositsOptionalDefaultsWithRelationsSchema } from './DepositsSchema'
import type { DepositsWithRelations, DepositsOptionalDefaultsWithRelations } from './DepositsSchema'
import { GameSessionsWithRelationsSchema, GameSessionsOptionalDefaultsWithRelationsSchema } from './GameSessionsSchema'
import type { GameSessionsWithRelations, GameSessionsOptionalDefaultsWithRelations } from './GameSessionsSchema'
import { JackpotWinsWithRelationsSchema, JackpotWinsOptionalDefaultsWithRelationsSchema } from './JackpotWinsSchema'
import type { JackpotWinsWithRelations, JackpotWinsOptionalDefaultsWithRelations } from './JackpotWinsSchema'
import { WalletsWithRelationsSchema, WalletsOptionalDefaultsWithRelationsSchema } from './WalletsSchema'
import type { WalletsWithRelations, WalletsOptionalDefaultsWithRelations } from './WalletsSchema'
import { VipInfoWithRelationsSchema, VipInfoOptionalDefaultsWithRelationsSchema } from './VipInfoSchema'
import type { VipInfoWithRelations, VipInfoOptionalDefaultsWithRelations } from './VipInfoSchema'
import { WithdrawalsWithRelationsSchema, WithdrawalsOptionalDefaultsWithRelationsSchema } from './WithdrawalsSchema'
import type { WithdrawalsWithRelations, WithdrawalsOptionalDefaultsWithRelations } from './WithdrawalsSchema'
import { OperatorsWithRelationsSchema, OperatorsOptionalDefaultsWithRelationsSchema } from './OperatorsSchema'
import type { OperatorsWithRelations, OperatorsOptionalDefaultsWithRelations } from './OperatorsSchema'
import { OperatorSwitchHistoryWithRelationsSchema, OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema } from './OperatorSwitchHistorySchema'
import type { OperatorSwitchHistoryWithRelations, OperatorSwitchHistoryOptionalDefaultsWithRelations } from './OperatorSwitchHistorySchema'
import { VipCashbackWithRelationsSchema, VipCashbackOptionalDefaultsWithRelationsSchema } from './VipCashbackSchema'
import type { VipCashbackWithRelations, VipCashbackOptionalDefaultsWithRelations } from './VipCashbackSchema'
import { VipLevelUpBonusWithRelationsSchema, VipLevelUpBonusOptionalDefaultsWithRelationsSchema } from './VipLevelUpBonusSchema'
import type { VipLevelUpBonusWithRelations, VipLevelUpBonusOptionalDefaultsWithRelations } from './VipLevelUpBonusSchema'
import { VipSpinRewardWithRelationsSchema, VipSpinRewardOptionalDefaultsWithRelationsSchema } from './VipSpinRewardSchema'
import type { VipSpinRewardWithRelations, VipSpinRewardOptionalDefaultsWithRelations } from './VipSpinRewardSchema'
import { AffiliateLogWithRelationsSchema, AffiliateLogOptionalDefaultsWithRelationsSchema } from './AffiliateLogSchema'
import type { AffiliateLogWithRelations, AffiliateLogOptionalDefaultsWithRelations } from './AffiliateLogSchema'
import { ReferralCodeWithRelationsSchema, ReferralCodeOptionalDefaultsWithRelationsSchema } from './ReferralCodeSchema'
import type { ReferralCodeWithRelations, ReferralCodeOptionalDefaultsWithRelations } from './ReferralCodeSchema'
import { BalanceWithRelationsSchema, BalanceOptionalDefaultsWithRelationsSchema } from './BalanceSchema'
import type { BalanceWithRelations, BalanceOptionalDefaultsWithRelations } from './BalanceSchema'

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
  status: StatusSchema,
  /**
   * drizzle.default nanoid::nanoid
   */
  id: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  passwordHash: z.string().nullable(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  currentGameSessionDataId: z.string().nullable(),
  currentAuthSessionDataId: z.string().nullable(),
  avatarUrl: z.string(),
  role: z.string(),
  isActive: z.boolean(),
  lastLoginAt: z.coerce.date().nullable(),
  totalXpGained: z.number(),
  vipInfoId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  lastSeen: z.coerce.date().nullable(),
  rtgBlockTime: z.number(),
  phone: z.string().nullable(),
  path: z.string().array(),
  invitorId: z.string().nullable(),
  avatar: z.string(),
  activeWalletId: z.string().nullable(),
  activeOperatorId: z.string().nullable(),
  inviteCode: z.string().nullable(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UsersOptionalDefaultsSchema = UsersSchema.merge(z.object({
  status: StatusSchema.optional(),
  avatarUrl: z.string().optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rtgBlockTime: z.number().optional(),
  path: z.string().array().optional(),
  avatar: z.string().optional(),
}))

export type UsersOptionalDefaults = z.infer<typeof UsersOptionalDefaultsSchema>

/////////////////////////////////////////
// USERS RELATION SCHEMA
/////////////////////////////////////////

export type UsersRelations = {
  authSessions: AuthSessionsWithRelations[];
  blackjackBets: BlackjackBetsWithRelations[];
  deposits: DepositsWithRelations[];
  gameSessions: GameSessionsWithRelations[];
  jackpotWins: JackpotWinsWithRelations[];
  activeWallet?: WalletsWithRelations | null;
  wallets: WalletsWithRelations[];
  vipInfo?: VipInfoWithRelations | null;
  withdrawals: WithdrawalsWithRelations[];
  ops?: OperatorsWithRelations | null;
  operatorSwitchHistory: OperatorSwitchHistoryWithRelations[];
  vipCashbacks: VipCashbackWithRelations[];
  vipLevelUpBonuses: VipLevelUpBonusWithRelations[];
  vipSpinRewards: VipSpinRewardWithRelations[];
  affiliateLogsInvited: AffiliateLogWithRelations[];
  affiliateLogsReferred: AffiliateLogWithRelations[];
  referralCodes: ReferralCodeWithRelations[];
  balances: BalanceWithRelations[];
};

export type UsersWithRelations = z.infer<typeof UsersSchema> & UsersRelations

export const UsersWithRelationsSchema: z.ZodType<UsersWithRelations> = UsersSchema.merge(z.object({
  authSessions: z.lazy(() => AuthSessionsWithRelationsSchema).array(),
  blackjackBets: z.lazy(() => BlackjackBetsWithRelationsSchema).array(),
  deposits: z.lazy(() => DepositsWithRelationsSchema).array(),
  gameSessions: z.lazy(() => GameSessionsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsWithRelationsSchema).array(),
  activeWallet: z.lazy(() => WalletsWithRelationsSchema).nullable(),
  wallets: z.lazy(() => WalletsWithRelationsSchema).array(),
  vipInfo: z.lazy(() => VipInfoWithRelationsSchema).nullable(),
  withdrawals: z.lazy(() => WithdrawalsWithRelationsSchema).array(),
  ops: z.lazy(() => OperatorsWithRelationsSchema).nullable(),
  operatorSwitchHistory: z.lazy(() => OperatorSwitchHistoryWithRelationsSchema).array(),
  vipCashbacks: z.lazy(() => VipCashbackWithRelationsSchema).array(),
  vipLevelUpBonuses: z.lazy(() => VipLevelUpBonusWithRelationsSchema).array(),
  vipSpinRewards: z.lazy(() => VipSpinRewardWithRelationsSchema).array(),
  affiliateLogsInvited: z.lazy(() => AffiliateLogWithRelationsSchema).array(),
  affiliateLogsReferred: z.lazy(() => AffiliateLogWithRelationsSchema).array(),
  referralCodes: z.lazy(() => ReferralCodeWithRelationsSchema).array(),
  balances: z.lazy(() => BalanceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UsersOptionalDefaultsRelations = {
  authSessions: AuthSessionsOptionalDefaultsWithRelations[];
  blackjackBets: BlackjackBetsOptionalDefaultsWithRelations[];
  deposits: DepositsOptionalDefaultsWithRelations[];
  gameSessions: GameSessionsOptionalDefaultsWithRelations[];
  jackpotWins: JackpotWinsOptionalDefaultsWithRelations[];
  activeWallet?: WalletsOptionalDefaultsWithRelations | null;
  wallets: WalletsOptionalDefaultsWithRelations[];
  vipInfo?: VipInfoOptionalDefaultsWithRelations | null;
  withdrawals: WithdrawalsOptionalDefaultsWithRelations[];
  ops?: OperatorsOptionalDefaultsWithRelations | null;
  operatorSwitchHistory: OperatorSwitchHistoryOptionalDefaultsWithRelations[];
  vipCashbacks: VipCashbackOptionalDefaultsWithRelations[];
  vipLevelUpBonuses: VipLevelUpBonusOptionalDefaultsWithRelations[];
  vipSpinRewards: VipSpinRewardOptionalDefaultsWithRelations[];
  affiliateLogsInvited: AffiliateLogOptionalDefaultsWithRelations[];
  affiliateLogsReferred: AffiliateLogOptionalDefaultsWithRelations[];
  referralCodes: ReferralCodeOptionalDefaultsWithRelations[];
  balances: BalanceOptionalDefaultsWithRelations[];
};

export type UsersOptionalDefaultsWithRelations = z.infer<typeof UsersOptionalDefaultsSchema> & UsersOptionalDefaultsRelations

export const UsersOptionalDefaultsWithRelationsSchema: z.ZodType<UsersOptionalDefaultsWithRelations> = UsersOptionalDefaultsSchema.merge(z.object({
  authSessions: z.lazy(() => AuthSessionsOptionalDefaultsWithRelationsSchema).array(),
  blackjackBets: z.lazy(() => BlackjackBetsOptionalDefaultsWithRelationsSchema).array(),
  deposits: z.lazy(() => DepositsOptionalDefaultsWithRelationsSchema).array(),
  gameSessions: z.lazy(() => GameSessionsOptionalDefaultsWithRelationsSchema).array(),
  jackpotWins: z.lazy(() => JackpotWinsOptionalDefaultsWithRelationsSchema).array(),
  activeWallet: z.lazy(() => WalletsOptionalDefaultsWithRelationsSchema).nullable(),
  wallets: z.lazy(() => WalletsOptionalDefaultsWithRelationsSchema).array(),
  vipInfo: z.lazy(() => VipInfoOptionalDefaultsWithRelationsSchema).nullable(),
  withdrawals: z.lazy(() => WithdrawalsOptionalDefaultsWithRelationsSchema).array(),
  ops: z.lazy(() => OperatorsOptionalDefaultsWithRelationsSchema).nullable(),
  operatorSwitchHistory: z.lazy(() => OperatorSwitchHistoryOptionalDefaultsWithRelationsSchema).array(),
  vipCashbacks: z.lazy(() => VipCashbackOptionalDefaultsWithRelationsSchema).array(),
  vipLevelUpBonuses: z.lazy(() => VipLevelUpBonusOptionalDefaultsWithRelationsSchema).array(),
  vipSpinRewards: z.lazy(() => VipSpinRewardOptionalDefaultsWithRelationsSchema).array(),
  affiliateLogsInvited: z.lazy(() => AffiliateLogOptionalDefaultsWithRelationsSchema).array(),
  affiliateLogsReferred: z.lazy(() => AffiliateLogOptionalDefaultsWithRelationsSchema).array(),
  referralCodes: z.lazy(() => ReferralCodeOptionalDefaultsWithRelationsSchema).array(),
  balances: z.lazy(() => BalanceOptionalDefaultsWithRelationsSchema).array(),
}))

export default UsersSchema;
