import { z } from 'zod';

export const UserRoleSchema = z.enum(['USER','ADMIN','MODERATOR','SUPPORT','BOT','SYSTEM']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export default UserRoleSchema;
