import { Module } from '@nestjs/common';
import { MenusController } from './application/rest/menus.controller';
import { MenusService } from './domains/menus.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MenusController],
  providers: [MenusService, PrismaService],
})
export class MenusModule {}
