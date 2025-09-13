import type { Affiliate } from '#/db'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import * as affiliateService from './affiliate.service'

export const affiliateAuth = createMiddleware<{
  Variables: {
    affiliate: Affiliate
  }
}>(async (c, next) => {
  // This is a placeholder for actual authentication logic.
  // In a real application, you would get a token from the request,
  // verify it, and fetch the affiliate from the database.
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  const token = authHeader.substring(7)

  // Here you would typically verify the JWT token and get the affiliate ID
  // For this example, we'll assume the token is the affiliate ID for simplicity.
  const affiliateId = token // In a real app, decode JWT to get ID.

  const affiliate = (await affiliateService.getAffiliateById(affiliateId)) as Affiliate

  if (!affiliate) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  c.set('affiliate', affiliate)
  await next()
})
