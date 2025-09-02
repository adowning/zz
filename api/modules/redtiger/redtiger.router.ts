import { createRoute, z } from '@hono/zod-openapi'

import {
  rtgSettingsResponseDtoSchema,
  rtgSpinResultSchema,
} from './rtg.schema'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
import { sessionMiddleware } from '#/middlewares/session.middleware'

// import { RTGSettingsResponseDtoSchema, RTGSpinResponseDtoSchema } from "../gameplay.schema";
import { redtigerController } from './redtiger.controller'

const tags = ['RedTiger']

const ErrorSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
})

const settingsRoute = createRoute({
  method: 'post',
  path: '/redtiger/game/settings',
  tags,
  middleware: [authMiddleware],
  summary: 'Get redtiger settings for a game',
  request: {
    // params: z.object({
    //   gameSessionId: z.string(),
    //   gameName: z.string(),
    // }),
    body: {
      content: {
        'application/json': {
          // schema: rtgSettingsRequestDtoSchema,
          schema: z.any(),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Redtiger game settings',
      content: {
        'application/json': {
          schema: rtgSettingsResponseDtoSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
})

const spinRoute = createRoute({
  method: 'post',
  path: '/redtiger/game/spin',
  tags,
  middleware: [authMiddleware, sessionMiddleware],
  summary: 'Perform a spin in a redtiger game',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.any(), // rtgSpinRequestDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Redtiger spin result',
      content: {
        'application/json': {
          schema: rtgSpinResultSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
})

const router = createRouter()

// router.use('/redtiger/*', authMiddleware)

router.openapi(settingsRoute, redtigerController.settings as any)

// router.use('/redtiger/game/spin', sessionMiddleware)
router.openapi(spinRoute, redtigerController.spin as any)

export default router
