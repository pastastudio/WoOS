#!/usr/bin/env node
/**
 * Prisma Migration Script
 *
 * Prompts for a migration name and runs `prisma migrate dev`
 * Usage: npm run migrate
 */

import { execSync } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user for input.
 *
 * @param question The question to ask the user
 * @returns A promise that resolves to the user's input
 */
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Main function to run the migration
 *
 * @returns void
 */
async function main() {
  console.log('🔄 Prisma Migration Tool\n');

  const migrationName = await prompt(
    'Migration name (e.g. "add_user_email" or "feat: add feedback model"): ',
  );

  if (!migrationName) {
    console.error('❌ Migration name is required!');
    process.exit(1);
  }

  rl.close();

  console.log(`\n📦 Running migration: "${migrationName}"...\n`);

  try {
    execSync(`npx prisma migrate dev --name "${migrationName}"`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed!');
    process.exit(1);
  }
}

main();
