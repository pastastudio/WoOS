import type { NextConfig } from 'next';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';

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
};

export default nextConfig;
