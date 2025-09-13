import { pgTable, serial, text, integer, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

/**
 * Arcade Game Types enumeration
 */
export const arcadeGameTypeEnum = [
  'spacecat',
  'goldendragon',
  'bubblepop',
  'fishhunter',
  'swordfish'
] as const;

/**
 * Generic Arcade Ela Fishes table - tracks individual fish instances across all arcade games
 */
export const arcadeFishes = pgTable('arcade_fishes', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  fishType: text('fish_type').notNull(),
  fishId: text('fish_id').notNull(),
  uniqueId: text('unique_id').$defaultFn(() => nanoid()).notNull(),
  payValue: integer('pay_value').default(0).notNull(),
  damageRange: jsonb('damage_range').$type<[number, number]>().notNull(), // [min, max] damage
  fishState: text('fish_state').default('solo').notNull(), // solo, bomb, flock, group
  position: jsonb('position').$type<{x: number, y: number}>(), // Optional position data
  spawnedAt: timestamp('spawned_at', { mode: 'date', precision: 3 }).notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date', precision: 3 }),
  isDestroyed: boolean('is_destroyed').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Generic Arcade Game Data table - tracks game session specific data across all arcade games
 * This replaces game-specific tables like spaceCatGameData
 */
export const arcadeGameData = pgTable('arcade_game_data', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  userId: text('user_id').notNull(),

  // Game state - common fields across arcade games
  bet: integer('bet').default(1).notNull(),
  betCnt: integer('bet_cnt').default(0).notNull(),
  betLevel: integer('bet_level').default(0).notNull(),
  betArr: jsonb('bet_arr').$type<number[]>().notNull(),

  // Game progression - common fields
  currentScene: integer('current_scene').default(0).notNull(),
  waveTime: timestamp('wave_time', { mode: 'date', precision: 3 }),
  waveTimeLimit: integer('wave_time_limit').default(120000).notNull(), // in milliseconds
  isGroupFish: boolean('is_group_fish').default(false).notNull(),
  gamePause: timestamp('game_pause', { mode: 'date', precision: 3 }),

  // Cannon configuration - common across fish arcade games
  cannonLevel: integer('cannon_level').default(0).notNull(),
  cannonCost: integer('cannon_cost').default(1).notNull(),

  // State tracking - extensible for different games
  slotState: text('slot_state').default('').notNull(),
  freeInfo: jsonb('free_info').$type<{count: number, index: number}>().default({count: -1, index: 0}).notNull(),

  // Game-specific data storage - can store additional game-specific fields
  gameSpecificData: jsonb('game_specific_data').$type<Record<string, any>>().default({}).notNull(),

  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Generic Arcade Game Actions table - logs all game actions across arcade games
 */
export const arcadeGameActions = pgTable('arcade_game_actions', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  userId: text('user_id').notNull(),
  action: text('action').notNull(), // 'fire', 'hit', 'change_bet', etc.
  payload: jsonb('payload').notNull(),
  result: jsonb('result'), // Action result data
  betAmount: integer('bet_amount').default(0).notNull(),
  winAmount: integer('win_amount').default(0).notNull(),
  timestamp: timestamp('timestamp', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Generic Arcade Messages table - tracks WebSocket messages for auditing across arcade games
 */
export const arcadeMessages = pgTable('arcade_messages', {
  id: serial('id').primaryKey(),
  connectionId: text('connection_id').notNull(),
  userId: text('user_id').notNull(),
  gameSessionId: text('game_session_id'),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  direction: text('direction').default('in').notNull(), // 'in' or 'out'
  messageType: text('message_type').notNull(), // 'game_action', 'rpc', 'ping', etc.
  payload: jsonb('payload').notNull(),
  timestamp: timestamp('timestamp', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Generic Arcade Active Bullets table - tracks active bullet instances across arcade games
 */
export const arcadeBullets = pgTable('arcade_bullets', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  userId: text('user_id').notNull(),
  bulletId: text('bullet_id').$defaultFn(() => nanoid()).notNull(),
  angle: integer('angle').notNull(),
  lockTargetId: integer('lock_target_id').default(0).notNull(),
  cost: integer('cost').default(1).notNull(),
  cannonLevel: integer('cannon_level').default(0).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date', precision: 3 }), // For cleanup
});

/**
 * Generic Arcade Fish Hit Records table - detailed logs of fish hits across arcade games
 */
export const arcadeFishHits = pgTable('arcade_fish_hits', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  userId: text('user_id').notNull(),
  fishId: text('fish_id').notNull(),
  bulletId: text('bullet_id'),
  fishType: text('fish_type').notNull(),
  winAmount: integer('win_amount').default(0).notNull(),
  betAmount: integer('bet_amount').default(0).notNull(),
  winMultiplier: integer('win_multiplier').default(1).notNull(),
  wasKilled: boolean('was_killed').default(false).notNull(),
  timestamp: timestamp('timestamp', { mode: 'date', precision: 3 }).defaultNow().notNull(),

  // Cascading effects for bomb fishes
  cascadeFishesHit: jsonb('cascade_fishes_hit').$type<string[]>(), // Array of fish IDs hit by cascade
  cascadesTo: text('cascades_to'), // Parent fish ID for cascade tracking

  // RTP calculation
  effectiveRtp: integer('effective_rtp').default(0).notNull(),
});

/**
 * Generic Arcade Game Stats table - aggregated statistics per session across arcade games
 */
export const arcadeGameStats = pgTable('arcade_game_stats', {
  id: serial('id').primaryKey(),
  gameSessionId: text('game_session_id').notNull(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull(),
  userId: text('user_id').notNull(),

  // Aggregated metrics
  totalFishesSpawned: integer('total_fishes_spawned').default(0).notNull(),
  totalFishesKilled: integer('total_fishes_killed').default(0).notNull(),
  totalBulletsFired: integer('total_bullets_fired').default(0).notNull(),
  totalBetAmount: integer('total_bet_amount').default(0).notNull(),
  totalWinAmount: integer('total_win_amount').default(0).notNull(),
  totalSessionTime: integer('total_session_time').default(0).notNull(), // in milliseconds

  // Performance metrics
  effectiveRtp: integer('effective_rtp').default(0).notNull(),
  averageBet: integer('average_bet').default(0).notNull(),

  // Game progression
  highestCannonLevel: integer('highest_cannon_level').default(0).notNull(),
  scenesCompleted: integer('scenes_completed').default(0).notNull(),

  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Arcade Game Configurations table - stores game-specific configurations
 */
export const arcadeGameConfigs = pgTable('arcade_game_configs', {
  id: serial('id').primaryKey(),
  gameType: text('game_type', { enum: arcadeGameTypeEnum }).notNull().unique(),
  config: jsonb('config').$type<{
    defaultWaveTimeLimit: number;
    fishLifetime: number;
    pingInterval: number;
    fishSpawnRange: { min: number; max: number };
    groupFishSpawnRange: { min: number; max: number };
    messageProcessingInterval: number;
    gamePauseDuration: number;
    bombFishTriggerRandomness: { min: number; max: number };
  }>().notNull(),
  payTables: jsonb('pay_tables').$type<{
    fishes: Record<string, number>;
    damageRanges: Record<string, [number, number]>;
  }>().notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).defaultNow().notNull(),
});

/**
 * Legacy compatibility exports - these can be removed once all migrations are complete
 * For now, they provide backwards compatibility with existing code
 */
export const arcadeFishTypes = [
  'Fish_00', 'Fish_01', 'Fish_02', 'Fish_03', 'Fish_04', 'Fish_05',
  'Fish_06', 'Fish_07', 'Fish_08', 'Fish_09', 'Fish_10', 'Fish_11',
  'Fish_12', 'Fish_13', 'Fish_14', 'Fish_15', 'Fish_16', 'Fish_17',
  'Fish_18', 'Fish_19', 'Fish_20', 'Fish_21', 'Fish_22', 'Fish_23',
  'Fish_24', 'Fish_25', 'Fish_26', 'Fish_27'
] as const;

export type ArcadeGameType = typeof arcadeGameTypeEnum[number];
export type ArcadeFishType = typeof arcadeFishTypes[number];

// Index definitions (would be created in migration files)
export const arcadeGameDataIndexes = {
  gameSessionId: 'arcade_game_data_game_session_id_idx',
  gameType: 'arcade_game_data_game_type_idx',
  userId: 'arcade_game_data_user_id_idx',
};

export const arcadeFishesIndexes = {
  gameSessionId: 'arcade_fishes_game_session_id_idx',
  gameType: 'arcade_fishes_game_type_idx',
  isDestroyed: 'arcade_fishes_is_destroyed_idx',
};

export const arcadeBulletsIndexes = {
  gameSessionId: 'arcade_bullets_game_session_id_idx',
  gameType: 'arcade_bullets_game_type_idx',
  expiresAt: 'arcade_bullets_expires_at_idx',
};

export const arcadeFishHitsIndexes = {
  gameSessionId: 'arcade_fish_hits_game_session_id_idx',
  gameType: 'arcade_fish_hits_game_type_idx',
  timestamp: 'arcade_fish_hits_timestamp_idx',
};