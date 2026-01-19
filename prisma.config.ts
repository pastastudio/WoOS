import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

const root = path.resolve(__dirname);
const envPaths = ['.env', '.env.local', '.env.development.local'];

// Only try to load .env files if PRISMA_DATABASE_URL is not already set
if (!process.env.PRISMA_DATABASE_URL) {
  for (const envPath of envPaths) {
    const file = path.join(root, envPath);
    if (fs.existsSync(file)) {
      dotenv.config({ path: file });
    }
  }
}

/**
 * Prisma configuration file.
 * This file sets up the Prisma schema and migration settings.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Use a dummy URL if PRISMA_DATABASE_URL is not set (e.g., in CI)
    // This is fine for `prisma generate` which only reads the schema
    // Important: do NOT use prisma/config env() here because it throws
    // when the variable is missing. We want a safe fallback for CI.
    url:
      process.env.PRISMA_DATABASE_URL ||
      'postgresql://dummy:dummy@localhost:5432/dummy',
  },
});
