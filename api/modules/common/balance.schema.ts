import { balances, currencies } from '#/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// Zod Schemas for API validation
export const CreateCurrencySchema = createInsertSchema(currencies).omit({
  id: true,
})

export const SelectCurrencySchema = createSelectSchema(currencies)

export const CreateBalanceSchema = createInsertSchema(balances).omit({
  createdAt: true,
  updatedAt: true,
  id: true,
})

export const SelectBalanceSchema = createSelectSchema(balances)

export const SelectBalanceWithCurrencySchema = SelectBalanceSchema.extend({
  currency: SelectCurrencySchema,
})

// Payload schemas
export const CreateCurrencyPayload = z.object({
  name: z.string().min(1, 'Currency name is required'),
  code: z.string().min(1, 'Currency code is required').max(3),
  symbol: z.string().optional(),
  icon: z.string().optional(),
  exchangeRate: z.number().positive('Exchange rate must be positive').optional(),
})

export const UpdateCurrencyPayload = z.object({
  name: z.string().min(1, 'Currency name is required').optional(),
  code: z.string().min(1, 'Currency code is required').max(3).optional(),
  symbol: z.string().optional(),
  icon: z.string().optional(),
  status: z.boolean().optional(),
  exchangeRate: z.number().positive('Exchange rate must be positive').optional(),
})

export const BalanceOperationsPayload = z.object({
  userId: z.string().min(1, 'User ID is required'),
  currencyId: z.string().min(1, 'Currency ID is required'),
  amount: z.number().min(0, 'Amount must be non-negative'),
})

export const UpdateBalancePayload = z.object({
  pending: z.number().optional(),
  bonus: z.number().optional(),
  withdrawable: z.number().optional(),
  turnover: z.number().optional(),
})

// Response schemas
export const BalanceResponse = z.object({
  id: z.string(),
  amount: z.number(),
  bonus: z.number(),
  turnover: z.number(),
  withdrawable: z.number(),
  pending: z.number(),
  currency: z
    .object({
      name: z.string(),
      icon: z.string().optional(),
      code: z.string(),
    })
    .optional(),
})

// Type definitions
export type CreateCurrencyType = z.infer<typeof CreateCurrencySchema>
export type SelectCurrencyType = z.infer<typeof SelectCurrencySchema>
export type CreateBalanceType = z.infer<typeof CreateBalanceSchema>
export type SelectBalanceType = z.infer<typeof SelectBalanceSchema>
export type SelectBalanceWithCurrencyType = z.infer<typeof SelectBalanceWithCurrencySchema>
export type CreateCurrencyPayloadType = z.infer<typeof CreateCurrencyPayload>
export type UpdateCurrencyPayloadType = z.infer<typeof UpdateCurrencyPayload>
export type BalanceOperationsPayloadType = z.infer<typeof BalanceOperationsPayload>
export type UpdateBalancePayloadType = z.infer<typeof UpdateBalancePayload>
export type BalanceResponseType = z.infer<typeof BalanceResponse>
