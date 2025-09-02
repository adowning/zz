import { z } from 'zod';

export const TransactionsScalarFieldEnumSchema = z.enum(['id','processedAt','walletId','type','status','amount','netAmount','feeAmount','productId','paymentMethod','balanceBefore','balanceAfter','bonusBalanceBefore','bonusBalanceAfter','bonusAmount','wageringRequirement','wageringProgress','description','provider','providerTxId','relatedGameId','relatedRoundId','createdAt','updatedAt','operatorId','userId']);

export default TransactionsScalarFieldEnumSchema;
