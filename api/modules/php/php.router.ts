import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
// import { sessionMiddleware } from '#/middlewares/session.middleware'
// import { RTGSettingsResponseDtoSchema, RTGSpinResponseDtoSchema } from "../gameplay.schema";
import { phpController } from './php.controller'

// import { rtgSettingsResponseDtoSchema, rtgSpinResultSchema } from './rtg.schema'

const tags = ['Php']

const ErrorSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
})

const actionRoute = createRoute({
  method: 'post',
  path: '/game/{gameName}/server',
  tags,
  middleware: [authMiddleware],
  summary: 'Get php settings for a game',
  request: {
    params: z.object({
      gameName: z.string(),
    }),
    // body: {
    //   content: {
    //     'application/json': {
    //       // schema: rtgSettingsRequestDtoSchema,
    //       // schema: z.any(),
    //       schema: {
    //         action: z.string(),
    //         symbol: z.string(),
    //         cver: z.number(),
    //         index: z.number(),
    //         counter: z.number(),
    //         repeat: z.number(),
    //         mgckey: z.string(),
    //       },
    //     },
    //   },
    // },
  },
  responses: {
    200: {
      description: 'Php game settings',
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
//   path: '/php/game/spin',
//   tags,
//   middleware: [authMiddleware, sessionMiddleware],
//   summary: 'Perform a spin in a php game',
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
//       description: 'Php spin result',
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

// router.use('/php/*', authMiddleware)

router.openapi(actionRoute, phpController.action as any)

// router.use('/php/game/spin', sessionMiddleware)
// router.openapi(spinRoute, phpController.spin as any)

export default router
