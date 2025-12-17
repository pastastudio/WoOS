import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

const root = path.resolve(__dirname);
const envPaths = ['.env', '.env.local', '.env.development.local'];

for (const envPath of envPaths) {
  const file = path.join(root, envPath);
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    break;
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
    url: env('PRISMA_DATABASE_URL'),
  },
});
