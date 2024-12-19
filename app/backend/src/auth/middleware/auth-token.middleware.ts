import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../domains/auth.service';
import { RequestContext } from 'src/request-context/request-context';
import { COOKIE_NAME } from 'src/shared/constants/global.constants';

interface RequestAddition {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request & RequestAddition, res: Response, next: NextFunction) {
    RequestContext.setContext({
      user: undefined,
    });
    const authCookie = req.cookies[COOKIE_NAME];
    const authHeader = req.header('authorization');
    if (!authHeader && !authCookie) {
      next();
      return;
    }
    let authToken: string;
    if (authHeader) {
      authToken = authHeader.split(' ')[1];
    } else {
      authToken = authCookie;
    }
    const user = await this.authService.verify(authToken);
    RequestContext.setContext({
      user,
    });
    next();
  }
}
