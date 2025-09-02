import { z } from 'zod';

export const TournamentStatusSchema = z.enum(['PENDING','ACTIVE','COMPLETED','CANCELLED']);

export type TournamentStatusType = `${z.infer<typeof TournamentStatusSchema>}`

export default TournamentStatusSchema;
