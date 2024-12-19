import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { RequestContext } from 'src/request-context/request-context';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);

export function RequireAuth(): MethodDecorator {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const user = RequestContext.getContext().user;
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      const result = await originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
