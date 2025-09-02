#!/usr/bin/env tsx

/**
 * Script to seed VIP ranks in the database
 * Usage: tsx seed-vip-ranks.ts
 */

import { initializeVipRanks } from './src/lib/vip.seed'

async function main() {
  console.log('🚀 Starting VIP ranks seeding...')
  
  try {
    await initializeVipRanks()
    console.log('✅ VIP ranks seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ VIP ranks seeding failed:', error)
    process.exit(1)
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

// Run the main function
main()