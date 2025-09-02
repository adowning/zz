// Type definitions for WebSocket modules
declare module 'ws/envelope' {
  export function rpcResultEnvelope(id: string, result: unknown): unknown
  export function rpcErrorEnvelope(id: string, error: { code: number; message: string }): unknown
}

declare module 'ws/protocol' {
  export interface WSMessage {
    type: string
    [key: string]: unknown
  }

  export interface RpcMessage extends WSMessage {
    id: string
    method: string
    params?: unknown[]
  }
}

declare module 'ws/contracts' {
  export interface UserEvents {
    // Define user events here
    [key: string]: (...args: any[]) => void
  }
}
