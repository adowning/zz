import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
// import { sessionMiddleware } from '#/middlewares/session.middleware'
// import { RTGSettingsResponseDtoSchema, RTGSpinResponseDtoSchema } from "../gameplay.schema";
import { pragmaticController } from './pragmatic.controller'

// import { rtgSettingsResponseDtoSchema, rtgSpinResultSchema } from './rtg.schema'

const tags = ['Pragmatic']

const ErrorSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
})

const actionRoute = createRoute({
  method: 'post',
  path: '/gs2c/ge/v3/gameService',
  tags,
  middleware: [authMiddleware],
  summary: 'Get pragmatic settings for a game',
  request: {
    // params: z.object({
    //   gameSessionId: z.string(),
    //   gameName: z.string(),
    // }),
    body: {
      content: {
        'application/json': {
          // schema: rtgSettingsRequestDtoSchema,
          // schema: z.any(),
          schema: {
            action: z.string(),
            symbol: z.string(),
            cver: z.number(),
            index: z.number(),
            counter: z.number(),
            repeat: z.number(),
            mgckey: z.string(),
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Pragmatic game settings',
      content: {
        'application/json': {
          schema: z.any(),
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

// const spinRoute = createRoute({
//   method: 'post',
//   path: '/pragmatic/game/spin',
//   tags,
//   middleware: [authMiddleware, sessionMiddleware],
//   summary: 'Perform a spin in a pragmatic game',
//   request: {
//     body: {
//       content: {
//         'application/json': {
//           schema: z.any(), // rtgSpinRequestDtoSchema,
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: 'Pragmatic spin result',
//       content: {
//         'application/json': {
//           schema: rtgSpinResultSchema,
//         },
//       },
//     },
//     500: {
//       description: 'Internal Server Error',
//       content: {
//         'application/json': {
//           schema: ErrorSchema,
//         },
//       },
//     },
//   },
// })

const router = createRouter()

// router.use('/pragmatic/*', authMiddleware)

router.openapi(actionRoute, pragmaticController.action as any)

// router.use('/pragmatic/game/spin', sessionMiddleware)
// router.openapi(spinRoute, pragmaticController.spin as any)

export default router
