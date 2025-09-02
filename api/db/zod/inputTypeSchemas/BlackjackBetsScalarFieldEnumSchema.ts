import { z } from 'zod';

export const BlackjackBetsScalarFieldEnumSchema = z.enum(['id','userId','gameId','seat','amount','cards','cardsLeft','cardsRight','actions','createdAt']);

export default BlackjackBetsScalarFieldEnumSchema;
