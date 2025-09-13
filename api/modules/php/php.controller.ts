import type { Operators, UserWithRelations } from '#/db/'
import { SessionManager } from '#/lib/session.manager'
import chalk from 'chalk'
import type { Context } from 'hono'
import { Wallet } from '~/types'
import { handlePhpCall } from './php.service'

// import { SessionManager } from '#/lib/session.manager'

// import { createRedtigerSettings, createRedtigerSpin } from './redtiger.service'

export const phpController = {
  action: async (c: Context) => {
    const data = c.req.query()
    // const data = rtgSettingsRequestDtoSchema.parse(body)
    console.log(chalk.green(data))
    const user = c.get('user') as UserWithRelations
    const authSession = c.get('authSession')
    if (!data.gameId) {
      return c.json({ message: 'no gameId' }, 401)
    }
    if (!authSession) {
      return c.json({ message: 'not authenticated' }, 401)
    }
    if (!user) {
      return c.json({ message: 'not authenticated' }, 401)
    }
    if (!user.currentGameSessionDataId) {
      return c.json({ message: 'no user.currentGameSessionDataId' }, 404)
    }
    const gameSession = await SessionManager.getGameSession(user.currentGameSessionDataId)

    if (!gameSession) {
      return c.json({ message: 'no gameSession' }, 404)
    }
    c.set('gameSession', gameSession)
    const wallet = c.get('wallet') as Wallet
    const operator = c.get('operator') as Operators
    const game = gameSession.game
    const result = await handlePhpCall(data, gameSession, user, wallet, game, operator)
    if (typeof result === 'string') {
      return c.text(result)
    }
    return c.json(result)
  },
}
