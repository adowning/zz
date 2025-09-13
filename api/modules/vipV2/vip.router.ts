import { createRoute, z } from '@hono/zod-openapi'
import {
  VipCashbackSchema,
  VipLevelSchema,
  VipLevelUpBonusSchema,
  VipSpinPrizeSchema,
  VipSpinRewardSchema,
  VipTiersSchema,
} from '#/db'
import { createRouter } from '#/lib/create-app'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import * as controller from './vip.controller'

const tags = ['VIP']

// VIP Tiers Routes
const createVipTiersRoute = createRoute({
  method: 'post',
  path: '/vip/tiers',
  tags,
  request: {
    body: jsonContentRequired(VipTiersSchema, 'The VIP tier to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(VipTiersSchema, 'The created VIP tier'),
  },
})

const getVipTiersListRoute = createRoute({
  method: 'get',
  path: '/vip/tiers',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(VipTiersSchema), 'The list of VIP tiers'),
  },
})

// VIP Levels Routes
const createVipLevelRoute = createRoute({
  method: 'post',
  path: '/vip/levels',
  tags,
  request: {
    body: jsonContentRequired(VipLevelSchema, 'The VIP level to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(VipLevelSchema, 'The created VIP level'),
  },
})

const getVipLevelsRoute = createRoute({
  method: 'get',
  path: '/vip/levels',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(VipLevelSchema), 'The list of VIP levels'),
  },
})

// VIP Cashback Routes
const createVipCashbackRoute = createRoute({
  method: 'post',
  path: '/vip/cashback',
  tags,
  request: {
    body: jsonContentRequired(VipCashbackSchema, 'The VIP cashback to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(VipCashbackSchema, 'The created VIP cashback'),
  },
})

const getVipCashbackListRoute = createRoute({
  method: 'get',
  path: '/vip/cashback/{userId}',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(VipCashbackSchema), 'The list of VIP cashbacks'),
  },
})

const triggerWeeklyCashbackRoute = createRoute({
  method: 'post',
  path: '/vip/cashback/weekly/trigger',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ message: z.string() }), 'The weekly cashback trigger response'),
  },
})

const triggerMonthlyCashbackRoute = createRoute({
  method: 'post',
  path: '/vip/cashback/monthly/trigger',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ message: z.string() }), 'The monthly cashback trigger response'),
  },
})

// VIP Level Up Bonus Routes
const getAvailableBonusRoute = createRoute({
  method: 'get',
  path: '/vip/bonus/{userId}',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(VipLevelUpBonusSchema, 'The available level up bonus'),
  },
})

const calculateLevelUpRoute = createRoute({
  method: 'post',
  path: '/vip/levelup/calculate',
  tags,
  request: {
    body: jsonContentRequired(
      z.object({
        userId: z.string(),
        turnover: z.number(),
      }),
      'The level up calculation request',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ message: z.string() }), 'The level up calculation response'),
  },
})

// VIP Spin Prize Routes
const createVipSpinPrizeRoute = createRoute({
  method: 'post',
  path: '/vip/spin-prize',
  tags,
  request: {
    body: jsonContentRequired(VipSpinPrizeSchema, 'The VIP spin prize to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(VipSpinPrizeSchema, 'The created VIP spin prize'),
  },
})

const getVipSpinPrizesRoute = createRoute({
  method: 'get',
  path: '/vip/spin-prizes',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(VipSpinPrizeSchema), 'The list of VIP spin prizes'),
  },
})

// VIP Spin Reward Routes
const createVipSpinRewardRoute = createRoute({
  method: 'post',
  path: '/vip/spin-reward',
  tags,
  request: {
    body: jsonContentRequired(VipSpinRewardSchema, 'The VIP spin reward to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(VipSpinRewardSchema, 'The created VIP spin reward'),
  },
})

const getTotalBonusRoute = createRoute({
  method: 'get',
  path: '/vip/spin-reward/total',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ total: z.number() }), 'The total bonus amount'),
  },
})

const getWinnersRoute = createRoute({
  method: 'get',
  path: '/vip/spin-reward/winners',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(VipSpinRewardSchema), 'The list of VIP spin reward winners'),
  },
})

const getLastSpinRoute = createRoute({
  method: 'get',
  path: '/vip/spin-reward/last/{userId}',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(VipSpinRewardSchema, 'The last spin record'),
  },
})

const router = createRouter()
  // VIP Tiers
  .openapi(createVipTiersRoute, controller.createVipTiers)
  .openapi(getVipTiersListRoute, controller.getVipTiersList)
  // VIP Levels
  .openapi(createVipLevelRoute, controller.createVipLevel)
  .openapi(getVipLevelsRoute, controller.getVipLevels)
  // VIP Cashback
  .openapi(createVipCashbackRoute, controller.createVipCashback)
  .openapi(getVipCashbackListRoute, controller.getVipCashbackList)
  .openapi(triggerWeeklyCashbackRoute, controller.triggerWeeklyCashback)
  .openapi(triggerMonthlyCashbackRoute, controller.triggerMonthlyCashback)
  // VIP Level Up Bonus
  .openapi(getAvailableBonusRoute, controller.getAvailableBonus)
  .openapi(calculateLevelUpRoute, controller.calculateLevelUp)
  // VIP Spin Prize
  .openapi(createVipSpinPrizeRoute, controller.createVipSpinPrize)
  .openapi(getVipSpinPrizesRoute, controller.getVipSpinPrizes)
  // VIP Spin Reward
  .openapi(createVipSpinRewardRoute, controller.createVipSpinReward)
  .openapi(getTotalBonusRoute, controller.getTotalBonus)
  .openapi(getWinnersRoute, controller.getWinners)
  .openapi(getLastSpinRoute, controller.getLastSpin)

export default router
