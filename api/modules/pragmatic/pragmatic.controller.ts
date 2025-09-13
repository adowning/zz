import type { UserWithRelations } from '#/db/'
import chalk from 'chalk'
import type { Context } from 'hono'

// import { SessionManager } from '#/lib/session.manager'

// import { createRedtigerSettings, createRedtigerSpin } from './redtiger.service'

export const pragmaticController = {
  action: async (c: Context) => {
    const data = await c.req.json()
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
  },
}
