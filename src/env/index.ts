import { getEnvSafely } from './config';

/**
 * For server-used only
 */
const POSTGRES_URL = getEnvSafely('POSTGRES_URL');
const PRISMA_DATABASE_URL = getEnvSafely('PRISMA_DATABASE_URL');
const NODE_ENV = getEnvSafely('NODE_ENV'); // 'development' | 'production' | 'test'

const env = {
  POSTGRES_URL,
  PRISMA_DATABASE_URL,
  NODE_ENV,
};

export default env;
