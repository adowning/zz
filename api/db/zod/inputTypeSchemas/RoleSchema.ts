import { z } from 'zod';

export const RoleSchema = z.enum(['USER','ADMIN','VIP','MODERATOR','SYSTEM','OWNER','MEMBER','OPERATOR','SUPPORT_AGENT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
