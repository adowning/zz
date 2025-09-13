import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
// import env from '../env'

// import * as enums from './schema'
// import * as relations from './schema/relations'
import * as schema from './schema'
// import * as vipSchema from '../modules/vipV2/converted_files/vip.schema'

import { vipInfos } from './schema'

// const combinedSchema = { ...schema, ...relations, ...enums }
const client = new SQL(process.env.DATABASE_URL!)
const db = drizzle(client, { schema: schema, logger: false })
export default db

export * from './schema'
export * from './zod/index'
// export * from './drizzle'
// export * from './zod'
export type {
  UserType,
  NewgameSpins,
  VipInfoType,
  Newusers,
  GameType,
  JackpotContributionType,
  JackpotType,
  JackpotWinType,
  AppVersion,
  VipRankType,
  Newjackpots,
  AuthSessionType,
  GameSession,
  WalletType,
  OperatorType,
  UserWithRelations,
  GameSpinType,
} from '~/types'
export const vipInfo = vipInfos
