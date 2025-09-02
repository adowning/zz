import { z } from 'zod';

export const AppVersionsScalarFieldEnumSchema = z.enum(['id','appId','version','platform','updateType','downloadUrl','changelog','mandatory','releaseDate','fileSize','checksum']);

export default AppVersionsScalarFieldEnumSchema;
