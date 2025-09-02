import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../api/db/schema';

// This is the single, hardcoded operator for the entire system.
// Using a deterministic ID makes it easy to reference in other seeds.
const defaultOperator = {
  id: 'clxjv0w2z0000356s1szacrqs',
  name: 'Default Operator',
balance: 1000,
netRevenue: 0,
operatorSecret: crypto.randomUUID(),
  operatorAccess: crypto.randomUUID(),
  callbackUrl: 'https://example.com/callback',
  allowedIps: '0.0.0.0/0', // Allows all IPs for dev purposes
  acceptedPayments: ['INSTORE_CASH', 'CREDIT_CARD'],
};

export async function seedOperator(db: NodePgDatabase<typeof schema>) {
    console.log('🏢 Seeding default operator...');
    
    // onConflictDoNothing prevents errors if the operator already exists.
    await db.insert(schema.operators)
        .values(defaultOperator)
        .onConflictDoNothing();

    console.log('✅ Default operator seeded.');
    // Return the operator object so its ID can be used in other seeds.
    return defaultOperator;
}
