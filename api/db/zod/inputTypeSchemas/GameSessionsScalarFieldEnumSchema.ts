import { z } from 'zod';

export const GameSessionsScalarFieldEnumSchema = z.enum(['id','authSessionId','userId','gameId','status','totalWagered','totalWon','totalXpGained','rtp','duration','createdAt','endAt','startingBalance']);

export default GameSessionsScalarFieldEnumSchema;
