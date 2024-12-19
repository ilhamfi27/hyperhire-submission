import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/domains/auth.service';
import { AuthMiddleware } from 'src/auth/middleware/auth-token.middleware';
import { InternalModule } from 'src/internal/internal.module';
import { MenusModule } from 'src/menus/menus.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/domains/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule, InternalModule, AuthModule, MenusModule],
  controllers: [],
  providers: [AuthService, UserService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
