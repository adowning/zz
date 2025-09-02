import { User, Wallet, VipInfo } from '~/types'
import { useAuthStore } from '@/stores/auth.store'
// import type { WebSocketMessage } from '@/types/websocket'
export type WebSocketMessage =
  | {
      type: 'user:update'
      payload: Partial<User>
    }
    | {
      type: 'wallet:update'
      payload: Partial<Wallet>
    }
    | {
      type: 'vip:update'
      payload: Partial<VipInfo>
    }
    | {
      type: 'xp:gain'
      payload: { amount: number }
    }
    | {
      type: 'balance:gain'
      payload: { amount: number }
    }
    | {
      type: 'notification'
      payload: { message: string }
    }
class WebSocketService {
    private socket: WebSocket | null = null
    private gameSocket: WebSocket | null = null
    private reconnectAttempts = 0
    private maxReconnectAttempts = 5
    private reconnectDelay = 1000
    private eventManager = useEventManager()

    public  initConnection() {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated || this.socket) { return }

        // const wsUrl = this.buildWebSocketUrl('/ws/user')
        const wsUrl = `wss://apidev.cashflowcasino.com/ws/user?token=${authStore.getAccessToken}`
        this.socket = new WebSocket(wsUrl)
        this.setupSocketHandlers(this.socket, 'main')
    }

    public initGameConnection(gameId: string): void {
        if (this.gameSocket) {
            this.gameSocket.close()
        }

        const wsUrl = this.buildWebSocketUrl(`/ws/game/${gameId}`)
        this.gameSocket = new WebSocket(wsUrl)
        this.setupSocketHandlers(this.gameSocket, 'game')
    }

    private setupSocketHandlers(
        socket: WebSocket,
        type: 'main' | 'game'
    ): void {
        socket.onopen = (): void => {
            console.log(`${type} WebSocket connected`)
            this.reconnectAttempts = 0
        }

        socket.onmessage = (event: MessageEvent): void => {
            try {
                const data = JSON.parse(event.data.toString())
                this.handleIncomingMessage(data)
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
            }
        }

        socket.onclose = (): void => {
            console.log(`${type} WebSocket disconnected`)
            this.handleReconnect(type)
        }

        socket.onerror = (error: Event): void => {
            console.error(`${type} WebSocket error:`, error)
        }
    }

    private handleIncomingMessage(data: unknown): void {
        try {
            if (!data || typeof data !== 'object') {
                console.warn(
                    'Received invalid WebSocket message: Not an object',
                    data
                )
                return
            }

            const message = data as WebSocketMessage

            // Validate message structure
            if (!message.type || !message.payload) {
                console.warn(
                    'Received invalid WebSocket message: Missing type or payload',
                    message
                )
                return
            }

            // Handle different message types
            switch (message.type) {
                case 'user:update':
                    this.eventManager.emit('user:updated', { data: message.payload, type: 'user', action: 'update' })
                    break
                case 'wallet:update':
                    this.eventManager.emit('wallet:updated', { data: message.payload, type: 'user', action: 'update' })
                    break
                case 'vip:update':
                    this.eventManager.emit('vip:updated', { data: message.payload, type: 'user', action: 'update' })
                    break
                case 'xp:gain':
                    this.eventManager.emit('xp:gain', { amount: message.payload.amount })
                    break
                case 'notification':
                    this.eventManager.emit('notification', message )
                    break
                default:
                    console.warn(
                        `Unknown message type`,
                        message
                    )
            } 
        } catch (error) {
            console.error('Error handling WebSocket message:', error, data)
        }
    }

    private handleReconnect(type: 'main' | 'game'): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached')
            return
        }

        this.reconnectAttempts++
        const delay =
            this.reconnectDelay * 2 ** (this.reconnectAttempts - 1)

        setTimeout(
            () => {
                if (type === 'main') {
                    this.initConnection()
                }
            },
            Math.min(delay, 30000)
        )
    }

    private buildWebSocketUrl(path: string): string {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        // const host =
        //     import.meta.env.VITE_API_URL?.replace(/^https?:\/\//, '') ||
        //     window.location.host
            const host = `apidev.cashflowcasino.com`
        const token = useAuthStore().getAccessToken
        return `${protocol}//${host}${path}?token=${token}`
    }

    public closeConnections(): void {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
        if (this.gameSocket) {
            this.gameSocket.close()
            this.gameSocket = null
        }
    }

    /**
     * Check if the main WebSocket connection is active
     */
    public isConnected(): boolean {
        return this.socket !== null && this.socket.readyState === WebSocket.OPEN
    }
}

export const webSocketService = new WebSocketService()
