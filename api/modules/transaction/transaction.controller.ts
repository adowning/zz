import type { Context } from 'hono'

import {
  getTop10DepositsByUser,
  createDeposit,
  getDepositById,
  updateDepositStatus,
} from './transaction.service'

export async function handleGetTop10DepositsByUser(c: Context) {
  const user = c.get('user')
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const userId = user.id
    const deposits = await getTop10DepositsByUser(userId)
    return c.json({ deposits }, 200)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 500)
  }
}

export async function handleCreateDeposit(c: Context) {
  const user = c.get('user')
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const depositData = await c.req.json()
    
    // Add user ID to the deposit data
    const depositWithUser = {
      ...depositData,
      userId: user.id,
    }

    const newDeposit = await createDeposit(depositWithUser)
    return c.json({ deposit: newDeposit }, 201)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 500)
  }
}

export async function handleGetDepositById(c: Context) {
  const user = c.get('user')
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const depositId = c.req.param('id')
    
    if (!depositId) {
      return c.json({ error: 'Deposit ID is required' }, 400)
    }

    const deposit = await getDepositById(depositId)
    
    if (!deposit) {
      return c.json({ error: 'Deposit not found' }, 404)
    }

    // Check if the deposit belongs to the user
    if (deposit.userId !== user.id) {
      return c.json({ error: 'Unauthorized to access this deposit' }, 403)
    }

    return c.json({ deposit }, 200)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 500)
  }
}

export async function handleUpdateDepositStatus(c: Context) {
  const user = c.get('user')
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const depositId = c.req.param('id')
    const { status } = await c.req.json()
    
    if (!depositId || !status) {
      return c.json({ error: 'Deposit ID and status are required' }, 400)
    }

    // Check if the deposit exists and belongs to the user first
    const existingDeposit = await getDepositById(depositId)
    
    if (!existingDeposit) {
      return c.json({ error: 'Deposit not found' }, 404)
    }

    if (existingDeposit.userId !== user.id) {
      return c.json({ error: 'Unauthorized to access this deposit' }, 403)
    }

    const updatedDeposit = await updateDepositStatus(depositId, status)
    return c.json({ deposit: updatedDeposit }, 200)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return c.json({ error: errorMessage }, 500)
  }
}