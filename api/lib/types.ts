import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { Affiliate, AuthSessionType, GameSession, OperatorType, UserType, VipInfoType, WalletType } from '#/db'
import type { Schema } from 'hono'
import type { PinoLogger } from 'hono-pino'

export interface AppBindings {
  Variables: {
    logger: PinoLogger
    user: UserType
    authSession: AuthSessionType
    gameSession: GameSession
    wallet: WalletType
    vipInfo: VipInfoType
    operator: OperatorType
    affiliate: Affiliate
  }
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
