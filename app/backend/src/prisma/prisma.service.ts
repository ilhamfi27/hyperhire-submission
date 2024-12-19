import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { PRISMA_CLIENT_OPTIONS } from './prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({
      ...PRISMA_CLIENT_OPTIONS,
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$on('query', (e) =>
      this.logger.log(`Query: ${e.query} (Params: ${e.params})`),
    );
  }

  async onModuleDestroy() {
    console.log('Disconnecting Prisma Client');
    await this.$disconnect();
  }
}
