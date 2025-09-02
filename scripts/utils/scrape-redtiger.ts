import { chromium } from 'playwright';
import { promises as fs } from 'fs';

const WEBSITE_URL = 'https://redtiger.com/catalog';
const GAME_SETTINGS_URL_PART = '/settings';
const GAME_SPIN_URL_PART = '/spin';
const OUTPUT_SETTINGS_FILE = 'redtiger-settings.json';
const OUTPUT_SPINS_FILE = 'redtiger-spins.json';

async function scrapeRedTiger() {
  console.log('🚀 Starting Red Tiger game data scraper...');
  const browser = await chromium.launch({ headless: false }); // Headless can be true
  const page = await browser.newPage();

  const capturedSettings = [];
  const capturedSpins = [];

  page.on('request', async (request) => {
    if (request.url().includes(GAME_SETTINGS_URL_PART)) {
      console.log(`📩 Capturing settings request: ${request.url()}`);
      const response = await request.response();
      if (response) {
        capturedSettings.push({
          url: request.url(),
          requestData: request.postDataJSON(),
          responseData: await response.json(),
        });
        await fs.writeFile(OUTPUT_SETTINGS_FILE, JSON.stringify(capturedSettings, null, 2));
        console.log(`✅ Settings data saved to ${OUTPUT_SETTINGS_FILE}`);
      }
    } else if (request.url().includes(GAME_SPIN_URL_PART)) {
      console.log(`🎰 Capturing spin request: ${request.url()}`);
      const response = await request.response();
      if (response) {
        capturedSpins.push({
          url: request.url(),
          requestData: request.postDataJSON(),
          responseData: await response.json(),
        });
        await fs.writeFile(OUTPUT_SPINS_FILE, JSON.stringify(capturedSpins, null, 2));
        console.log(`✅ Spin data saved to ${OUTPUT_SPINS_FILE}`);
      }
    }
  });

  try {
    await page.goto(WEBSITE_URL, { waitUntil: 'networkidle' });
    console.log('✅ Navigated to Red Tiger catalog.');

    // Click the first game to launch it
    await page.locator('.rt-game-thumb__overlay').first().click();
    console.log('✅ Clicked on the first game.');

    // Wait for the game to load in the iframe
    const iframe = page.frameLocator('iframe');
    await iframe.locator('canvas').waitFor({ state: 'visible', timeout: 60000 });
    console.log('✅ Game loaded in iframe.');

    // Logic to iterate through bet levels and spin
    // This part is highly dependent on the game's UI and might need adjustments
    const betLevels = await iframe.locator('.bet-control__amount').allTextContents();
    console.log(`Bet levels found: ${betLevels.join(', ')}`);

    for (const level of betLevels) {
      console.log(`-- Testing bet level: ${level} --`);
      // Set the bet level - this assumes clicking a button changes the level
      await iframe.locator(`.bet-control__amount:has-text("${level}")`).click();
      
      for (let i = 0; i < 10; i++) {
        await iframe.locator('.spin-button').click();
        console.log(`  Spin ${i + 1}/10`);
        await page.waitForTimeout(1000); // Wait for spin animation
      }
    }

  } catch (error) {
    console.error('❌ An error occurred during scraping:', error);
  } finally {
    await browser.close();
    console.log('🏁 Browser closed. Scraping complete.');
  }
}

scrapeRedTiger();
