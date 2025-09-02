// frontend/src/composables/useWebSocketClient.ts

import { ref, watch } from 'vue';
import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core';
import { useEventManager } from './useEventManager';
import type { Events } from './useEventManager';
import { getAccessToken } from '@/utils/accessToken';
// A reactive object to hold the WebSocket instance.
// This ensures a single WebSocket connection (singleton pattern).
let wsInstance: UseWebSocketReturn<any> | null = null;
export interface WsMessage {
  type: string
  payload: any
  meta: any
}
/**
 * A robust Vue 3 composable for managing a WebSocket client connection.
 * It features auto-reconnect, a ping/pong heartbeat, and integrates
 * with the application's event manager.
 */
export function useWebSocketClient() {
  // Initialize the event manager to emit events upon message receipt.
  const { emit } = useEventManager();
  const isConnected = ref(false);

  // Function to process and emit events from incoming WebSocket messages.
  const handleMessage = (message: WsMessage) => {
    // A type guard to ensure the event type is valid for emission.
    const isValidEvent = (type: string): type is keyof Events => {
      const validEvents: (keyof Events)[] = [
        'xp:gain',
        'user:updated',
        'wallet:updated',
        'vip:updated',
        'balance:update',
        'animation:add',
        'animation:update',
        'animation:remove',
        'animation:clear-by-owner',
        'animation:clear-all',
        'chat'
      ];
      return validEvents.includes(type as any);
    };

    if (isValidEvent(message.type)) {
      // Emit the specific event with its payload.
      emit(message.type, message.payload);
    }
    if (message.type === 'PONG') {
      console.log('PONG')
    }
    // Also emit a general wsMessage event for broader listeners.
    emit('wsMessage', message);
  };

  // Initialize the WebSocket connection only once.
  if (!wsInstance) {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

    wsInstance = useWebSocket(wsUrl + '/ws/user?token=' + getAccessToken(), {
      // Enable automatic reconnection if the connection is lost.
      autoReconnect: {
        retries: 2,
        delay: 2000,
        onFailed() {
          console.error('Failed to connect to WebSocket server after 3 retries.');
        },
      },
      // Send a 'ping' message every 30 seconds to keep the connection alive.
      heartbeat: {
        message: JSON.stringify({ type: 'PING' }),
        interval: 20000,
      },
      // Automatically open the WebSocket connection.
      autoClose: false,

    });
  }

  // Watch for changes in connection status.
  watch(wsInstance.status, (status) => {
    isConnected.value = status === 'OPEN';
    emit('wsConnected', isConnected.value);
  });

  // Watch for incoming messages.
  watch(wsInstance.data, (newData) => {
    if (typeof newData === 'string') {
      try {
        const parsedMessage: WsMessage = JSON.parse(newData);
        handleMessage(parsedMessage);
      } catch (error) {
        console.error('WebSocket: Error parsing incoming message:', error);
      }
    }
  });

  return {
    ...wsInstance,
    isConnected,
  };
}
// // import { getToken } from "@/utils/authUtil";
// import { IEventManagerService, useEventManager } from '@/composables/useEventManager'
// // import { User, Wallet, VipInfo } from '~/types'
// import { useAuthStore } from '@/stores/auth.store'
// import { useNotificationStore } from '@/stores/notification.store'
// import { getAccessToken } from '@/utils/accessToken'
// import { UseWebSocketReturn, useWebSocket, watchTriggerable } from '@vueuse/core'
// import destr from 'destr'
// // import { UserEvents } from 'share/contracts'
// import { WSMessage, EventMessage } from 'share/protocol'

// export interface WsMessage {
//   type: string
//   payload: any
//   meta: any
// }
// // export type WebSocketMessage =
// //   | {
// //       type: 'user:update'
// //       payload: Partial<User>
// //     }
// //     | {
// //       type: 'wallet:update'
// //       payload: Partial<Wallet>
// //     }
// //     | {
// //       type: 'vip:update'
// //       payload: Partial<VipInfo>
// //     }
// //     | {
// //       type: 'xp:gain'
// //       payload: { amount: number }
// //     }
// //     | {
// //       type: 'balance:gain'
// //       payload: { amount: number }
// //     }


// export interface DatabaseUpdate extends WsMessage {
//   payload: {
//     columnNameChanged: string[]
//     data: any
//     operation: 'UPDATE' | 'INSERT' | 'DELETE'
//     recordId: string
//     table: string
//   }
// }

// export class WebSocketClient {
//   private static instance: WebSocketClient
//   public wsClient: UseWebSocketReturn<any> | null = null
//   private reconnectCount = 0
//   private readonly maxReconnectCount = 3
//   private readonly reconnectDelay = 3000
//   private timer: NodeJS.Timeout | null = null
//   static ticker: NodeJS.Timeout | null = null
//   private tick = 0
//   private messageQueue: any[] = []
//   private forceClose = false
//   private isReconnecting = false
//   private eventManager: IEventManagerService
//   private notificationStore: any
//   static tickerStarted = false
//   private static instanceCount: number = 0
//   private emitter: IEventManagerService

