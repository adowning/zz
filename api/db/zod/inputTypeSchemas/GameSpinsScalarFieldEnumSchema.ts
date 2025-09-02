import { z } from 'zod';

export const GameSpinsScalarFieldEnumSchema = z.enum(['id','playerName','gameName','gameId','spinData','grossWinAmount','wagerAmount','spinNumber','playerAvatar','currencyId','sessionId','userId','createdAt','updatedAt','occurredAt','sessionDataId','type','operatorId','status','playerBalanceAtStart','playerBalance','gamePlayerWinTotalTodayid','playerBetTotalToday','sessionTotalWinAmount','sessionTotalBetAmount','gameSessionRtp','playerRtpToday','winAmount','betAmount']);

export default GameSpinsScalarFieldEnumSchema;
