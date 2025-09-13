import { EventEmitter } from 'events'
import db from '#/db'
import { SessionManager } from '#/lib/session.manager'
import type { ServerWebSocket } from 'bun'
import { GameSession as DbGameSession, User } from '~/types'
import { WebSocketData } from '../websocket/websocket.handler'
import { System as _System } from './arcade.system'
import { Utils } from './arcade.utils'

// Types
interface WsData {
  pathname: string
  player: ArcadePlayer
  gameName?: string
}

interface GameSession {
  id: string
  playerId: string
  gameName: string
  startTime: number
  lastActivity: number
  state: any
  stats: {
    totalWagered: number
    totalWon: number
    totalRounds: number
  }
}
interface IIncomingData {
  action: string
  query?: any
  messageView: Int8Array
}

interface GameController {
  IncomingDataHandler(message: IIncomingData): Promise<void>
  destroy(): void
}

// Configuration
const ARCADE_CONFIG = {
  SESSION_TIMEOUT: 5 * 60 * 1000, // 5 minutes
  SESSION_CLEANUP_INTERVAL: 60 * 1000, // 1 minute
  MAX_PLAYERS: 1000,
}

// Load config from file if available
// let arcadeConfig: any = {};
try {
  // arcadeConfig = await Bun.file('./public/arcade_config.json').json();
} catch (e) {
  console.warn('Using default config - arcade_config.json not found or error reading it.')
}

export class Arcade {
  private players: Map<string, ArcadePlayer> = new Map()
  private sessions: Map<string, GameSession> = new Map()
  private activeConnections: Set<string> = new Set()
  private cleanupInterval!: NodeJS.Timeout
  private server: any

  constructor() {
    // this.initializeServer();
    this.startSessionCleanup()
  }

  // private  initializeServer(): Promise<void> {
  //     this.server = Bun.serve<WsData, {}>({
  //         port: this.port,
  //         fetch: async (req, server) => {
  //             if (this.activeConnections.size >= ARCADE_CONFIG.MAX_PLAYERS) {
  //                 return new Response('Server at capacity', { status: 503 });
  //             }
  //             const url = new URL(req.url);
  //             let token = url.searchParams.get('token') || url.searchParams.get('sessionId');
  //             // console.log('connection started ...', token)
  //             if (token) {
  //                 req.headers.set('Authorization', `Bearer ${token}`);
  //             }

  //             const authSession = await authenticateWebSocket(req, server);

  //             if (!authSession || !authSession.data?.userId) {
  //                 return new Response('Unauthorized', { status: 401 });
  //             }
  //             const playerId = authSession.data.userId;
  //             let gameName = url.searchParams.get('g')
  //             if (gameName == null) {
  //                 gameName = ''
  //             }
  //             console.log(gameName)
  //             console.log('connection started ...', authSession, ' ', gameName)

  //             const success = server.upgrade(req, {
  //                 data: {
  //                     pathname: url.pathname,
  //                     gameName,
  //                     player: this.getOrCreatePlayer(playerId, server, gameName)
  //                 }
  //             });

  //             return success ? undefined : new Response('WebSocket upgrade failed', { status: 400 });
  //         },
  //         websocket: {
  //             open: (ws) => this.handleConnection(ws),
  //             message: (ws, message) => this.handleMessage(ws, message),
  //             close: (ws) => this.handleDisconnect(ws)
  //         }
  //     });

  //     console.log(`Arcade server running on port ${this.port}`);
  // }

  public getOrCreatePlayer(
    user: User,
    gameSession: DbGameSession,
    playerId: string,
    server: any,
    gameName?: string,
  ): ArcadePlayer {
    let player = this.players.get(playerId)
    if (!player) {
      const emitter = new EventEmitter()
      const utils = new Utils()
      // const system = new _System(emitter, utils, playerId,);
      const system = new _System(db, user, gameSession, emitter, utils, playerId, 'slots')

      player = new ArcadePlayer(playerId, emitter, system, utils, gameName)
      this.players.set(playerId, player)
    } else {
      player.MessageId = 0
    }
    return player
  }

  public async handleConnection(ws: ServerWebSocket<WebSocketData>): Promise<void> {
    const { user, gameSession } = ws.data as { user: User; gameSession: DbGameSession }
    const player = this.getOrCreatePlayer(user, gameSession, user.id, ws, gameSession.gameId as string)
    this.activeConnections.add(player.id)

    try {
      await player.initialize(ws, user)
      console.log(`Player ${user.id} connected`)
    } catch (error) {
      console.error(`Connection error for player ${user.id}:`, error)
      ws.close(1011, 'Failed to initialize player')
    }
  }

