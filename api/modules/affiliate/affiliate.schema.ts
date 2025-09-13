import { affiliateLogs, affiliates } from '#/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// const affiliates = pgTable('affiliates', {
//   id: text('id')
//     .$defaultFn(() => nanoid())
//     .primaryKey(),
//   username: varchar('username', { length: 255 }).notNull().unique(),
//   firstName: text('first_name').notNull(),
//   lastName: text('last_name').notNull(),
//   status: text('status').notNull(), // 'active', 'inactive', 'blocked'
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   role: text('role').notNull(), // 'admin', 'user'
//   referralCode: text('referral_code').notNull().unique(),
//   parentId: text('parent_id').references((): any => affiliates.id),
//   path: text('path').notNull().default(''),
//   password: text('password').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// })

// export { affiliates }

// export const affiliateLogs = pgTable('affiliate_logs', {
//   id: text('id')
//     .$defaultFn(() => nanoid())
//     .primaryKey(),
//   invitorId: text('invitor_id')
//     .references(() => users.id)
//     .notNull(),
//   childId: text('child_id')
//     .references(() => users.id)
//     .notNull(),
//   currency: text('currency').notNull(),
//   referralCode: text('referral_code').notNull(),
//   betAmount: real('bet_amount').default(0),
//   commissionAmount: real('commission_amount').default(0),
//   commissionWager: real('commission_wager').default(0),
//   totalReferralAmount: real('total_referral_amount').default(0),
//   referralAmount: real('referral_amount').default(0),
//   referralWager: real('referral_wager').default(0),
//   lastVipLevelAmount: real('last_vip_level_amount').default(0),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// })

// Zod Schemas for API validation
export const CreateAffiliateSchema = createInsertSchema(affiliates)
export const SelectAffiliateSchema = createSelectSchema(affiliates)

export const UpdateAffiliateSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6),
})

export const CreateAffiliateLogSchema = createInsertSchema(affiliateLogs)
export const SelectAffiliateLogSchema = createSelectSchema(affiliateLogs)

export const DashboardAnalysisPayload = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
})

export const DashboardChildrenPayload = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
})

export const ChildrenAffiliatePayload = z.object({
  username: z.string().optional(),
  currentPage: z.number().min(1),
  rowsPerPage: z.number().min(1),
})

export const AffiliateUsersPayload = z.object({
  username: z.string().optional(),
  currentPage: z.number().min(1),
  rowsPerPage: z.number().min(1),
})

export const CommissionUpdatePayload = z.record(z.number())
