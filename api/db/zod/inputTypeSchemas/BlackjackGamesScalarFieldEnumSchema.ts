import { z } from 'zod';

export const BlackjackGamesScalarFieldEnumSchema = z.enum(['id','table','type','state','deck','dealerCards','fair','createdAt','updatedAt']);

export default BlackjackGamesScalarFieldEnumSchema;