  public async handleMessage(ws: ServerWebSocket<WebSocketData>, message: string | Buffer): Promise<void> {
    try {
      const { user, gameSession } = ws.data as { user: User; gameSession: DbGameSession }
      const player = this.players.get(user.id)
      if (!player) {
        return
      }
      if (gameSession.gameId?.includes('CQ9')) {
        await player.handleMessageArcade(message)
      } else {
        await player.handleMessage(message)
      }
    } catch (error) {
      console.error(`Message handling error for player ${ws.data.user.id}:`, error)
    }
  }

  public handleDisconnect(ws: ServerWebSocket<WsData>): void {
    const { player } = ws.data
    this.activeConnections.delete(player.id)
    player.markDisconnected()
    console.log(`Player ${player.id} disconnected`)
  }

  private startSessionCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now()
      const timeout = ARCADE_CONFIG.SESSION_TIMEOUT

      for (const [sessionId, session] of this.sessions) {
        if (now - session.lastActivity > timeout) {
          this.endSession(sessionId, 'inactivity')
        }
      }
    }, ARCADE_CONFIG.SESSION_CLEANUP_INTERVAL)
  }

  public async endSession(sessionId: string, reason: string = 'normal'): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return
    }

    const player = this.players.get(session.playerId)
    if (player) {
      await player.endSession(sessionId, reason)
    }

    this.sessions.delete(sessionId)
    console.log(`Session ${sessionId} ended (reason: ${reason})`)
  }

  public async shutdown(): Promise<void> {
    clearInterval(this.cleanupInterval)
    for (const sessionId of this.sessions.keys()) {
      await this.endSession(sessionId, 'server_shutdown')
    }
    this.server.stop()
    console.log('Arcade server stopped')
  }
}

class ArcadePlayer {
  public id: string
  private ws: ServerWebSocket<WebSocketData> | null = null
  private activeSession: GameSession | null = null
  private gameController: GameController | null = null
  private pendingMessages: any[] = []
  private messagesBeforeLogin: any[] = []
  private isConnected = false
  public modUtils: Utils
  public MessageId = 0
  private gameName: string = ''

  constructor(
    id: string,
    public emitter: EventEmitter,
    public system: _System,
    public utils: Utils,
    gameName?: string,
  ) {
    this.id = id
    this.modUtils = new Utils()
    this.setupEventListeners()
    this.gameName = gameName || ''
  }

