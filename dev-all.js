#!/usr/bin/env node

const { spawn } = require('child_process');

// Colors for console output
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
  cyan: '\x1b[36m'
};

function log(prefix, message, color = colors.reset) {
  console.log(`${color}[${prefix}]${colors.reset} ${message}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function startFrontend() {
  log('FRONTEND', 'Starting frontend development server...', colors.blue);
  try {
    await runCommand('bun', ['dev:frontend'], { cwd: process.cwd() });
  } catch (error) {
    log('FRONTEND', `Failed to start frontend: ${error.message}`, colors.red);
    throw error;
  }
}

async function startAPI() {
  log('API', 'Starting API development server...', colors.green);
  try {
    await runCommand('bun', ['--cwd', 'api/', 'dev'], { cwd: process.cwd() });
  } catch (error) {
    log('API', `Failed to start API: ${error.message}`, colors.red);
    throw error;
  }
}

async function startDatabase() {
  log('DATABASE', 'Starting database services...', colors.cyan);
  try {
    // Check if PostgreSQL is running, if not start it
    await runCommand('pg_isready', ['-h', 'localhost', '-p', '5432'], { cwd: process.cwd() })
      .then(() => {
        log('DATABASE', 'PostgreSQL is already running', colors.cyan);
      })
      .catch(async () => {
        log('DATABASE', 'Starting PostgreSQL...', colors.cyan);
        await runCommand('brew', ['services', 'start', 'postgresql'], { cwd: process.cwd() });
        // Wait a moment for PostgreSQL to start
        await new Promise(resolve => setTimeout(resolve, 3000));
      });
  } catch (error) {
    log('DATABASE', `Database setup: ${error.message}`, colors.yellow);
    // Don't fail if database setup has issues
  }
}

async function main() {
  log('DEV-ALL', 'Starting all development services...', colors.yellow);

  try {
    // Start database first
    await startDatabase();

    // Start frontend and API concurrently
    await Promise.all([
      startFrontend(),
      startAPI()
    ]);

  } catch (error) {
    log('DEV-ALL', `Error starting services: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('DEV-ALL', 'Shutting down all services...', colors.yellow);
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('DEV-ALL', 'Shutting down all services...', colors.yellow);
  process.exit(0);
});

if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}