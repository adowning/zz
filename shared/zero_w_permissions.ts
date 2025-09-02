import { ANYONE_CAN_DO_ANYTHING, definePermissions, Schema } from '@rocicorp/zero';
import { schema as _schema } from './zero';

export const permissions = definePermissions<unknown, Schema>(_schema, () => ({

//   vipLevel: ANYONE_CAN_DO_ANYTHING,
  vipRanks: ANYONE_CAN_DO_ANYTHING,
//   appVersions: ANYONE_CAN_DO_ANYTHING,
  authSessions: ANYONE_CAN_DO_ANYTHING,
//   blackjackBets: ANYONE_CAN_DO_ANYTHING,
//   blackjackGames: ANYONE_CAN_DO_ANYTHING,
//   blackjackMessage: ANYONE_CAN_DO_ANYTHING,
//   deposits: ANYONE_CAN_DO_ANYTHING,
  gameSessions: ANYONE_CAN_DO_ANYTHING,
  gameSpins: ANYONE_CAN_DO_ANYTHING,
  games: ANYONE_CAN_DO_ANYTHING,
  jackpotContributions: ANYONE_CAN_DO_ANYTHING,
  jackpotWins: ANYONE_CAN_DO_ANYTHING,
  jackpots: ANYONE_CAN_DO_ANYTHING,
  operators: ANYONE_CAN_DO_ANYTHING,
  products: ANYONE_CAN_DO_ANYTHING,
  transactions: ANYONE_CAN_DO_ANYTHING,
  users: ANYONE_CAN_DO_ANYTHING,
  vipInfo: ANYONE_CAN_DO_ANYTHING,
  vipLevelUpHistory: ANYONE_CAN_DO_ANYTHING,
  wallets: ANYONE_CAN_DO_ANYTHING,
//   withdrawals: ANYONE_CAN_DO_ANYTHING,
}));

export const schema = _schema