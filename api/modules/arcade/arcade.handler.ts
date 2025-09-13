import { EventEmitter } from 'events'
import db from '#/db'
import type { WebSocketData } from '#/modules/websocket/websocket.handler'
import type { ServerWebSocket } from 'bun'
import { createArcadeServer } from './arcade'
import { System } from './arcade.system'
import { Utils } from './arcade.utils'

/**
 * SpaceCat WebSocket connection instance
 */
// interface SpaceCatConnection {
//   game: ReturnType<typeof createSpaceCatGame>;
//   gameSessionId: string;
//   isInitialized: boolean;
// }

/**
 * Map to store active SpaceCat connections per user
 */
// const spaceCatConnections = new Map<string, SpaceCatConnection>();
const arcade = createArcadeServer()
/**
 * SpaceCat WebSocket Handler
 */
export const arcadeHandler = {
  /**
   * Handle WebSocket connection open
   */
  async open(ws: ServerWebSocket<WebSocketData>) {
    const { user, gameSession } = ws.data

    if (!user || !gameSession) {
      console.error('[SpaceCat] Missing user or game session data')
      ws.close(1008, 'Missing user or game session data')
      return
    }

    // const gameSessionId = gameSession.id;s

    try {
      // Create event emitter with WebSocket integration
      const emitter = new EventEmitter()
      emitter.on('outcomingMessage', (data: any) => {
        ws.send(data)
      })
      emitter.on('CloseSocket', () => {
        ws.close(1000, 'Game requested close')
      })

      // Create utility functions
      const utils = new Utils()
      console.log('user ', user)
      console.log('gameSession ', gameSession)
      // Create system instance
      const system = new System(db, user, gameSession, emitter, utils, user.id, 'fish')
      system.setGameName(gameSession.gameId as string)
      system.setAuthenticatedUser(user.id, user.username, user.activeOperatorId!)

      // Utility functions object
      // const utilsObj = {
      //   RandomInt: (min: number, max: number) => utils.RandomInt(min, max),
      //   ShuffleArray: <T>(arr: T[]) => utils.ShuffleArray(arr),
      //   EncodeMessage: (msg: string) => utils.EncodeMessage(msg),
      //   DecodeMessage: (msg: ArrayBufferLike) => utils.DecodeMessage(msg),
      //   DecimalToHex: utils.DecimalToHex.bind(utils),
      //   HexToDecimal: utils.HexToDecimal.bind(utils),
      // };

      // Create SpaceCat game instance
      // const game = createSpaceCatGame(
      //   emitter,
      //   system,
      //   utilsObj,
      //   gameSessionId,
      //   user.id
      // );

      // const connection: SpaceCatConnection = {
      //   game,
      //   gameSessionId,
      //   isInitialized: false,
      // };

      // spaceCatConnections.set(user.id, connection);

      // Subscribe to SpaceCat topic
      ws.subscribe('spacecat')

      // Initialize game
      // game.initialize().then(() => {
      //   connection.isInitialized = true;
      //   console.log(`[SpaceCat] Game initialized for user ${user.username}`);

      //   // Send welcome message
      //   // ws.send(JSON.stringify({
      //   //   kind: 'game-result',
      //   //   type: 'game_ready',
      //   //   payload: { status: 'ready' }
      //   // }) as any);
      // }).catch((error) => {
      //   console.error('[SpaceCat] Game initialization error:', error);
      //   ws.close(1011, 'Game initialization failed');
      // });

      await arcade.handleConnection(ws)

      console.log(`[SpaceCat] Connection established for user ${user.username}`)
    } catch (error) {
      console.error('[SpaceCat] Error in open handler:', error)
      ws.close(1011, 'Internal server error')
    }
  },

  /**
   * Handle incoming WebSocket messages
   */
  message(ws: ServerWebSocket<WebSocketData>, message: string | Buffer) {
    // const { user } = ws.data;
    return arcade.handleMessage(ws, message)
    // if (!user) {
    //   console.error('[SpaceCat] No user in message handler');
    //   return;
    // }

    // const connection = spaceCatConnections.get(user.id);
    // if (!connection || !connection.isInitialized) {
    //   console.error('[SpaceCat] Game not initialized');
    //   // ws.send(JSON.stringify({
    //   //   kind: 'error',
    //   //   payload: { message: 'Game not initialized' }
    //   // }) as any);
    //   connection?.game.msgHandlerStack.push(message as any);
    //   return;
    // }

    // try {
    //   // Parse message
    //   let parsed: SpaceCatMessage;
    //   let rawMessage = typeof message === 'string' ? message : new TextDecoder().decode(message as Buffer);
    //   const utils = new Utils()
    //     // rawMessage = rawMessage.substring(1);
    //     if(rawMessage.includes('js-websocket')){
    //       const response = utils.EncodeMessage('...#{"code":200,"sys":{"heartbeat":30}}');
    //             const responseView = new Int8Array(response);
    //             responseView[0] = 1;
    //             ws?.send(response);
    //             return;
    //     }
    //   try {
    //       const tmp_r = utils.DecodeMessage(message as any).split(": ::");
    //           console.log(tmp_r)
    //         if (tmp_r[1] !== undefined) {
    //             rawMessage = tmp_r[1];
    //           console.log(rawMessage)
    //         }else{
    //            rawMessage = message.split(":::")[1]
    //           console.log(rawMessage)
    //         }
    //     parsed = JSON.parse(rawMessage);
    //   } catch (parseError) {
    //     console.error('[SpaceCat] Invalid JSON message:', rawMessage);
    //     ws.send(JSON.stringify({
    //       kind: 'error',
    //       payload: { message: 'Invalid JSON' }
    //     }) as any);
    //     return;
    //   }

    //   // Handle ping messages
    //   if (parsed.kind === 'ping') {
    //     ws.send(JSON.stringify({
    //       kind: 'pong',
    //       id: parsed.id,
    //     }) as any);
    //     return;
    //   }

    //   // Handle RPC messages
    //   if (parsed.kind === 'rpc' && parsed.topic === 'spacecat') {
    //     // handleSpaceCatRpc(ws, parsed as any).catch((error) => {
    //     //   console.error('[SpaceCat] RPC error:', error);
    //     //   ws.send(JSON.stringify({
    //     //     kind: 'error',
    //     //     payload: { message: error.message }
    //     //   }) as any);
    //     // });
    //     return;
    //   }

    //   // Handle game action messages
    //   if (parsed.kind === 'game-action') {
    //     handleGameAction(ws, parsed as any).catch((error) => {
    //       console.error('[SpaceCat] Game action error:', error);
    //       ws.send(JSON.stringify({
    //         kind: 'error',
    //         payload: { message: error.message }
    //       }) as any);
    //     });
    //     return;
    //   }

    //   // Fallback - try to handle as legacy message
    //   handleLegacyMessage(ws, rawMessage).catch((error) => {
    //     console.error('[SpaceCat] Legacy message error:', error);
    //   });

    // } catch (error: any) {
    //   console.error('[SpaceCat] Message handling error:', error);
    //   ws.send(JSON.stringify({
    //     kind: 'error',
    //     payload: { message: error.message || 'Internal server error' }
    //   }) as any);
    // }
  },

  /**
   * Handle WebSocket connection close
   */
  close(ws: ServerWebSocket<WebSocketData>, code: number, reason: string) {
    const { user } = ws.data

    if (user) {
      // const connection = spaceCatConnections.get(user.id);
      // if (connection) {
      //   console.log(`[SpaceCat] Cleaning up connection for user ${user.username}`);
      // Dispose game instance
      // connection.game.dispose();
      // Remove from connections map
      // spaceCatConnections.delete(user.id);
      // Log disconnection for auditing
      // SpaceCatService.logMessage(
      //   'ws_connection',
      //   user.id,
      //   connection.gameSessionId,
      //   'out',
      //   'disconnect',
      //   { code, reason }
      // ).catch(console.error);
      // }
    }
  },
}

