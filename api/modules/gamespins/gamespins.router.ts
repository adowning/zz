import { GameSpinsSchema,  } from '#/db'
// import { notFoundSchema } from '#/lib/constants'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
import * as controller from './gamespins.controller'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { createRoute, z } from '@hono/zod-openapi'

const tags = ['Game Spins']

const getTopWins = createRoute({
  method: 'get',
  path: '/gamespins/topwins',
  tags,
  summary: 'Get the active wallet for the authenticated user',
  responses: {
   [HttpStatusCodes.OK]: jsonContent(
      z.array(GameSpinsSchema),
      'The list of topwins',
    ),

  },
})

// export default router
const router = createRouter()

// Require auth for all transaction endpoints
router.use('/gamespins/*', authMiddleware)
router.openapi(getTopWins, controller.getTopWins )
export default router
