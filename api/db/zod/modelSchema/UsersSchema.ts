import { z } from 'zod';
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

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
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
  activeWalletId: z.string().nullable(),
  activeOperatorId: z.string().nullable(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UsersOptionalDefaultsSchema = UsersSchema.merge(z.object({
  avatarUrl: z.string().optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rtgBlockTime: z.number().optional(),
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
}))

export default UsersSchema;