/**
 * Handle RPC calls for SpaceCat topic
 */
//  function handleSpaceCatRpc(ws: ServerWebSocket<WebSocketData>, rpc: SpaceCatMessage & { id?: string }) {
//   const { user } = ws.data;
//   if (!user) return;

//   const connection = spaceCatConnections.get(user.id);
//   if (!connection) return;

//   // For now, handle basic commands
//   try {
//     const result = { status: 'ok' };

//     ws.send(JSON.stringify({
//       kind: 'rpc',
//       id: rpc.id,
//       payload: result,
//     }) as any);
//   } catch (error: any) {
//     ws.send(JSON.stringify({
//       kind: 'error',
//       id: rpc.id,
//       payload: { message: error.message },
//     }) as any);
//     throw error;

//   }
// }

/**
 * Handle game action messages
 */
// async function handleGameAction(ws: ServerWebSocket<WebSocketData>, message: SpaceCatMessage) {
//   const { user } = ws.data;
//   if (!user) return;

//   const connection = spaceCatConnections.get(user.id);
//   if (!connection) return;

//   try {
//     // Create game message format from WebSocket message
//     const gameMessage: GameMessage = {
//       action: (message.payload as any)?.action || '',
//       query: (message.payload as any)?.query || {},
//       messageView: (message.payload as any)?.messageView || [4, 0, 0, 0, 4, 1],
//       data: message.payload as any,
//     };

