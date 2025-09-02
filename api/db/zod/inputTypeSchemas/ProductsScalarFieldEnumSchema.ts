import { z } from 'zod';

export const ProductsScalarFieldEnumSchema = z.enum(['id','title','productType','bonusTotalInCredits','isActive','priceInCents','amountToReceiveInCredits','bestValue','discountInCents','bonusSpins','isPromo','totalDiscountInCents','operatorId','createdAt','updatedAt']);

export default ProductsScalarFieldEnumSchema;
