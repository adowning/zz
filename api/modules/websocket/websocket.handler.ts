import type { ServerWebSocket } from 'bun'
import type { Buffer } from 'node:buffer'

import type { AuthSessionType, GameSessionType, UserType, VipInfoType, WalletType } from '#/db/'

// Import topic handlers
import { chatHandler } from '../common/chat.handler'
import { notificationsHandler } from '../common/notifications.handler'
import { userHandler } from '../user/user.handler'
import { blackjackHandler } from '../blackjack/blackjack.handler' 

// RPC helpers and contracts
import { rpcResultEnvelope, rpcErrorEnvelope } from '~/envelope'
import type { WSMessage, RpcMessage } from '~/protocol'
import type { UserEvents } from '~/contracts'
import { eq } from 'drizzle-orm'
import db from '#/db'
import chalk from 'chalk'
import { vipInfos, wallets } from '#/db/'
import { proxyHandler } from '#/modules/nolimit/nolimit.proxy'

// Define a map of topic names to their handlers
export const topicHandlers = {
  chat: chatHandler,
  notifications: notificationsHandler,
  user: userHandler,
  blackjack: blackjackHandler, // Add the blackjack handler
  proxy: proxyHandler,
}

// Define an interface for the data attached to the WebSocket
export interface WebSocketData {
  user: UserType;
  wallet: WalletType;
  vipInfo: VipInfoType;
  backendSocket?: WebSocket;
  messageQueue: (string | Uint8Array)[];
  nolimitSessionKey?: string;
  authSession: AuthSessionType;
  gameSession: GameSessionType;
  topic: keyof typeof topicHandlers; // The topic for this connection
}

export const websocketHandler = {
  open(ws: ServerWebSocket<WebSocketData>) {
    const { topic, nolimitSessionKey } = ws.data
    ws.data.messageQueue = []
    if (nolimitSessionKey) {
      ws.data.nolimitSessionKey = nolimitSessionKey
    }

    if (topicHandlers[topic]) {
      topicHandlers[topic].open(ws)
      // if (topic === 'user') {
      //   topicHandlers.chat.open(ws)
      //   topicHandlers.notifications.open(ws)
      // }
    } else {
      console.error(`No handler for topic: ${topic}`)
      ws.close(1011, 'Invalid topic')
    }
  },

  message(ws: ServerWebSocket<WebSocketData>, message: string | Buffer):void {
    const { topic,  } = ws.data

    if (topic === 'proxy') {
     const {  backendSocket, messageQueue } = ws.data

      if (backendSocket?.readyState === WebSocket.CONNECTING) {
        console.log(chalk.blue(`[QUEUE ➡️] Message queued as backend is not ready.`))
        messageQueue.push(message)
      }
    }

    // Try to parse as a structured WSMessage for RPC support; fallback to legacy handler on failure.
    let parsed: WSMessage | null = null
    if (typeof message === 'string') {
      try {
        parsed = JSON.parse(message)
      } catch {
        parsed = null
      }
    } else {
      try {
        parsed = JSON.parse(new TextDecoder().decode(message as Buffer))
      } catch {
        parsed = null
      }
    }


    if (parsed && parsed.kind === 'ping' ) {
      console.log(topic)
       ws.send(JSON.stringify({ type: 'PONG' }))
       return
    }

    // Handle RPC messages for the 'user' topic
    if (parsed && parsed.kind === 'rpc' && topic === 'user') {
      // Limit the RPC method key type to string to satisfy constraint and match actual usage
      const rpc = parsed as RpcMessage<'user', string, any>
      void handleUserRpc(ws, rpc)
      return
    }

    // Default to existing topic handlers for non-RPC or other topics
    if (topicHandlers[topic]) {
      // if (topic === 'user') {

      //   const m = JSON.parse(message as string);
      //   console.log(m);
      //   if (m.type === 'PING' || m.kind === 'ping') {
      //      ws.send(JSON.stringify({ type: 'PONG' }))
      //   };
      //   // only message on user topic will be a chat message from clients
      //   (topicHandlers.chat.message as unknown as (ws: ServerWebSocket<WebSocketData>, message: string | Buffer) => void)(
      //     ws,
      //     message as any,
      //   )
      // } else {
        (topicHandlers[topic].message as unknown as (ws: ServerWebSocket<WebSocketData>, message: string | Buffer) => void)(
          ws,
          message as any,
        )
      // }
      // Some topic handlers (e.g., uWebSocket-based) may expect an extended WS type that carries
      // additional context (like an id). Our ws is a Bun ServerWebSocket<WebSocketData> which
      // is structurally compatible for our usage. We pass it through with a constrained cast to
      // avoid widening the type surface while keeping runtime behavior unchanged.
    }
  },

  close(ws: ServerWebSocket<WebSocketData>, code: number, reason: string) {
    const { topic } = ws.data
    if (topicHandlers[topic]) {
      // Pass all arguments to the topic handler's close method
      (topicHandlers[topic].close as any)(ws, code, reason)
    }
  },
}

/**
 * Handle RPC methods under the 'user' topic.
 * Currently supports:
 * - method: 'user.get' -> returns a snapshot of wallet + vipInfo for the current user
 */
async function handleUserRpc(
  ws: ServerWebSocket<WebSocketData>,
  rpc: RpcMessage<'user', string, any>,
) {
  const { id, method } = rpc
  const { user } = ws.data

  try {
    switch (method) {
      case 'user.get': {
        const walletRow = await db.query.wallets.findFirst({
          where: eq(wallets.userId, user.id),
        })
        const vipRow = await db.query.vipInfos.findFirst({
          where: eq(vipInfos.userId, user.id),
        })

        const result: UserEvents['user.snapshot'] = {
          userId: user.id,
          user: {
            id: user.id,
            username: user.username,
          } as Record<string, unknown>,
          wallet: walletRow ? { balance: walletRow.balance } : undefined,
          vipInfo: vipRow
            ? {
              level: vipRow.level,
              xp: vipRow.xp,
              totalXp: vipRow.totalXp,
            }
            : undefined,
          ts: Date.now(),
        }

        const envelope = rpcResultEnvelope(id, result)
        ws.send(JSON.stringify(envelope))
        return
      }
      default: {
        const err = rpcErrorEnvelope(id, {
          code: 'METHOD_NOT_FOUND',
          message: `Unknown RPC method '${method}' for topic 'user'`,
        })
        ws.send(JSON.stringify(err))
      }
    }
  } catch (error: any) {
    const err = rpcErrorEnvelope(id, {
      code: 'INTERNAL_ERROR',
      message: error?.message ?? 'Unhandled RPC error',
    })
    ws.send(JSON.stringify(err))
  }
}
