import { z } from 'zod';

export const AuthSessionsScalarFieldEnumSchema = z.enum(['id','userId','status','ipAddress','userAgent','deviceId','createdAt','expiresAt','lastSeen','otp']);

export default AuthSessionsScalarFieldEnumSchema;
