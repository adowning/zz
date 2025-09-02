import { env as dotenv } from '@dotenv-run/core'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

dotenv({
    root: '../..',
    verbose: true, //config.debug,
    files: ['.env'],
})

/**
 * Environment variables validated with zod
 */
export const env = createEnv({
    server: {
        PGLITE: z
            .string()
            .optional()
            .transform((v) => v === 'true'),
        DATABASE_URL: z.string(),
        NODE_ENV: z.union([
            z.literal('development'),
            z.literal('production'),
            z.literal('staging'),
            z.literal('tunnel'),
            z.literal('test'),
        ]),
        PORT: z.string().optional(),
        RCLONE_R2_REMOTE: z.string().optional(),
        R2_BUCKET_NAME: z.string().optional(),
        R2_PUBLIC_URL: z.string().optional(),
        ACCESS_TOKEN_SECRET: z.string(),
        LOG_LEVEL: z.string().optional(),

    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
})

export default env