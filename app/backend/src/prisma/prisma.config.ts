import { Prisma } from '@prisma/client';

export const PRISMA_LOG_CONFIG: Array<Prisma.LogLevel> = [
  'warn',
  'info',
  'error',
  'query',
];

export const PRISMA_CLIENT_OPTIONS: Prisma.PrismaClientOptions = {
  log: PRISMA_LOG_CONFIG,
};