//     // Handle the message through the game instance
//     await connection.game.incomingDataHandler(gameMessage);

//   } catch (error: any) {
//     console.error('[SpaceCat] Game action error:', error);
//     throw error;
//   }
// }

/**
 * Handle legacy message format (for backwards compatibility)
 */
// async function handleLegacyMessage(ws: ServerWebSocket<WebSocketData>, message: string) {
//   const { user } = ws.data;
//   if (!user) return;

//   const connection = spaceCatConnections.get(user.id);
//   if (!connection) return;

//   try {
//     // Parse legacy format if needed
//     let action = message;
//     let query = {};
//     let messageView = [4, 0, 0, 0, 4, 1];

//     // Try to parse as JSON
//     try {
//       const parsed = JSON.parse(message);
//       if (parsed.action) {
//         action = parsed.action;
//         query = parsed.query || {};
//         messageView = parsed.messageView || messageView;
//       }
//     } catch {
//       // Assume raw action string
//     }

//     const gameMessage: GameMessage = {
//       action,
//       query,
//       messageView,
//       data: {},
//     };

//     await connection.game.incomingDataHandler(gameMessage);

//   } catch (error: any) {
//     console.error('[SpaceCat] Legacy message error:', error);
//     throw error;
//   }
// }

/**
 * Get connection stats for monitoring
 */
export function getSpaceCatStats() {
  return {
    // activeConnections: spaceCatConnections.size,
    // connections: Array.from(spaceCatConnections.entries()).map(([userId, conn]) => ({
    //   userId,
    //   gameSessionId: conn.gameSessionId,
    //   isInitialized: conn.isInitialized,
    // })),
  }
}

/**
 * Force cleanup of inactive connections
 */
export async function cleanupInactiveConnections() {
  // const now = Date.now();
  // const maxInactiveTime = 5 * 60 * 1000; // 5 minutes
  // for (const [userId, connection] of spaceCatConnections.entries()) {
  //   // Check if game data needs cleanup (this would need actual implementation)
  //   // For now, just clean up old connections that might have stale data
  //   try {
  //     await SpaceCatService.cleanupExpiredEntities(connection.gameSessionId);
  //   } catch (error) {
  //     console.error(`[SpaceCat] Error cleaning up ${userId}:`, error);
  //   }
  // }
}