//   private constructor() {
//     WebSocketClient.instanceCount++
//     WebSocketClient.ticker = null
//     this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
//     this.handleOnline = this.handleOnline.bind(this)
//     this.handleOffline = this.handleOffline.bind(this)
//     document.addEventListener('visibilitychange', this.handleVisibilityChange)
//     this.eventManager = useEventManager()
//     this.notificationStore = useNotificationStore()
//     window.addEventListener('online', this.handleOnline)
//     window.addEventListener('offline', this.handleOffline)
//     this.emitter = useEventManager()
//   }

//   static getInstanceCount(): number {
//     return WebSocketClient.instanceCount
//   }

//   public static getInstance(): WebSocketClient {
//     if (!WebSocketClient.instance) {
//       WebSocketClient.instance = new WebSocketClient()
//     }
//     return WebSocketClient.instance
//   }

//   public connect(): void {
//     // const authStore = useAuthStore();

//     if (this.wsClient && (this.wsClient?.status.value === 'OPEN' || this.isReconnecting)) { return }

//     try {
//       // const globalStore = useAuthStore()
//       const accessToken = getAccessToken()
//       const token = accessToken ? accessToken : null
//       if (!token) {
//         console.warn('WebSocket: no token')
//         return
//       }

//       this.forceClose = false
//       this.close()
//       const wsURL = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${import.meta.env.VITE_HONO_WEBSOCKET_URL
//         }/ws/user?token=${encodeURIComponent(token)}`

//       // this.ws = new WebSocket(wsURL);
//       console.log(wsURL)
//      this.wsClient = useWebSocket(wsURL, {
//         immediate: false,
//         heartbeat: {
//           interval: 10000,
//           pongTimeout: 15000,
//           message: JSON.stringify({ type: 'PING', meta: {}, payload: {} }),
//           responseMessage() {
//             return JSON.stringify({ type: 'PONG', meta: {}, payload: {} })
//           },
//         },
//         autoReconnect: {
//           retries: 3,
//           delay: 1000,
//           onFailed: () => {
//             alert('Failed to connect WebSocket after 3 retries')
//           },
//         },
//       })
//       console.log(this.wsClient.status)

//       this.initEventHandlers()
//     } catch (error) {
//       console.error('WebSocket: initEventHandlers', error)
//     }
//   }

//   public initEventHandlers(): void {
//     console.log(this.wsClient.data)
//     if (!this.wsClient) { return }

//     this.wsClient.open = () => {
//       this.reconnectCount = 0
//       // this.startHeartbeat();
//       this.flushMessageQueue()
//       console.log('socket count ', WebSocketClient.getInstanceCount())
//       if (WebSocketClient.tickerStarted === false) {
//         WebSocketClient.ticker = setInterval(() => {
//           this.tick = this.tick + 1
//           // console.log(this.tick);
//         }, 1000)
//       }
//       WebSocketClient.tickerStarted = true
//       // 发送连接成功事件
//       this.eventManager.emit('wsConnected', true)
//     }
//     watchTriggerable(this.wsClient.open, (open) => {
//       console.log('open up buttercup ', open)
//     })
//     // this.wsClient.data.value = (event: WSMessage) => {

//     //   console.log(event)
//     //   try {
//     //     const _message: any = destr(event)
//     //     if (_message.kind === 'event') {
//     //       const message: EventMessage = {
//     //         kind: _message.kind,
//     //         payload: _message.payload,
//     //         v: '1',
//     //         topic: _message.topic,
//     //         event: _message.event,
//     //       }
//     //       this.handleMessage(message)

//     //     }

//     //     // if (message.type === 'pong') return;
//     //     // 使用专门的消息事件类型
//     //     // this.eventManager.emit('wsMessage', message);
//     //   } catch (e) {
//     //     console.log(e)
//     //   }
//     // }
//     watchTriggerable(this.wsClient.data, (data) => {
//       console.log('we gotz that datas ', data);
//       try {
//         const _message: any = destr(data)
//         const message: WSMessage = {
//           kind: _message.kind,
//           payload: _message.payload,
//           v: '1',
//           topic: _message.topic,
//           event: _message.event,
//         }
//         // if (message.type === 'pong') return;
//         this.handleMessage(message)
//         // 使用专门的消息事件类型
//         // this.eventManager.emit('wsMessage', message);
//       } catch (e) {
//         console.log(e)
//       }
//     })
//     this.wsClient.close = (event) => {
//       console.log('closing ....')
//       this.handleClose(new CloseEvent('system', { code: event, reason: event?.toString() }))
//       this.eventManager.emit('wsConnected', false)
//     }
//     watchTriggerable(this.wsClient.close, (close) => {
//       console.log('fucker is trying to close on us! ', close)
//     })
//     watchTriggerable(this.wsClient.status, (status) => {
//       console.log(status)
//     })

//   }

//   private handleClose(event: CloseEvent): void {
//     this.stopHeartbeat()

