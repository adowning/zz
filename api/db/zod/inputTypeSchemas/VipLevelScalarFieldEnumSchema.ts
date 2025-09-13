import { z } from 'zod';

export const VipLevelScalarFieldEnumSchema = z.enum(['id','parentId','levelName','xp','settingId']);

export default VipLevelScalarFieldEnumSchema;
