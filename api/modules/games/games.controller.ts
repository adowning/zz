import type { Context } from 'hono'
import type {  UserType } from '#/db/'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as service from './games.service'
import { AuthSessionType } from '~/types'

// export function getGameCategories(c: Context) {
//   const data = service.findGameCategories()
//   return c.json(data)
// }

export async function getAllGames(c: Context) {
  console.log('here')
  const data = await service.findAllGames()
  return c.json(data)
}

export async function searchGames(c: Context) {
  const { game_categories_slug, page, limit } = c.req.query()
  const data = await service.searchGames({
    game_categories_slug,
    page: page ? Number.parseInt(page) : 1,
    limit: limit ? Number.parseInt(limit) : 10,
  })
  return c.json(data)
}

// export async function getUserGames(c: Context) {
//   const { game_categories_slug, page, limit } = c.req.query()
//   const user = c.get('user') as UserType
//   const data = await service.findUserGames(user.id, {
//     game_categories_slug,
//     page: page ? Number.parseInt(page) : 1,
//     limit: limit ? Number.parseInt(limit) : 10,
//   })
//   return c.json(data)
// }

// export async function favoriteGame(c: Context) {
//   const user = c.get('user') as UserType
//   const { add_game, del_game } = await c.req.json()
//   if (add_game) {
//     await service.addFavoriteGame(user.id, add_game)
//   } else if (del_game) {
//     await service.removeFavoriteGame(user.id, del_game)
//   }
//   return c.json({ message: 'Success' })
// }

// export async function getFavoriteGames(c: Context) {
//   const user = c.get('user') as UserType
//   const data = await service.findFavoriteGames(user.id)
//   return c.json(data)
// }

export async function enterGame(c: Context) {
  console.log('enter game started')
  const user = c.get('user') as UserType
  const authSession = c.get('authSession') as AuthSessionType
  const token = c.get('token') as string
  const gameId = c.req.param('id')
  const wallet = c.get('wallet')
  const balance = wallet.balance
  const data = await service.enterGame(c, user, authSession, gameId, token, balance)
  console.log('enter game ended')
  if (data === null) {
    return c.json(
      { message: HttpStatusPhrases.BAD_REQUEST },
      HttpStatusCodes.BAD_REQUEST,
    )
  }
  if (!data.gameConfig) {
    return c.json(
      { message: HttpStatusPhrases.BAD_REQUEST },
      HttpStatusCodes.BAD_REQUEST,
    )
  }
  return c.json({ webUrl: data.webUrl as string, gameConfig: data.gameConfig }, 200)
}

export async function checkSession(c: Context) {
  const user = c.get('user') as UserType
  const data = await service.checkSession(user,)
  if (data === null) {
    return c.json(
      { message: HttpStatusPhrases.BAD_REQUEST },
      HttpStatusCodes.BAD_REQUEST,
    )
  } else {
    return c.json({ gameId: data }, 200)
  }

}
export async function leaveGame(c: Context) {
  const authSession = c.get('authSession') as AuthSessionType
  await service.leaveGame(authSession.id)
  return c.json({ message: 'Success' })
}

// export async function getGameHistory(c: Context) {
//   const user = c.get('user') as UserType
//   const data = await service.findGameHistory(user.id)
//   return c.json(data)
// }
// export async function topWins(c: Context) {
//   const data = await service.findTopWins()
//   return c.json(data)
// }