//     if (event.wasClean) {
//       console.log(`WebSocket: handleClose: ${event.code}`)
//     } else {
//       this.reconnect()
//     }
//   }

//   private reconnect(): void {
//     if (this.forceClose || this.isReconnecting) { return }

//     if (this.reconnectCount >= this.maxReconnectCount) {
//       this.notificationStore.addNotification('error', 'WebSocket too many attempts')
//       return
//     }

//     this.isReconnecting = true
//     setTimeout(() => {
//       this.reconnectCount++
//       this.connect()
//       this.isReconnecting = false
//     }, this.reconnectDelay * this.reconnectCount)
//   }

//   // private startHeartbeat(): void {
//   //   this.timer = setInterval(() => {
//   //   this.send({ type: 'PING', meta: {}, payload: {} });
//   //   }, 20000);
//   // }

//   private stopHeartbeat(): void {
//     if (this.timer) {
//       clearInterval(this.timer)
//       WebSocketClient.ticker = null
//       this.timer = null
//     }
//   }

//   private flushMessageQueue(): void {
//     while (this.messageQueue.length > 0) {
//       const message = this.messageQueue.shift()
//       this.send(message)
//     }
//   }

//   public send(data: unknown): void {
//     if (this.wsClient?.status.value === 'OPEN') {
//       this.wsClient.send(JSON.stringify(data))
//     } else {
//       this.messageQueue.push(data)
//     }
//   }

//   public close(): void {
//     this.forceClose = true

//     if (this.timer) {
//       this.stopHeartbeat()
//     }

//     if (this.wsClient) {
//       this.wsClient.close()
//       this.wsClient = null
//     }
//   }

//   private handleVisibilityChange(): void {
//     if (document.visibilityState === 'visible') {
//       if (!this.wsClient || this.wsClient.status.value !== 'OPEN') {
//         this.connect()
//       }
//     }
//   }

//   private handleOnline(): void {
//     console.log('handleOnline')
//     if (!this.wsClient || this.wsClient.status.value !== 'OPEN') {
//       this.connect()
//     }
//   }

//   private handleOffline(): void {
//     console.log('handleOffline')
//     this.close()
//   }

//   public destroy(): void {
//     this.close()
//     document.removeEventListener('visibilitychange', this.handleVisibilityChange)
//     window.removeEventListener('online', this.handleOnline)
//     window.removeEventListener('offline', this.handleOffline)
//   }
//   // private resetCountdown(): void {
//   //   this.tick = 0
//   //   // console.log('instanceCount ', WebSocketService.instanceCount);
//   //   // this.ticker?.refresh();
//   // }
//   // private handleDatabaseUpdate(message: DatabaseUpdate): void {
//   //   switch (message.payload.table) {
//   //     case 'users':
//   //       // this.userStore.updateUserByParam(message.payload.columnNameChanged, message.payload.data);
//   //       break;
//   //     case 'Profile':
//   //       // this.profileStore.updateProfile(message.payload.id, message.payload.data);
//   //       break;
//   //   }
//   // }
//   private handleMessage(_message: WSMessage): void {
//     const message = _message as EventMessage
//     if (message.kind !== 'event') {
//       this.emitter.emit('wsMessage', message as unknown as WsMessage)

//     } else {
//       // message = _message as WSMessageMessage
//     }
//     console.log('handleMessage', message)
//     try {
//       if (!message.payload || typeof message.payload !== 'object') {
//         console.warn(
//           'Received invalid WebSocket message: Not an object',
//           message.payload
//         )
//         return
//       }
//       // if(message.)
//       // const message = data as WebSockeEventMessagetMessage

//       // Validate message structure
//       if (!message.topic || !message.payload) {
//         console.warn(
//           'Received invalid WebSocket message: Missing type or payload',
//           message
//         )
//         return
//       }

//       // Handle different message types
//       switch (message.topic) {

//         case 'user':
//           switch (message.event) {
//             case 'user:update':
//               this.eventManager.emit('user:updated', { data: message.payload, type: 'user', action: 'update' })
//               break
//             case 'wallet:update':
//               this.eventManager.emit('wallet:updated', { data: message.payload, type: 'user', action: 'update' })
//               break
//             case 'vip:update':
//               this.eventManager.emit('vip:updated', { data: message.payload, type: 'user', action: 'update' })
//               break
//             case 'xp:gain':
//               this.eventManager.emit('xp:gain', { amount: message.payload.amount as number })
//               break
//             default:
//               console.warn(
//                 `Unknown message type`,
//                 message
//               )
//           }
//       }
//     } catch (error) {
//       console.error('Error handling WebSocket message:', error, message)
//     }
//   }
// }

// export interface IWebSocketClient {

// }


// export function useWebSocketClient() {
//   const isConnected = ref(false)
//   const client = ref<WebSocketClient>()
//   const connect = () => {
//     if (isConnected.value) { return }
//     client.value = WebSocketClient.getInstance()
//     client.value.connect()
//     isConnected.value = true
//     return client
//   }
//   return { connect, client }
// }


