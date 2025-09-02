import type { Context } from 'hono'

import { creditTowallets, debitFromwallets, updateCashtag } from './wallet.service' // Assuming wallet service is in the same directory

export async function handleUpdateBalance(c: Context) {
  const user = c.get('user')
  const { amount, type, description } = await c.req.json()

  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return c.json({ error: 'Invalid amount' }, 400)
  }

  try {
    if (type === 'credit') {
      await creditTowallets(user.id, amount, description || 'Test credit')
    } else if (type === 'debit') {
      await debitFromwallets(user.id, amount, description || 'Test debit')
    } else {
      return c.json({ error: 'Invalid transaction type' }, 400)
    }
    return c.json({ success: true, message: `Balance updated successfully.` })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 500)
  }
}
export async function handleUpdateCashtag(c: Context) {
  const user = c.get('user')
  const { cashtag } = await c.req.json()

  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  if (!cashtag) {
    return c.json({ error: 'Invalid cashtag' }, 400)
  }

  try {
    const _cashtag = await updateCashtag(c, cashtag)

    return c.json({ cashtag: _cashtag }, 200)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 400)
  }
}
