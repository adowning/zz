import { authMiddleware } from '#/middlewares/auth.middleware';

/**
 * Middleware to authenticate user for reward endpoints
 * Reuses the main auth middleware and ensures user is set in context
 */
export const rewardAuth = authMiddleware;