import { z } from 'zod';

export const OperatorSwitchHistoryScalarFieldEnumSchema = z.enum(['id','userId','fromOperatorId','toOperatorId','switchedAt']);

export default OperatorSwitchHistoryScalarFieldEnumSchema;
