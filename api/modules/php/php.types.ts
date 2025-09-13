// import type { Game, GameBank, Jackpot, Shop, UserProfile } from '@prisma/client';

import { Games, Jackpots } from '#/db/zod/modelSchema'
import { UserWithRelations } from '~/types'

/**
 * Defines the expected structure of the JSON response from the PHP
 * game logic engine after it processes a spin.
 */
export interface PhpSpinResponse {
  newBalance: number // The updated balance in coins/credits.
  newBank: number // The updated game bank in currency units.
  totalWin: number // Total win from this spin in coins.
  reels: {
    // The final symbol positions on the reels.
    [key: string]: string[]
  }
  newGameData: Record<string, any> // The updated game session data to be persisted.
  winLines: any[] // Information about any winning lines.
  bonusWin?: number // Winnings from a bonus round.
  totalFreeGames?: number
  currentFreeGames?: number
  freeSpinState?: {
    // Game-specific free spin data.
    monsterHealth?: number
    freeLevel?: number
    // ... any other game-specific bonus fields
  }
  isRespin?: boolean
}

/**
 * Defines the comprehensive state object sent from the TypeScript server
 * to the PHP game logic engine for each request.
 */
export interface PhpGameStateData {
  // The action the PHP engine should perform.
  action: 'spin' | 'init' | 'paytable' | 'initfreespin'

  // The desired outcome of a spin, determined by the TS server's RTP logic.
  // This is only relevant for the 'spin' action.
  desiredWinType: 'win' | 'bonus' | 'none'

  // Data sent from the client, either in the body (for spin) or query string (for init).
  postData: {
    slotEvent?: string
    bet_betlevel?: number
    bet_denomination?: number
    // Include other potential query params from the client
    [key: string]: any
  }

  // Core identifiers and balances.
  playerId: string
  balance: number // In coins/credits, not cents.
  bank: number // In currency units (e.g., dollars).

  // The game-specific session state previously stored in PHP sessions.
  // This is now managed and persisted by the TypeScript server.
  gameData: Record<string, any>

  // Stripped-down objects containing only the data the PHP engine needs.
  user: Partial<UserWithRelations>
  shop: any
  game: Partial<Games> & {
    // Ensuring these potentially complex fields are passed correctly.
    goldsvetData?: any // Assuming this contains legacy settings
  }
  jpgs?: Partial<Jackpots>[]
}

/**
 * Defines the expected structure of the JSON response from the PHP
 * game logic engine after it processes a request.
 */
export interface PhpApiResponse {
  newBalance: number // The updated balance in coins/credits.
  newBank: number // The updated game bank in currency units.
  totalWin: number // Total win from this spin in coins.
  reels: {
    // The final symbol positions on the reels.
    [key: string]: string[]
  }
  newGameData: Record<string, any> // The updated game session data to be persisted.
  winLines: any[] // Information about any winning lines.
  bonusWin?: number // Winnings from a bonus round.
  totalFreeGames?: number
  currentFreeGames?: number
  freeSpinState?: {
    // Game-specific free spin data.
    monsterHealth?: number
    freeLevel?: number
  }
  isRespin?: boolean
  // This field captures the legacy string response some clients might need.
  stringResponse?: string
}
