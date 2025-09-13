import { createRoute, z } from '@hono/zod-openapi'
import { OperatorsSchema, ProductsSchema } from '#/db'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
import * as controller from './operator.controller'

const tags = ['Operator']

const getOperatorsRoute = createRoute({
  method: 'get',
  path: '/operators',
  tags,
  summary: 'Get all operators',
  responses: {
    200: {
      description: 'Returns a list of operators.',
      content: {
        'application/json': {
          schema: z.array(OperatorsSchema.omit({ goldsvetData: true })),
        },
      },
    },
    401: { description: 'Unauthorized' },
  },
})

const getMyOperatorsProductsRoute = createRoute({
  method: 'get',
  path: '/operators/products',
  tags,
  summary: 'Get all products for the current users operator',
  responses: {
    200: {
      description: 'Returns a list of products.',
      content: {
        'application/json': {
          schema: z.object({
            operator: OperatorsSchema.omit({ goldsvetData: true }),
            product: z.array(ProductsSchema),
          }),
          // operator: OperatorsSchema,
        },
      },
    },
    401: { description: 'Unauthorized' },
  },
})

const router = createRouter()

router.use('/operators/*', authMiddleware)

router.openapi(getOperatorsRoute, controller.getOperators as any)
router.openapi(getMyOperatorsProductsRoute, controller.getMyOperatorWithProducts)
// router.openapi(getOperatorProductsRoute, controller.getOperatorProducts as any)

export default router
