import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'

import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
import {
  handleGetTop10DepositsByUser,
  handleCreateDeposit,
  handleGetDepositById,
  handleUpdateDepositStatus,
} from './transaction.controller'
import { TransactionsSchema } from '#/db'

const tags = ['Transactions']

export const getTop10DepositsByUserRoute = createRoute({
  method: 'get',
  path: '/transactions/deposits/top10',
  tags,

  summary: 'Get top 10 deposits by user based on most recently created',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(

      z.array(TransactionsSchema),
      'Top 10 deposits for the authenticated user',
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ error: z.string() }),
      'Unauthorized',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ error: z.string() }),
      'Internal server error',
    ),
  },
})

export const createDepositRoute = createRoute({
  method: 'post',
  path: '/transactions/deposits',
  tags,
  summary: 'Create a new deposit',
  request: {
    body: jsonContentRequired(
      TransactionsSchema,
      'Deposit data to create',
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({
        deposit: TransactionsSchema
      }),
      'The created deposit',
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      'Invalid request body',
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ error: z.string() }),
      'Unauthorized',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ error: z.string() }),
      'Internal server error',
    ),
  },
})

export const getDepositByIdRoute = createRoute({
  method: 'get',
  path: '/transactions/deposits/{id}',
  tags,
  summary: 'Get deposit by ID',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'Deposit ID',
    },
  ],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        deposit: TransactionsSchema
      }),
      'The deposit details',
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      'Invalid deposit ID',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ error: z.string() }),
      'Deposit not found',
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ error: z.string() }),
      'Unauthorized',
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({ error: z.string() }),
      'Forbidden',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ error: z.string() }),
      'Internal server error',
    ),
  },
})

export const updateDepositStatusRoute = createRoute({
  method: 'patch',
  path: '/transactions/deposits/{id}/status',
  tags,
  summary: 'Update deposit status',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'Deposit ID',
    },
  ],
  request: {
    body: jsonContentRequired(
      TransactionsSchema,
      'Status update data',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        deposit: TransactionsSchema
      })
      ,
      'The updated deposit',
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ error: z.string() }),
      'Invalid request body or deposit ID',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ error: z.string() }),
      'Deposit not found',
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ error: z.string() }),
      'Unauthorized',
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({ error: z.string() }),
      'Forbidden',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ error: z.string() }),
      'Internal server error',
    ),
  },
})

const router = createRouter()

// Require auth for all transaction endpoints
router.use('/transactions/*', authMiddleware)

router.openapi(getTop10DepositsByUserRoute, handleGetTop10DepositsByUser as any)
router.openapi(createDepositRoute, handleCreateDeposit)
router.openapi(getDepositByIdRoute, handleGetDepositById)
router.openapi(updateDepositStatusRoute, handleUpdateDepositStatus)

export default router

export type GetTop10DepositsByUserRoute = typeof getTop10DepositsByUserRoute
export type CreateDepositRoute = typeof createDepositRoute
export type GetDepositByIdRoute = typeof getDepositByIdRoute
export type UpdateDepositStatusRoute = typeof updateDepositStatusRoute