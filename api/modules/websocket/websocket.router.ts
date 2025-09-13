import { server } from '#/index'
import { createRouter } from '#/lib/create-app'
import { SessionManager } from '#/lib/session.manager'
import { authSessions, users, wallets, vipInfos } from '#/db/'
import { and, eq } from 'drizzle-orm'
import { env } from 'process'
import { getNolimitToken } from '../nolimit/nolimit.utils'
import { topicHandlers } from './websocket.handler'
import chalk from 'chalk'
import db from '#/db'
import * as jose from 'jose'

const router = createRouter()
const ISSUER = 'api.cashflowcasino.com'
const AUDIENCE = 'web'
// The route now accepts a topic parameter
router.get('/ws/:topic', async (c) => {
  const url = new URL(c.req.url)
  const match = /^\/ws\/(?<topic>\w+)$/.exec(url.pathname)
  const topic = match?.groups?.topic as keyof typeof topicHandlers
  let token = url.searchParams.get('token')
  let key
  console.log(chalk.bgBlack.whiteBright(`[WS] New connection to ${topic}`))
  if (topic === 'proxy') {
    const result = getNolimitToken(c.req)
    token = result?.token ? result.token : null
    key = result?.key ? result.key : null
  }
  if (token === null) {
    console.error(chalk.red('[WS Auth] No token provided.'))
    return new Response('Unauthorized: No token provided', {
      status: 401,
    })
  }

  try {
  console.log(chalk.bgBlack.whiteBright(`[WS] Starting auth sequence`))
    console.log(token)

    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    // const { payload } = await jose.jwtVerify(token, secret)
    const  { payload, protectedHeader }  = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
      issuer: ISSUER,
      audience: AUDIENCE,
    })
    
    console.log(protectedHeader)
    if (!payload.userId || !payload.sessionId) {
      console.error(chalk.red('[WS Auth] Invalid token payload.'))
      return new Response('Unauthorized: Invalid token payload', {
        status: 401,
      })
    }
    const authSession = await db.query.authSessions.findFirst({
      where: and(
        eq(authSessions.id, payload.sessionId as string),
        eq(authSessions.status, 'ACTIVE')
      ),
    })

    if (!authSession) {
      console.error(
        chalk.red(`[WS Auth] Session not found or expired for session ID: ${payload.sessionId}`)
      )
      return new Response('Unauthorized: Session not found or has expired', { status: 401 })
    }

    const user = await db.query.users.findFirst({
      with: {
        activeWallet: true
      },
      where: eq(users.id, payload.userId as string),
    })

    if (!user || !user.activeWalletId || !user.vipInfoId) {
      console.error(chalk.red(`[WS Auth] not found for user ID: ${JSON.stringify(user?.id)}`))
      console.error(chalk.red(`[WS Auth] activeWalletId : ${JSON.stringify(user?.activeWalletId)}`))
      console.error(chalk.red(`[WS Auth] vipInfoId : ${JSON.stringify(user?.vipInfoId)}`))
      return new Response('Unauthorized: User not found', {
        status: 401,
      })
    }
    let gameSession
    if (topic !== 'user' && topic !== 'chat' && topic !== 'notifications') {
      gameSession = await SessionManager.getActiveGameSession(user.id)
      if (!gameSession) {
        return new Response('Unauthorized: Game session not found', {
          status: 403,
        })
      }
    } else {
      // gameSession = null

    }

    const wallet = await db.query.wallets.findFirst({
      where: eq(wallets.id, user.activeWalletId),
    })
    const vipInfo = await db.query.vipInfos.findFirst({
      where: eq(vipInfos.id, user.vipInfoId),
    })
    if (!vipInfo || !wallet) {
      return new Response('Unauthorized: User not found', {
        status: 401,
      })
    }

    // If all checks pass, upgrade the connection.
    if (
      server.upgrade(c.req.raw, {
        data: {
          user,
          wallet,
          vipInfo: vipInfos,
          authSession,
          topic,
          nolimitSessionKey: key,
          gameSession,
        },
      })
    ) {
      console.log(
        chalk.green(
          `[WS Auth] Successful upgrade for user ${user.username} on topic '${topic}'`
        )
      )
      return // Bun handles the response after a successful upgrade.
    }

    // This should not be reached if upgrade is successful.
    return new Response('WebSocket upgrade failed', { status: 500 })
  } catch (error: any) {
    console.error(chalk.red('[WS Auth] Token verification failed:'), error.message)
    return new Response(`Unauthorized: ${error.message}`, {
      status: 401,
    })
  }
})

export default router
