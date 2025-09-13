import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '#/lib/create-app'
// import { jsonContent, jsonContentRequired } from '#/lib/zod-helpers';
import * as HttpStatusCodes from 'http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { affiliateAuth } from './affiliate.auth'
import * as controller from './affiliate.controller'
import {
  AffiliateUsersPayload,
  ChildrenAffiliatePayload,
  CommissionUpdatePayload,
  DashboardChildrenPayload,
  SelectAffiliateSchema,
  UpdateAffiliateSchema,
  UpdatePasswordSchema,
} from './affiliate.schema'

const tags = ['Affiliate']

const updateAffiliateRoute = createRoute({
  method: 'put',
  path: '/',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(UpdateAffiliateSchema, 'updateAffiliateSchema'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(SelectAffiliateSchema, 'affilateSchema'),
  },
})

const referralCountRoute = createRoute({
  method: 'get',
  path: '/referral-count',
  tags,
  middleware: [affiliateAuth],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        affiliate: z.object({ all: z.number(), active: z.number(), inactive: z.number() }),
        user: z.object({ all: z.number(), active: z.number(), inactive: z.number() }),
      }),
      'referral-count',
    ),
  },
})

const getDashboardRoute = createRoute({
  method: 'get',
  path: '/dashboard',
  tags,
  middleware: [affiliateAuth],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.any(), 'dashboard'),
  },
})

const getDashboardChildrenRoute = createRoute({
  method: 'post',
  path: '/dashboard/children',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(DashboardChildrenPayload, 'dashbaordChildrenPayload'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(z.any()), 'dashboardChildren'),
  },
})

const getChildrenAffiliateRoute = createRoute({
  method: 'post',
  path: '/children',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(ChildrenAffiliatePayload, 'afiliateAuth'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        data: z.array(SelectAffiliateSchema),
        total: z.number(),
      }),
      'afiliateAuth',
    ),
  },
})

const getAffiliateUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(AffiliateUsersPayload, 'users'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        data: z.array(z.any()),
        total: z.number(),
      }),
      'users',
    ),
  },
})

const getCommissionRoute = createRoute({
  method: 'get',
  path: '/commission',
  tags,
  middleware: [affiliateAuth],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.record(z.number()), 'commision'),
  },
})

const updateCommissionRoute = createRoute({
  method: 'put',
  path: '/commission',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(CommissionUpdatePayload, 'commissionUpdatePayload'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.record(z.number()), 'commision'),
  },
})

const getTreeAffiliateRoute = createRoute({
  method: 'get',
  path: '/tree-affiliates',
  tags,
  middleware: [affiliateAuth],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(z.any()), 'treeAffiliate'),
  },
})

const updatePasswordRoute = createRoute({
  method: 'patch',
  path: '/password',
  tags,
  middleware: [affiliateAuth],
  request: {
    body: jsonContentRequired(UpdatePasswordSchema, 'updatePasswordSchema'),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: 'Password updated successfully' },
  },
})

const router = createRouter()
  .openapi(updateAffiliateRoute, controller.updateAffiliate as any)
  .openapi(referralCountRoute, controller.referralCount as any)
  .openapi(getDashboardRoute, controller.getDashboard as any)
  .openapi(getDashboardChildrenRoute, controller.getDashboardChildren as any)
  .openapi(getChildrenAffiliateRoute, controller.getChildrenAffiliate as any)
  .openapi(getAffiliateUsersRoute, controller.getAffiliateUsers as any)
  .openapi(getCommissionRoute, controller.getCommission as any)
  .openapi(updateCommissionRoute, controller.updateCommission as any)
  .openapi(getTreeAffiliateRoute, controller.getTreeAffiliate as any)
  .openapi(updatePasswordRoute, controller.updatePassword)

export default router
