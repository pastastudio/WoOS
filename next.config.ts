import dotenv from 'dotenv';
import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname);
const envPaths = ['.env', '.env.local', '.env.development.local'];

for (const envPath of envPaths) {
  const file = path.join(root, envPath);
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    break;
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    authInterrupts: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.tsx',
      },
    },
  },
};

export default nextConfig;
