import { createRouter } from '#/lib/create-app';
import { createRoute,  } from '@hono/zod-openapi';
import * as controller from './reward.controller';
import { rewardAuth } from './reward.auth';

import {
    RewardStatusResponse,
    RewardConvertPayload,
    RewardConvertResponse,
    RewardDashboardResponse,
    RewardActivityResponse
} from './reward.schema';

const tags = ['Rewards'];

const rewardStatusRoute = createRoute({
    method: 'get',
    path: '/reward/status',
    tags,
    middleware: [rewardAuth],
    responses: {
        200: {
            description: 'Reward status retrieved successfully',
            content: {
                'application/json': {
                    schema: RewardStatusResponse,
                },
            },
        },
    },
});

const rewardLogRoute = createRoute({
    method: 'post',
    path: '/reward/get-log',
    tags,
    middleware: [rewardAuth],
    responses: {
        200: {
            description: 'Reward logs retrieved successfully',
        },
    },
});

const rewardActivityRoute = createRoute({
    method: 'get',
    path: '/reward/activity',
    tags,
    middleware: [rewardAuth],
    responses: {
        200: {
            description: 'Reward activity retrieved successfully',
            content: {
                'application/json': {
                    schema: RewardActivityResponse,
                },
            },
        },
    },
});

const rewardDashboardRoute = createRoute({
    method: 'get',
    path: '/reward/dashboard',
    tags,
    middleware: [rewardAuth],
    responses: {
        200: {
            description: 'Reward dashboard retrieved successfully',
            content: {
                'application/json': {
                    schema: RewardDashboardResponse,
                },
            },
        },
    },
});

const rewardConvertRoute = createRoute({
    method: 'post',
    path: '/reward/convert',
    tags,
    middleware: [rewardAuth],
    request: {
        body: {
            required: true,
            content: {
                'application/json': {
                    schema: RewardConvertPayload,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Reward conversion processed successfully',
            content: {
                'application/json': {
                    schema: RewardConvertResponse,
                },
            },
        },
    },
});

const router = createRouter()
    .openapi(rewardStatusRoute, controller.getRewardStatus)
    .openapi(rewardLogRoute, controller.getRewardLog)
    .openapi(rewardActivityRoute, controller.getRewardActivity)
    .openapi(rewardDashboardRoute, controller.getRewardDashboard)
    .openapi(rewardConvertRoute, controller.getRewardConvert);

export default router;