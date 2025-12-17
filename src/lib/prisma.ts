import env from '@/env';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    accelerateUrl: env.PRISMA_DATABASE_URL,
  }).$extends(withAccelerate());

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
