import { z } from 'zod';

export const GameSessionsScalarFieldEnumSchema = z.enum(['id','authSessionId','userId','gameId','gameName','status','totalWagered','totalWon','totalXpGained','rtp','phpGameData','duration','createdAt','endAt','startingBalance']);

export default GameSessionsScalarFieldEnumSchema;
