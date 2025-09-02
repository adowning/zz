import type { Context } from 'hono'
import chalk from 'chalk'

import type { UserWithRelations } from '#/db/'



import { SessionManager } from '#/lib/session.manager'

import { createRedtigerSettings, createRedtigerSpin } from './redtiger.service'

export const redtigerController = {
  settings: async (c: Context) => {
    console.log(chalk.magenta('redtigerController gettingSettings'))
    const data = await c.req.json()
    // const data = rtgSettingsRequestDtoSchema.parse(body)
    const user = c.get('user') as UserWithRelations
    const authSession = c.get('authSession')
    if (!data.gameId) {
      return c.json({ message: 'no gameId' }, 401)
    }
    if (!authSession) {
      return c.json({ message: 'not authenticated' }, 401)
    }
    const gameName = `${data.gameId}RTG`

    if (!user.currentGameSessionDataId) {
      return c.json({ message: 'no session' }, 401)
    }
    const gameSession = await SessionManager.getGameSession(user.currentGameSessionDataId)

    if (!gameSession) {
      return c.json({ message: 'no gameSession' }, 404)
    }
    c.set('gameSession', gameSession)

    const settings = await createRedtigerSettings(
      user,
      gameName,
      gameSession.id,
      data,
    )
    if (settings && settings.result && settings.result.user) {
      settings.result.user.sessionId = gameSession.id
    }
    return c.json(settings)
  },
  spin: async (c: Context) => {
    console.log(chalk.magenta('redtigerController gettingSpin'))
    const data = await c.req.json()
    // console.log(body)
    // const data = rtgSpinRequestDtoSchema.parse(body)
    const user = c.get('user') as UserWithRelations
    console.log(user.id)
    if (!user) {
      return c.json({ message: 'not authenticated' }, 401)
    }

    const gameSession = c.get('gameSession')
    if (!gameSession) {
      return c.json({ message: 'no gameSession RT46' }, 404)
    }

    const gameName = `${data.gameId}RTG`
    if (!gameName) {
      return c.json({ message: 'no gameName' }, 404)
    }

    const spin = await createRedtigerSpin(c, data)
    return c.json(spin)
  },
}
