import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { AuthController } from './application/rest/auth.controller';
import { JWT_SECRET } from 'src/shared/constants/global.constants';
import { UserService } from 'src/user/domains/user.service';
import { AuthService } from './domains/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [UserService, AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
