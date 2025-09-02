import { randomUUID } from 'crypto';
import { db } from '../src/db';
import { rtgSpinResults, rtgSettingsResponses } from '../src/db/schema/gameplay';
import { games } from '../src/db/schema/games';
import { and, eq } from 'drizzle-orm';
import chalk from 'chalk';
import * as fs from 'fs';
import { drizzle } from 'drizzle-orm/bun-postgres';
import { Client } from 'bun:postgres';

// --- Database Connection for Deployment ---
const initializeDbClient = () => {
  if (process.env.DATABASE_URL) {
    console.log(chalk.yellow('DATABASE_URL found, connecting to remote database via bun:postgres...'));
    const client = new Client(process.env.DATABASE_URL);
    return drizzle(client);
  }
  console.log(chalk.green('No DATABASE_URL found, using local database connection.'));
  return db;
};

const remoteDb = initializeDbClient();

// --- Structured Logger ---
const LOG_FILE = 'api-scraper.log.json';
fs.writeFileSync(LOG_FILE, ''); // Clear the log file at the start

const logToFile = (level: 'info' | 'error', gameName: string, event: string, data: any = {}) => {
    const logEntry = { timestamp: new Date().toISOString(), level, gameName, event, ...data };
    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry, null, 2) + ',\n');
};

// --- Configuration ---
const GAME_NAMES = [
  'AncientDisco', 'GodsOfTroy', 'Atlantis', 'GonzitasQuest', 'BassBoss', 'HappyApples', 
  'BlazingClusters', 'JingleBells', 'BlobstersClusterbuster', 'LastChanceSaloon', 
  'BloodSuckersMegaWays', 'LeprechaunsMagic', 'BountyRaid2', 'LondonTube', 'BugsysBar', 
  'LuckyEaster', 'CaseClosed', 'MagicGate', 'CashOrNothing', 'MonstersUnchained', 
  'ChristmasMorning', 'NightmareFamilyMegaWays', 'ChristmasMultihops', 'PeggySweets', 
  'CirqueDeLaFortune', 'PersianFortune', 'ClashOfTheBeasts', 'RedDiamond', 'CloverCraze', 
  'ReelKingMega', 'DesertLegendsSpins', 'SantaSpins', 'DiceDiceDice', 'SeaBoatAdventure', 
  'DivineWays', 'DoggyRichesMegaWays', 'SnowWildAndThe7Features', 'DragonsFireMegaWays', 
  'SpookyCarnival', 'DragonsMirror', 'Stage888', 'DynamiteRiches', 'StarsLuck', 'EasyGold', 
  'SteamSquad', 'EmeraldDiamond', 'SugarliciousEveryWay', 'SugarMonster', 
  'FaFaBabies', 'SumoSpins', 'Flodder', 'TheWildHatter', 'FortuneFest', 'TreasureMine', 
  'GemsInfernoMegaWays', 'VaultCrackerMegaWays', 'GetTheGoldInfinireels', 'ViralSpiral', 
  'GetTheGoldInfiniReels', 'WantedWildzExtreme', 'GigaBlast', 'YearRoundRichesClusterbuster', 
  'GodOfWealth'
].filter((value, index, self) => self.indexOf(value) === index);

const API_BASE_URL = 'https://gserver-rtg.redtiger.com/rtg/platform/game';

// --- Helper Functions ---
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getSessionSettings(gameId: string): Promise<any> {
    console.log(chalk.cyan(`Getting session settings for ${gameId}...`));
    const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "token": null, "sessionId": "0", "playMode": "demo", "gameId": gameId,
            "userData": {
                "userId": "demo-user", "hash": "", "affiliate": "", "lang": "en",
                "channel": "I", "userType": "U", "fingerprint": randomUUID()
            },
            "custom": { "siteId": "", "extras": "" }
        })
    });
    if (!response.ok) throw new Error(`Failed to get session settings: ${response.statusText}`);
    const data = await response.json();
    if (!data.result?.user?.token) {
        logToFile('error', gameId, 'GET_SETTINGS_FAILED', { response: data });
        throw new Error('Token not found in settings response.');
    }
    logToFile('info', gameId, 'GET_SETTINGS_SUCCESS');
    console.log(chalk.green(`Successfully got settings for ${gameId}.`));
    return data;
}

async function performApiSpin(gameId: string, token: string, stake: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "token": token, "sessionId": "0", "playMode": "demo", "gameId": gameId,
            "userData": {
                "userId": "demo-user", "hash": "", "affiliate": "", "lang": "en",
                "channel": "I", "userType": "U", "fingerprint": randomUUID()
            },
            "custom": { "siteId": "", "extras": "" },
            "stake": stake, "bonusId": null, "extras": null, "gameMode": 0
        })
    });
    if (!response.ok) throw new Error(`Spin request failed: ${response.statusText}`);
    return response.json();
}

