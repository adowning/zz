import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '#/lib/create-app'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { referralAuth } from './referral.auth'
import * as controller from './referral.controller'
import { CreateReferralCodePayload, ReferralStatusResponse } from './referral.schema'

const tags = ['Referral']

const referralStatusRoute = createRoute({
  method: 'get',
  path: '/referral-code/status',
  tags,
  middleware: [referralAuth],
  responses: {
    200: {
      description: 'Referral status retrieved successfully',
      content: {
        'application/json': {
          schema: ReferralStatusResponse,
        },
      },
    },
  },
})

const referralCodesRoute = createRoute({
  method: 'get',
  path: '/referral-code',
  tags,
  middleware: [referralAuth],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          id: z.string(),
          code: z.string(),
          name: z.string(),
          commissionRate: z.string(),
          userId: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      ),
      'Referal codes response list',
    ), // 200: {
    //     description: 'Referral codes retrieved successfully',
    // },
  },
})

const createReferralCodeRoute = createRoute({
  method: 'post',
  path: '/referral-code',
  tags,
  middleware: [referralAuth],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: CreateReferralCodePayload,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Referral code created successfully',
    },
  },
})

const deleteReferralCodeRoute = createRoute({
  method: 'delete',
  path: '/referral-code/:referralCodeId',
  tags,
  middleware: [referralAuth],
  request: {
    params: z.object({
      referralCodeId: z.string(),
    }),
  },
  responses: {
    204: {
      description: 'Referral code deleted successfully',
    },
  },
})

const router = createRouter()
  .openapi(referralStatusRoute, controller.getReferralStatus as any)
  .openapi(referralCodesRoute, controller.getReferralCodes as any)
  .openapi(createReferralCodeRoute, controller.createReferralCode)
  .openapi(deleteReferralCodeRoute, controller.deleteReferralCode)

export default router