  private setupEventListeners(): void {
    this.emitter.on('outgoingMessage', (message) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(message)
      }
    })
    this.emitter.on('outcomingMessage', (message) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(message)
      }
    })
    this.emitter.on('sessionEnded', (sessionId: string, reason: string) => {
      if (this.activeSession?.id === sessionId) {
        this.activeSession = null
        this.gameController?.destroy()
        this.gameController = null
        console.log(`Session ${sessionId} ended for player ${this.id} (${reason})`)
      }
    })

    this.emitter.on('CloseSocket', () => {
      this.ws?.close(1000, 'Session invalidated')
    })
  }

  public async initialize(ws: ServerWebSocket<WebSocketData>, userx: any): Promise<void> {
    this.ws = ws
    this.isConnected = true
    const { user } = ws.data
    // const userProfile = await prisma.userProfile.findUnique({ where: { id: this.id } });
    if (user && user.activeWallet!.operatorId) {
      await this.system.setAuthenticatedUser(this.id, user.username, user.activeWallet!.operatorId)
    } else {
      throw new Error('User profile or operatorId not found.')
    }

    while (this.pendingMessages.length > 0) {
      const message = this.pendingMessages.shift()
      await this.handleMessage(message)
    }
  }

  public markDisconnected(): void {
    this.isConnected = false
    this.system.ClearTicker()
  }

  public async handleMessageArcade(message: any): Promise<void> {
    // console.log('arcade style baby ', this.MessageId)
    if (!this.isConnected) {
      this.pendingMessages.push(message)
      return
    }
    // console.log(message)
    try {
      // console.log(this.modUtils.DecodeMessage(message))
      const tmp_r = this.modUtils.DecodeMessage(message).split(': ::')
      if (tmp_r[1] !== undefined) {
        message = tmp_r[1]
      }
      // console.log(message)
    } catch (er) {
      console.log('000', er)
    }
    let incomingMess
    try {
      // console.log('try 00 ',message);

      incomingMess = JSON.parse(message.split(':::')[1])
      //   var incomingCookie = _self.modUtils.CookieParse(incomingMess.cookie);
    } catch (er) {
      try {
        // console.log('try 0 ',er);

        incomingMess = JSON.parse(message)
        // var incomingCookie = _self.modUtils.CookieParse(incomingMess.cookie);
      } catch (er) {
        try {
          // console.log('try 1');
          const msg = this.modUtils.DecodeMessage(message)
          incomingMess = JSON.parse(msg)
          //   var incomingCookie = _self.modUtils.CookieParse(incomingMess.cookie);
        } catch (er) {
          try {
            // console.log('try 2');
            const msg = this.modUtils.DecodeMessage(message)
            incomingMess = JSON.parse(msg.split(':::')[1])
            // var incomingCookie = _self.modUtils.CookieParse(
            //   incomingMess.cookie
            // );
            incomingMess.fullRequest = message
            // _self.gameName = incomingMess.gameName;
            // _self.session = incomingCookie["laravel_session"];
          } catch (er) {
            // console.log('try 3');

            //if(_self.gameName=='OceanKing2MN' || _self.gameName=='LuckyFishingCQ9'){

            incomingMess = { fullRequest: message }
            //	_self.emitter.emit('IncomingMessage',incomingMess);
            //}else{

            //_self.emitter.emit('Error','MessageParseError');

            //}
          }
        }
      }
    }
    if (this.gameController == null && this.messagesBeforeLogin.length > 0) {
      this.messagesBeforeLogin.push(incomingMess)
      return
    }
    if (this.gameController == null) {
      const { gameName, sessionId } = incomingMess
      this.messagesBeforeLogin.push(incomingMess)
      this.system.setGameName(gameName)
      if (this.activeSession) {
        await this.endSession(this.activeSession.id, 'new_session')
      }

      try {
        const { createGameController } = await import(`./games/arcade/${this.gameName}/${this.gameName}.ts`)
        this.gameController = createGameController(this.emitter, this.system, this.utils, this.gameName)

        if (!this.gameController) {
          throw new Error('Game controller could not be created.')
        }

        this.activeSession = {
          id: sessionId || crypto.randomUUID(),
          playerId: this.id,
          gameName: this.gameName,
          startTime: Date.now(),
          lastActivity: Date.now(),
          state: {},
          stats: { totalWagered: 0, totalWon: 0, totalRounds: 0 },
        }

        // await this.gameController.IncomingDataHandler(initData);
        const frcCount = this.messagesBeforeLogin.length

        for (let frc = 0; frc < frcCount; frc++) {
          const sM = this.messagesBeforeLogin.shift()
          await this.gameController.IncomingDataHandler(sM)
        }
        console.log(`Session ${this.activeSession.id} started for player ${this.id}`)
      } catch (error) {
        console.error('Session initialization failed:', error)
        this.sendError('init_failed', 'Failed to initialize game session')
        this.activeSession = null
        this.gameController = null
      }
    } else {
      await this.gameController.IncomingDataHandler(incomingMess)
    }
    console.log('fuck')
  }

  public async handleMessage(message: any): Promise<void> {
    if (!this.isConnected) {
      this.pendingMessages.push(message)
      return
    }

    try {
      const messageBuffer = message instanceof Buffer ? message : Buffer.from(message)
      const msgStr = this.modUtils.DecodeMessage(messageBuffer as any)
      const messageView = new Int8Array(messageBuffer.buffer, messageBuffer.byteOffset, messageBuffer.byteLength)
      if (msgStr.length === 4 && messageView[1] === 0 && messageView[2] === 0 && messageView[3] === 0) {
        const response = new ArrayBuffer(4)
        const bufView = new Int8Array(response)
        bufView[0] = 3
        this.ws?.send(response)
        this.MessageId++
        return
      }

      if (this.MessageId === 0) {
        const response = this.modUtils.EncodeMessage('...#{"code":200,"sys":{"heartbeat":30}}')
        // const responseView = new Int8Array(response);
        // responseView[0] = 1;
        const responseView = new Int8Array(response)
        responseView[0] = 1
        responseView[1] = 0
        responseView[2] = 0
        this.ws?.send(response)
        this.MessageId++
        return
      }

      const wf = msgStr.indexOf('{"')
      const actionStr = wf !== -1 ? msgStr.substring(0, wf) : msgStr
      const cMsg = wf !== -1 ? msgStr.substring(wf) : '{}'

      const incomingMess = JSON.parse(cMsg)
      // eslint-disable-next-line no-control-regex
      const _action = actionStr.replace(/[\x00-\x1F\x80-\xFF]/g, '').trim()
      const actionStack = _action.split('.').filter(Boolean)

      if (actionStack.length >= 2) {
        incomingMess.action = `${actionStack[actionStack.length - 2]}.${actionStack[actionStack.length - 1]}`
      } else {
        incomingMess.action = _action
      }

      if (incomingMess.gameName) {
        this.gameName = incomingMess.gameName
      }

      if (incomingMess.action.includes('twLogin')) {
        if (this.system.userId) {
          await this.initializeSession(incomingMess)
        } else {
          this.sendError('auth_required', 'Authentication is required before login.')
        }
      } else if (this.gameController) {
        await this.gameController.IncomingDataHandler(incomingMess)
        this.updateSessionActivity()
      } else {
        if (this.gameName.includes('CQ9')) {
          await this.initializeSession(incomingMess)
        }
        this.sendError('no_game_controller', 'Game controller is not initialized.')
      }
    } catch (error) {
      console.error('Error processing message:', error)
      this.sendError('invalid_message', 'Failed to process message')
    }
  }
  private async initializeSession(initData: any): Promise<void> {
    const { gameName, sessionId } = initData
    this.system.setGameName(gameName)
    if (this.activeSession) {
      await this.endSession(this.activeSession.id, 'new_session')
    }

    try {
      // const { createGameController } = await import(`./${this.gameName.toLowerCase().replace('ka', '')}/${this.gameName.toLowerCase().replace('ka', '')}.game.ts`);
      const { createGameController } = await import(`./${this.gameName}.ts`)
      this.gameController = createGameController(this.emitter, this.system, this.utils, this.gameName)

      if (!this.gameController) {
        throw new Error('Game controller could not be created.')
      }

      this.activeSession = {
        id: sessionId || crypto.randomUUID(),
        playerId: this.id,
        gameName: this.gameName,
        startTime: Date.now(),
        lastActivity: Date.now(),
        state: {},
        stats: { totalWagered: 0, totalWon: 0, totalRounds: 0 },
      }

      await this.gameController.IncomingDataHandler(initData)
      console.log(`Session ${this.activeSession.id} started for player ${this.id}`)
    } catch (error) {
      console.error('Session initialization failed:', error)
      this.sendError('init_failed', 'Failed to initialize game session')
      this.activeSession = null
      this.gameController = null
    }
  }

  public async endSession(sessionId: string, reason: string): Promise<void> {
    if (this.activeSession?.id !== sessionId) {
      return
    }

    try {
      const session = this.activeSession
      const duration = (Date.now() - session.startTime) / 1000
      const rtp = session.stats.totalWagered > 0 ? (session.stats.totalWon / session.stats.totalWagered) * 100 : 0

      console.log(`Session ${sessionId} statistics:`, {
        playerId: this.id,
        duration: `${duration.toFixed(2)}s`,
        totalRounds: session.stats.totalRounds,
        totalWagered: session.stats.totalWagered,
        totalWon: session.stats.totalWon,
        rtp: `${rtp.toFixed(2)}%`,
        endReason: reason,
      })
      await SessionManager.endCurrentGameSession(this.ws?.data.user.id as string)
      this.gameController?.destroy()
      this.gameController = null
      this.activeSession = null
      this.emitter.emit('sessionEnded', sessionId, reason)
    } catch (error) {
      console.error('Error ending session:', error)
    }
  }

  private updateSessionActivity(): void {
    if (this.activeSession) {
      this.activeSession.lastActivity = Date.now()
    }
  }

  private sendError(code: string, message: string): void {
    this.emitter.emit(
      'outgoingMessage',
      JSON.stringify({
        responseEvent: 'error',
        responseType: code,
        serverResponse: message,
      }),
    )
  }
}

export function createArcadeServer(): Arcade {
  return new Arcade()
}
/*
'{"req_id":0,"route":"fish.bet","data":{"ClientData":"{\"x\":1856,\"y\":854,\"betButtonIndex\":0,\"isMobile\":false}","PlayerBetMultiples":[1]}}
*/
