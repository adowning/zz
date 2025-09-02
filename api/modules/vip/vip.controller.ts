import type { Context } from 'hono'

import * as service from './vip.service'

/**
 * Gets the detailed VIP status for the currently authenticated user.
 */
export async function getMyVipDetails(c: Context) {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const vipDetails = await service.getVipDetailsForusers(user.id)
    if (!vipDetails) {
      return c.json({ error: 'VIP information not found for user.' }, 404)
    }
    return c.json(vipDetails)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: message }, 500)
  }
}

/**
 * Gets the VIP level configuration table.
 */
export async function getVipLevels(c: Context) {
  try {
    const levels = await service.getAllvipLevels()
    return c.json(levels)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: message }, 500)
  }
}

/**
 * Gets the VIP rank configuration table.
 */
export async function getVipRanks(c: Context) {
  try {
    const ranks = await service.getAllvipRanks()
    return c.json(ranks)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: message }, 500)
  }
}
