// PATH: frontend/src/types/events.ts
import type { OperatorType, User, VipInfo, Wallet } from '~/types'
import { WsMessage } from './useWebSocketClient'

/**
 * Defines the payload structure for the 'balance:update' event.
 */
export interface BalanceUpdatePayload {
  amount: number
}
export interface ModelChangeEventFromServer {
  type: string
  action: string
  data: Record<string, number>[] | Partial<User> | Partial<OperatorType> | Partial<Wallet> | Partial<VipInfo>
}
export interface AnimationEventFromServer {
  type: string
  action: string
  data: Record<string, number>[]
}
export interface ChatMessage {
  message: string
}

export interface NotificationFromServer {
  type: string
  payload: {
    message: string
  }
}
export interface BalanceChangeMessage {
  type: string
  newBalance: number
  oldBalance: number
}
export interface Events {
  'balance:update': BalanceUpdatePayload
  settingsModal: boolean
  'animation:add': AnimationEventFromServer
  'animation:update': AnimationEventFromServer
  'animation:remove': AnimationEventFromServer
  'animation:clear-by-owner': AnimationEventFromServer
  'animation:clear-all': AnimationEventFromServer
  'xp:gain': BalanceUpdatePayload
  'user:updated': ModelChangeEventFromServer
  'wallet:updated': ModelChangeEventFromServer
  'vip:updated': ModelChangeEventFromServer
  wsMessage: WsMessage
  chat: ChatMessage
  notification: NotificationFromServer
  hideBars: boolean
  hideMain: boolean
  hideBottomBar: void
  activeName: string
  shopOpen: boolean
  rewardsOpen: boolean
  chatOpen: boolean
  wheelOpen: boolean
  leaderBoardOpen: boolean
  wheelFinished: boolean
  spinStarted: boolean
  wsConnected: boolean
  balanceChange: BalanceChangeMessage
}

export type EventMessage<T extends keyof Events> = (payload: Events[T]) => void

const baseEventList: Record<string, Array<{ call: (payload: unknown) => void; target: unknown }>> = {}

export interface IEventManagerService {
  on: <K extends keyof Events>(eventName: K, callback: (payload: Events[K]) => void, target?: unknown) => void
  emit: <K extends keyof Events>(eventName: K, payload: Events[K]) => void

  off: (eventName: keyof Events, target: unknown) => void

  removeAllEvent: (remove?: keyof Events | object | null) => void
}

export function useEventManager(): IEventManagerService {
  const on = <K extends keyof Events>(eventName: K, callback: (payload: Events[K]) => void, target?: unknown) => {
    if (!baseEventList[eventName]) {
      baseEventList[eventName] = []
    }

    const listeners = baseEventList[eventName]!

    if (listeners.findIndex((element) => element.target === target && element.call === callback) === -1) {
      listeners.push({ call: callback as (payload: unknown) => void, target })
    } else {
      console.warn(`EventManager: Listener for event "${eventName}" and target already exists.`)
    }
  }

  const emit = <K extends keyof Events>(eventName: K, payload: Events[K]) => {
    console.log('emitted: ', eventName)
    if (baseEventList[eventName]) {
      let listeners: Array<{ call: (payload: unknown) => void; target: unknown }> = []
      if (['shopOpen', 'wheelOpen', 'chatOpen', 'leaderBoardOpen', 'rewardsOpen'].includes(eventName as string)) {
        // Only include hideBars listeners for specific UI component open events
        const hideBarsListeners = baseEventList.hideBars || []
        const hideMainListeners = baseEventList.hideMain || []
        listeners = [...baseEventList[eventName]!, ...hideBarsListeners, ...hideMainListeners]
      } else {
        listeners = [...baseEventList[eventName]!]
      }
      listeners.forEach((element) => {
        try {
          ;(element.call as (payload: Events[K]) => void).call(element.target, payload)
        } catch (error) {
          console.error(`EventManager: Error in event listener for "${eventName}":`, error)
        }
      })
    }
  }

  const off = (eventName: keyof Events, target: unknown) => {
    const listeners = baseEventList[eventName]
    if (!listeners) {
      return
    }

    baseEventList[eventName] = listeners.filter((element) => element.target !== target)

    if (baseEventList[eventName]?.length === 0) {
      delete baseEventList[eventName]
    }
  }

  const removeAllEvent = (remove?: keyof Events | object | null | undefined) => {
    if (remove == null) {
      for (const key in baseEventList) {
        delete baseEventList[key as keyof Events]
      }
    } else if (typeof remove === 'string') {
      delete baseEventList[remove]
    } else if (typeof remove === 'object') {
      for (const eventName in baseEventList) {
        const key = eventName as keyof Events
        const listeners = baseEventList[key]
        if (listeners) {
          baseEventList[key] = listeners.filter((element) => element.target !== remove)
          if (baseEventList[key]?.length === 0) {
            delete baseEventList[key]
          }
        }
      }
    }
  }

  return {
    on,
    emit,
    off,
    removeAllEvent,
  }
}
