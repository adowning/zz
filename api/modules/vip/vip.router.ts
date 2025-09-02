import { createRoute, z } from '@hono/zod-openapi'


import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'

import * as controller from './vip.controller'
import { VipInfoSchema,  VipRankSchema } from '#/db'

const tags = ['VIP']

// ---  Definitions ---
const getMyVipDetails = createRoute({
  method: 'get',
  path: '/vip/me',
  middleware: [authMiddleware],
  tags,
  summary: 'Get the authenticated user VIP details',
  responses: {
    200: {
      description: 'Returns the users VIP information, rank, and progress.',
      content: {
        'application/json': {
          schema: z
            .object({
              vipInfo: VipInfoSchema,
              vipRank: VipRankSchema,
              xpForNextLevel: z.number(),
            })
        },
      },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'VIP Info not found' },
  },
})

const getVipLevels = createRoute({
  method: 'get',
  path: '/vip/levels',
  middleware: [authMiddleware],
  tags,
  summary: 'Get the configuration for all VIP levels',
  responses: {
    200: {
      description: 'Returns the VIP level configuration table.',
      content: {
        'application/json': {
          schema: z.array(VipRankSchema),
        },
      },
    },
  },
})

const getVipRanks = createRoute({
  method: 'get',
  path: '/vip/ranks',
  middleware: [authMiddleware],
  tags,
  summary: 'Get the configuration for all VIP ranks',
  responses: {
    200: {
      description: 'Returns the VIP rank configuration table.',
      content: {
        'application/json': {
          schema: z.array(VipRankSchema),
        },
      },
    },
  },
})

const router = createRouter()

// All VIP routes require authentication

router.openapi(getMyVipDetails, controller.getMyVipDetails as any)
router.openapi(getVipLevels, controller.getVipLevels as any)
router.openapi(getVipRanks, controller.getVipRanks as any)

export default router
