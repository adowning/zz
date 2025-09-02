import { z } from 'zod';

export const PermissionSchema = z.enum(['read','write','upload','manage_users','manage_settings','launch_game']);

export type PermissionType = `${z.infer<typeof PermissionSchema>}`

export default PermissionSchema;
