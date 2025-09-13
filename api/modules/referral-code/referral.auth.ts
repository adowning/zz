import { authMiddleware } from '#/middlewares/auth.middleware';

/**
 * Middleware to authenticate user for referral endpoints
 * Reuses the main auth middleware and ensures user is set in context
 */
export const referralAuth = authMiddleware;