import z from "zod"

export const providerSettingsResponseDataSchema = z.object({
    user: z.object({
        balance: z.object({
            cash: z.string(),
            freeBets: z.string().optional(),
            bonus: z.string().optional(),
        }),
        canGamble: z.boolean(),
        userId: z.union([z.number(), z.string()]),
        sessionId: z.string(),
        sessionNetPosition: z.string().optional(),
        token: z.string(),
        country: z.string().optional(),
        currency: z.object({
            code: z.string(),
            symbol: z.string(),
        }).optional(),
        stakes: z.any().optional(),
        limits: z.any().optional(),
        serverTime: z.string().datetime({ message: 'Invalid ISO date string' }),
    }),
    games: z.object({
        version: z.string().optional(),
        gamesType: z.string().optional(),
    }).optional(),
    launcher: z.object({
        version: z.string().optional(),
    }).optional(),
    jackpots: z.any().optional(),
})
export const rtgSettingsResponseDtoSchema = z.object({
    success: z.boolean(),
    result: providerSettingsResponseDataSchema.optional(),
    error: z.object({
        code: z.string(),
        message: z.string(),
        details: z.any().optional(),
    }).optional(),
}).refine(data => data.success ? data.result !== undefined : data.error !== undefined, {
    message: 'If success is true, result must be provided. If false, error must be provided.',
})
export const providerSpinResponseDataSchema = z.object({
    transactions: z.object({
        roundId: z.union([z.number(), z.string()]),
    }),
    user: z.object({
        balance: z.object({
            cash: z.object({
                atStart: z.string().optional(),
                afterBet: z.string().optional(),
                atEnd: z.string(),
            }),
            freeBets: z.object({
                atStart: z.string().optional(),
                afterBet: z.string().optional(),
                atEnd: z.string(),
            }).optional(),
            bonus: z.object({
                atStart: z.string().optional(),
                afterBet: z.string().optional(),
                atEnd: z.string(),
            }).optional(),
        }),
        userId: z.union([z.number(), z.string()]),
        sessionId: z.string(),
        sessionNetPosition: z.string().optional(),
        token: z.string(),
        serverTime: z.string().datetime({ message: 'Invalid ISO date string' }),
        canGamble: z.boolean().optional(),
    }),
    game: z.object({
        win: z.object({
            instantWin: z.string().optional(),
            lines: z.string().optional(),
            total: z.string(),
        }),
        stake: z.string(),
        multiplier: z.number().optional(),
        winLines: z.array(z.any()).optional(),
        reelsBuffer: z.array(z.array(z.array(z.number()))).optional(),
        xpBreakdown: z.object({
            baseXp: z.number(),
            bonusXp: z.number(),
            totalXp: z.number(),
        }).optional(),
    }),
    jackpots: z.any().nullable().optional(),
    bonusChance: z.any().nullable().optional(),
})
export const rtgSpinResultSchema = providerSpinResponseDataSchema
export const rtgSpinResponseDtoSchema = z.object({
    success: z.boolean(),
    result: rtgSpinResultSchema.optional(),
    error: z.object({
        code: z.string(),
        message: z.string(),
        details: z.any().optional(),
    }).optional(),
}).refine(data => data.success ? data.result !== undefined : data.error !== undefined, {
    message: 'If success is true, result must be provided. If false, error must be provided.',
})
export const launchgamesResponseDtoSchema = z.object({
    launch_url: z.string().url(),
    games_session_id: z.string().optional(),
    launch_strategy: z.enum(['IFRAME', 'REDIRECT', 'POPUP']).optional(),
    provider_parameters: z.union([z.record(z.any(), z.any()), z.array(z.string()), z.string()]).optional(),
})
const customObjectSchema = z.object({
    siteId: z.string().optional(),
    extras: z.string().optional(),
}).optional()
const userDataObjectSchema = z.object({
    userId: z.union([z.string(), z.number()]).optional(),
    hash: z.string().optional(),
    affiliate: z.union([z.string(), z.number()]).optional(),
    lang: z.union([z.string(), z.number()]).optional(),
    channel: z.union([z.string(), z.number()]).optional(),
    userType: z.string().optional(),
    fingerprint: z.union([z.string(), z.number()]).optional(),
})
export const rtgSettingsRequestDtoSchema = z.object({
    gamesId: z.string(),
    token: z.string().optional().nullable(),
    userId: z.string(),
    currency: z.string(),
    language: z.string(),
    mode: z.enum(['real', 'demo', 'test']),
    custom: customObjectSchema,
    userData: userDataObjectSchema,
})
export const rtgSpinRequestDtoSchema = z.object({
    token: z.string().optional(),
    userId: z.string().optional(),
    gameId: z.string().optional(),
    stake: z.union([z.number(), z.string()]).optional(),
    currency: z.string().optional(),
    sessionId: z.string().optional(),
    playMode: z.enum(['real', 'demo', 'test']).optional(),
    actions: z.array(z.any()).optional(),
    custom: customObjectSchema,
    bonusId: z.any().optional(),
    extras: z.any().optional(),
    siteId: z.string().optional(),
    userType: z.string().optional(),
    lang: z.union([z.string(), z.number()]).optional(),
    fingerprint: z.union([z.string(), z.number()]).optional(),
    channel: z.union([z.string(), z.number()]).optional(),
    affiliate: z.union([z.string(), z.number()]).optional(),
    userData: userDataObjectSchema,
    roundId: z.union([z.string(), z.number()]).optional(),
    transactionId: z.union([z.string(), z.number()]).optional(),
})
