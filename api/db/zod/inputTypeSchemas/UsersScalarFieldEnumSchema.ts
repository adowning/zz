import { z } from 'zod';

export const UsersScalarFieldEnumSchema = z.enum(['id','username','email','passwordHash','accessToken','refreshToken','accessTokenExpiresAt','refreshTokenExpiresAt','currentGameSessionDataId','currentAuthSessionDataId','avatarUrl','role','isActive','lastLoginAt','totalXpGained','vipInfoId','createdAt','updatedAt','deletedAt','lastSeen','rtgBlockTime','phone','path','invitorId','avatar','status','activeWalletId','activeOperatorId','inviteCode']);

export default UsersScalarFieldEnumSchema;
