import { db, pg_client } from '../src/db';
import { rtgSettingsResponses } from '../src/db/schema/gameplay';
import { sql } from 'drizzle-orm';

async function truncateTable() {
  console.log('Truncating rtg_settings_responses table...');
  try {
    await db.execute(sql`TRUNCATE TABLE ${rtgSettingsResponses}`);
    console.log('Table truncated successfully.');
  } catch (error) {
    console.error('Error truncating table:', error);
  } finally {
    await pg_client.end();
  }
}

truncateTable();
