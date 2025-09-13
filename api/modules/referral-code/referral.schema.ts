import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { referralCodes,  } from '#/db/schema';
import { z } from 'zod';

// Zod Schemas for API validation
export const CreateReferralCodeSchema = createInsertSchema(referralCodes).omit({
    createdAt: true,
    updatedAt: true,
    id: true,
});

export const SelectReferralCodeSchema = createSelectSchema(referralCodes).extend({
    user: z.object({
        id: z.string(),
        username: z.string(),
        email: z.string().nullable(),
    }).optional(),
});

export const CreateReferralCodePayload = z.object({
    name: z.string().min(1, 'Name is required'),
    commissionRate: z.number().optional(),
});

export const UpdateReferralCodePayload = z.object({
    name: z.string().min(1, 'Name is required').optional(),
});

export const ReferralStatusResponse = z.object({
    friendCount: z.number(),
    referralCount: z.number(),
});

export const ReferralCodeListResponse = SelectReferralCodeSchema.extend({
    referralCount: z.number(),
});

export const DeleteReferralCodeParams = z.object({
    referralCodeId: z.string(),
});

export const ReferralAggregationResponse = z.array(SelectReferralCodeSchema.extend({
    referralCount: z.number(),
}));

// Type definitions
export type CreateReferralCodeType = z.infer<typeof CreateReferralCodeSchema>;
export type SelectReferralCodeType = z.infer<typeof SelectReferralCodeSchema>;
export type CreateReferralCodePayloadType = z.infer<typeof CreateReferralCodePayload>;
export type ReferralCodeListResponseType = z.infer<typeof ReferralCodeListResponse>;
export type ReferralStatusResponseType = z.infer<typeof ReferralStatusResponse>;