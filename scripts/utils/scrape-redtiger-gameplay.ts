import { Browser, chromium, Page } from '@playwright/test';
import chalk from 'chalk';
import { and, eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as readline from 'readline';
import { db, pg_client } from '../src/db';
import { gameplay_raw_data, gameplay_spin_results } from '../src/db/schema/gameplay';

// --- Configuration ---
const VIEWPORT = { width: 1200, height: 800 }; // Wider viewport for desktop layout
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

// --- Helper Functions ---

/** Shuffles an array in place. */
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/** Waits for a specific console message from the game. */
async function waitForConsoleMessage(page: Page, text: string, timeout = 20000): Promise<void> {
  return new Promise((resolve, reject) => {
    const handler = (msg: any) => {
      if (msg.text().includes(text)) {
        console.log(chalk.cyan(`Console message received: "${text}"`));
        page.removeListener('console', handler);
        resolve();
      }
    };
    page.on('console', handler);
    setTimeout(() => {
      page.removeListener('console', handler);
      reject(new Error(`Timeout waiting for console message: "${text}"`));
    }, timeout);
  });
}

/** Pauses the script and waits for the user to press Enter in the console. */
const pauseForUser = (rl: readline.Interface) => {
    console.log(chalk.magenta('\nScript paused. You can interact with the browser.'));
    return new Promise<void>(resolve => {
        rl.question(chalk.yellow('Press Enter to continue to the next game...'), () => resolve());
    });
};

/** Performs a single spin sequence. */
async function performSpin(page: Page) {
    console.log(chalk.cyan(`--- Performing Spin ---`));
    try {
        const startButton = page.locator('button:has-text("Start")');
        if (await startButton.isVisible({timeout: 1000})) {
          console.log(chalk.yellow('Bonus round detected! Clicking START.'));
          await startButton.click();
          await waitForConsoleMessage(page, '# ready');
        }
    } catch(e) { /* ignore */ }

    const spinButton = page.locator('.btn-circle-inner-play-button');
    await spinButton.click();
    console.log(chalk.cyan('Spin button clicked.'));

    await waitForConsoleMessage(page, '# ready');
    console.log(chalk.green('Game is ready for next spin.'));
}

/** Main execution function. */
async function run() {
  // --- File Logger Setup ---
  const logStream = fs.createWriteStream('scraper.log', { flags: 'a' });
  const originalLog = console.log;
  const originalError = console.error;
  const stripAnsi = (str: string) => str.replace(/[\u001b\u009b]\[[0-9;]*m/g, '');

  console.log = (...args) => {
    const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    logStream.write(stripAnsi(message) + '\n');
    originalLog.apply(console, args);
  };
  console.error = (...args) => {
    const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    logStream.write('[ERROR] ' + stripAnsi(message) + '\n');
    originalError.apply(console, args);
  };
  // --- End File Logger Setup ---

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const browser = await chromium.launch({
    headless: false,
    devtools: true, // This will open the browser with devtools
    args: ['--window-position=0,0', '--mute-audio']
  });

  process.on('SIGINT', async () => {
    console.log(chalk.red('\nCaught interrupt signal. Shutting down gracefully...'));
    rl.close();
    await browser.close();
    await pg_client.end();
    process.exit(0);
  });

  const gameName = 'GodsOfTroy';
  console.log(chalk.blue(`\n--- Starting game for API analysis: ${gameName} ---`));
  const page = await browser.newPage({ viewport: VIEWPORT });
  page.setDefaultTimeout(15000);
  
  const collectedData: any[] = [];
  page.on('console', msg => {
      const text = msg.text();
      if (!text.startsWith('[bridge]')) {
          // We will let waitForConsoleMessage handle the specific logs we need
      }
  });
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('https://gserver-rtg.redtiger.com/rtg/platform/game/')) {
      try {
        const responseBody = await response.json();
        const requestBody = response.request().postDataJSON();
        const dataType = url.includes('/spin') ? 'spin' : 'settings';
        console.log(chalk.bgBlue(url))
        collectedData.push({ gameName, dataType, requestBody, responseBody });
      } catch (e) {
        console.error(chalk.red(`Error collecting data for ${url}: ${(e as Error).message}`));
      }
    }
  });

  try {
    await page.goto(`https://gserver-rtg.redtiger.com/rtg/launcher/${gameName}`, { waitUntil: 'load' });
    await waitForConsoleMessage(page, '#Game is READY!');
    await page.waitForTimeout(7000);

    const playButtons = page.locator('[class*="play-button"]');
    const count = await playButtons.count();
    let clickedSuccessfully = false;

    console.log(chalk.cyan(`Found ${count} potential play buttons. Trying each one...`));
    for (let z = 0; z < 2; z++) {
      for (let i = 0; i < count; i++) {
          const button = playButtons.nth(i);
          try {
              console.log(chalk.yellow(`Attempting to click button ${i + 1}...`));
              await button.click({ timeout: 4000 });
              
              console.log(chalk.cyan('Play button clicked. Waiting for main game UI to be ready...'));
              await page.locator('.btn-circle-inner-play-button').waitFor({ state: 'visible', timeout: 45000 });

              console.log(chalk.green(`Successfully clicked play button ${i + 1} and game is ready.`));
              clickedSuccessfully = true;
              break; 
          } catch (e) {
              console.log(chalk.gray(`Button ${i + 1} was not the correct one. Trying next...`));
          }
      }
    }

    if (!clickedSuccessfully) {
        throw new Error('Failed to find and click a functional play button.');
    }
    await page.waitForTimeout(4000);

    try {
      await page.locator('[class*="turbo"]').click({ timeout: 1000 });
      console.log(chalk.green('Turbo mode enabled.'));
    } catch (e) {
      console.log(chalk.yellow('Turbo button not found.'));
    }

    try {
      console.log(chalk.cyan('Performing 1 spin to capture network request...'));
      await performSpin(page);
      console.log(chalk.green('Spin complete.'));
    } catch (e) {
      console.log(chalk.red(`An error occurred during default spins: ${(e as Error).message}.`));
    }
    console.log(chalk.green(`--- Automation complete for ${gameName} ---`));
    await pauseForUser(rl);

  } catch (error) {
    console.error(chalk.red(`An error occurred on game ${gameName}: ${(error as Error).message}`));
    await page.screenshot({ path: `error-${gameName}.png` }).catch(e => console.error(`Failed to take screenshot: ${e.message}`));
    await pauseForUser(rl);
  } finally {
    await page.close();
    console.log(chalk.blue(`Page closed for ${gameName}.`));

    if (collectedData.length > 0) {
      console.log(chalk.blue(`--- Saving ${collectedData.length} records to the database for ${gameName}... ---`));
      for (const data of collectedData) {
          try {
              if (data.dataType === 'settings') {
                  const existingSetting = await db.select().from(gameplay_raw_data).where(
                      and(
                          eq(gameplay_raw_data.gameName, data.gameName),
                          eq(gameplay_raw_data.dataType, 'settings')
                      )
                  ).limit(1);

                  if (existingSetting.length > 0) {
                      console.log(chalk.yellow(`Settings for ${data.gameName} already exist. Skipping.`));
                      continue; 
                  }
              }

              const [savedRawData] = await db.insert(gameplay_raw_data).values({
                  gameName: data.gameName,
                  dataType: data.dataType,
                  requestPayload: data.requestBody,
                  responsePayload: data.responseBody,
              }).returning();

              if (data.dataType === 'spin') {
                  const { game, user } = data.responseBody.result
                  await db.insert(gameplay_spin_results).values({
                      rawDataId: savedRawData.id,
                      betAmount: String(game.stake),
                      winAmount: String(game.win.total),
                      isBonus: game.spinMode !== 'Normal',
                      currency: user.sessionNetPosition,
                  });
              }
          } catch(e) {
              console.error(chalk.red(`DB insert failed for ${data.gameName}: ${(e as Error).message}`));
          }
      }
      console.log(chalk.green(`--- Database writes complete for ${gameName}. ---`));
    }
  }

  await browser.close();
  await pg_client.end();
  rl.close();
  console.log(chalk.blue('\nAll games processed. Browser and DB connection closed.'));
}

run();