import { createRoute, z } from '@hono/zod-openapi'
import {
  AuthSessionsSchema,
  GameSessionsSchema,
  OperatorsSchema,
  UsersSchema,
  VipInfoSchema,
  WalletsSchema,
} from '#/db'
import { badRequestSchema } from '#/lib/constants'
// import {
//   selectAuthSessionSchema,
//   selectGameSession,
//   selectVipInfoSchema,
//   selectWalletSchema,
//   userResponseSchema,
// } from '#/db/zod/index'
import { createRouter } from '#/lib/create-app'
import { authMiddleware } from '#/middlewares/auth.middleware'
import { sessionMiddleware } from '#/middlewares/session.middleware'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import * as controller from './auth.controller'

const tags = ['Auth']

export const login = createRoute({
  path: '/auth/login',
  method: 'post',
  request: {
    body: jsonContentRequired(
      // Require password AND at least one identifier (username or uid)
      z.object({
        password: z.string(),
        username: z.string(),
      }),
      // }).and(
      //     z.union([
      //         z.object({ username: z.string(), uid: z.undefined().optional() }),
      //         z.object({ uid: z.string(), username: z.undefined().optional() }),
      //     ]).openapi('LoginRequest')
      // ),
      'User credentials for login: provide password and either username or uid',
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UsersSchema, 'The user object and sets an access token cookie.'),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(badRequestSchema, 'Bad Request'),
    // [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    //     createErrorSchema(userResponseSchema),
    //     'Invalid id error',
    // ),
  },
})

export const signup = createRoute({
  path: '/auth/signup',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
      'User credentials for signup',
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(UsersSchema, 'The created user object and sets an access token cookie.'),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(badRequestSchema, 'Bad Request'),
    // [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
    //     createErrorSchema(insertUserSchema),
    //     'The validation error(s)',
    // ),
  },
})

export const sessionRoute = createRoute({
  method: 'get',
  path: '/auth/me',
  tags,
  summary: 'Get current user session',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        user: UsersSchema,
        authSession: AuthSessionsSchema,
        // gameSession: GameSessionsSchema.optional(),
        wallet: WalletsSchema,
        vipInfo: VipInfoSchema,
        operator: OperatorsSchema.omit({ goldsvetData: true }),
      }),
      'The current user session',
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(badRequestSchema, 'Bad Request'),
  },
})

const logoutRoute = createRoute({
  method: 'post',
  path: '/auth/logout',
  tags,
  summary: 'Logout current user',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('Successfully logged out'), 'Logout successful'),
    401: jsonContent(z.object({ error: z.string() }), 'Unauthorized'),
  },
})

// Issue new 15m access token from a valid refresh cookie; rotates refresh every ~6h
const refreshRoute = createRoute({
  method: 'post',
  path: '/auth/refresh',
  tags,
  summary: 'Mint a new access token using the refresh cookie',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ accessToken: z.string() }), 'New access token'),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(z.object({ error: z.string() }), 'Invalid or expired refresh token'),
  },
})

const otpRoute = createRoute({
  method: 'post',
  path: '/auth/otp',
  tags,
  summary: 'Initiate otp auth',
  request: {
    body: jsonContentRequired(
      z.object({
        phone: z.string(),
      }),
      'Phone number for OTP',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('Successfully logged out'), 'Logout successful'),
    401: jsonContent(z.object({ error: z.string() }), 'Unauthorized'),
  },
})
const verifyOtp = createRoute({
  method: 'post',
  path: '/auth/otp/verify',
  tags,
  summary: 'Return otp code received from server',
  request: {
    body: jsonContentRequired(
      z.object({
        otpCode: z.string(),
      }),
      'Phone number for OTP',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('Successfully logged out'), 'Logout successful'),
    401: jsonContent(z.object({ error: z.string() }), 'Unauthorized'),
  },
})

const router = createRouter()

router.openapi(login, controller.login)
router.openapi(signup, controller.signup)

// Refresh uses only cookie, no authMiddleware
router.openapi(refreshRoute, controller.refresh)
router.openapi(otpRoute, controller.otp as any)
router.openapi(verifyOtp, controller.verifyOtp as any)

router.use('/auth/logout', authMiddleware)
router.openapi(logoutRoute, controller.logout)

router.use('/auth/me', authMiddleware, sessionMiddleware)
router.openapi(sessionRoute, controller.session)

export default router

export type LoginRoute = typeof login
export type SignUpRoute = typeof signup
export type SessionRoute = typeof sessionRoute
export type RefreshRoute = typeof refreshRoute