// --- Main Execution ---
async function run() {
  shuffleArray(GAME_NAMES);
  console.log(chalk.blue('Game order randomized.'));

  for (const gameName of GAME_NAMES) {
    console.log(chalk.blue(`\n--- Starting API scraping for: ${gameName} ---`));
    try {
        const gameRecord = await remoteDb.select().from(games).where(eq(games.name, `${gameName}RTG`)).limit(1);
        if (gameRecord.length === 0) {
            throw new Error(`Game "${gameName}RTG" not found in the database.`);
        }
        const gameId = gameRecord[0].id;

        const settings = await getSessionSettings(gameName);
        const { user, game, launcher } = settings.result;
        const token = user.token;
        const stakes = user.stakes.types;

        await remoteDb.insert(rtgSettingsResponses).values({
            gameId: gameId,
            gameName: gameName,
            success: settings.success,
            user_id: user.userId,
            user_token: user.token,
            user_session_id: user.sessionId,
            user_can_gamble: user.canGamble,
            user_country: user.country,
            user_casino: user.casino,
            user_currency_code: user.currency?.code,
            user_currency_symbol: user.currency?.symbol,
            user_server_time: new Date(user.serverTime),
            user_balance_cash: user.balance?.cash,
            user_balance_free_bets: user.balance?.freeBets,
            user_balance_bonus: user.balance?.bonus,
            user_stakes_default_index: user.stakes?.defaultIndex,
            user_stakes_last_index: user.stakes?.lastIndex,
            game_cols: game.cols,
            game_rows: game.rows,
            game_pays_type: game.paysType,
            game_version: game.version,
            game_volatility_index: game.volatilityIndex,
            game_rtp_default: game.rtp?.game?.default,
            game_has_gamble: game.hasGambleGame,
            game_has_feature_buy: game.hasFeatureBuy,
            launcher_version: launcher.version,
            user_bonuses: user.bonuses,
            user_autoplay: user.autoplay,
            game_lines: game.lines,
            game_tiles: game.tiles,
            game_features: game.features,
            game_multiplier_sequence: game.multiplierSequence,
        });
        logToFile('info', gameName, 'SAVE_SETTINGS_SUCCESS');

        console.log(chalk.cyan(`Found ${stakes.length} bet levels. Spinning twice at each...`));
        for (const stake of stakes) {
            const numericStake = parseFloat(stake);
            console.log(chalk.cyan(`--- Spinning at stake: ${numericStake} ---`));
            for (let i = 0; i < 2; i++) {
                const spinResult = await performApiSpin(gameName, token, numericStake);
                const { user: spinUser, game: spinGame } = spinResult.result;

                await remoteDb.insert(rtgSpinResults).values({
                    gameId: gameId,
                    gameName: gameName,
                    success: spinResult.success,
                    userId: spinUser.userId,
                    sessionId: spinUser.sessionId,
                    canGamble: spinUser.canGamble,
                    token: spinUser.token,
                    sessionNetPosition: spinUser.sessionNetPosition,
                    serverTime: new Date(spinUser.serverTime),
                    balance_cash_atStart: spinUser.balance?.atStart?.cash,
                    balance_cash_afterBet: spinUser.balance?.afterBet?.cash,
                    balance_cash_atEnd: spinUser.balance?.atEnd?.cash,
                    balance_freeBets_atStart: spinUser.balance?.atStart?.freeBets,
                    balance_freeBets_afterBet: spinUser.balance?.afterBet?.freeBets,
                    balance_freeBets_atEnd: spinUser.balance?.atEnd?.freeBets,
                    balance_bonus_atStart: spinUser.balance?.atStart?.bonus,
                    balance_bonus_afterBet: spinUser.balance?.afterBet?.bonus,
                    balance_bonus_atEnd: spinUser.balance?.atEnd?.bonus,
                    limits_betThresholdTime: spinUser.limits?.betThresholdTime,
                    bonuses: spinUser.bonuses,
                    tournaments: spinUser.tournaments,
                    vouchers: spinUser.vouchers,
                    messages: spinUser.messages,
                    stake: spinGame.stake,
                    multiplier: spinGame.multiplier,
                    win_total: spinGame.win?.total,
                    winsMultipliers_total: spinGame.winsMultipliers?.total,
                    winsMultipliers_lines: spinGame.winsMultipliers?.lines,
                    spinMode: spinGame.spinMode,
                    hasState: spinGame.hasState,
                    winLines: spinGame.winLines,
                    fatTiles: spinGame.fatTiles,
                    scatters: spinGame.scatters,
                    features: spinGame.features,
                    reelsBuffer: spinGame.reelsBuffer,
                });
                logToFile('info', gameName, 'SPIN_COMPLETE', { spin: i + 1, stake: numericStake });
                console.log(chalk.green(`Spin ${i + 1} at stake ${numericStake} complete.`));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        console.log(chalk.green(`--- Successfully completed API scraping for ${gameName} ---`));

    } catch (error) {
      const errorMessage = (error as Error).message;
      logToFile('error', gameName, 'GAME_FAILED', { error: errorMessage });
      console.error(chalk.red(`An error occurred on game ${gameName}: ${errorMessage}`));
    }
  }

  console.log(chalk.blue('\nAll games processed. DB connection closed. Log file saved.'));
}

run();