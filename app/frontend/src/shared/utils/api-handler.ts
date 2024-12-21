import 'reflect-metadata';
import { NextRequest, NextResponse } from 'next/server';

export const FullPathSymbol = Symbol('FullPath');
export const RouterSymbol = Symbol('Router');
export const GetMethodSymbol = Symbol('GetMethod');
export const PostMethodSymbol = Symbol('PostMethod');
export const PutMethodSymbol = Symbol('PutMethod');
export const PatchMethodSymbol = Symbol('PatchMethod');
export const DeleteMethodSymbol = Symbol('DeleteMethod');
export const BodyMetadataKey = Symbol('Body');
export const BodyTypeMetadataKey = Symbol('BodyType');
export const ParamsSymbol = Symbol('Params');
export const QuerySymbol = Symbol('Query');
interface NextRequestWithParams extends NextRequest {
  params: { [key: string]: string };
}
/**
 * Decorator function that marks a parameter as the request body.
 *
 * @returns {Function} The decorator function.
 */
export function Body() {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number,
  ) {
    const existingBodyParameters: number[] =
      Reflect.getMetadata(BodyMetadataKey, target, propertyKey) || [];
    existingBodyParameters.push(parameterIndex);
    Reflect.defineMetadata(
      BodyMetadataKey,
      existingBodyParameters,
      target,
      propertyKey,
    );
    const paramTypes: Function[] = Reflect.getMetadata(
      'design:paramtypes',
      target,
      propertyKey,
    );
    Reflect.defineMetadata(
      BodyTypeMetadataKey,
      paramTypes[parameterIndex],
      target,
      propertyKey,
    );
  };
}

export function Get(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(GetMethodSymbol, path, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args.length < 2) {
        args = [null, null, ...args]; // Add placeholders for request and response
      }
      return originalMethod.apply(this, args);
    };
  };
}

export function Post(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(PostMethodSymbol, path, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args.length < 2) {
        args = [null, null, ...args]; // Add placeholders for request and response
      }
      return originalMethod.apply(this, args);
    };
  };
}

export function Put(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(PutMethodSymbol, path, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args.length < 2) {
        args = [null, null, ...args]; // Add placeholders for request and response
      }
      return originalMethod.apply(this, args);
    };
  };
}

export function Patch(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(PatchMethodSymbol, path, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args.length < 2) {
        args = [null, null, ...args]; // Add placeholders for request and response
      }
      return originalMethod.apply(this, args);
    };
  };
}

export function Delete(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(DeleteMethodSymbol, path, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args.length < 2) {
        args = [null, null, ...args]; // Add placeholders for request and response
      }
      return originalMethod.apply(this, args);
    };
  };
}

export function Param(paramName: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingParams: any[] =
      Reflect.getOwnMetadata(ParamsSymbol, target, propertyKey) || [];
    existingParams.push({ paramName, parameterIndex });
    Reflect.defineMetadata(ParamsSymbol, existingParams, target, propertyKey);
  };
}

export function Query() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingParams: any[] =
      Reflect.getOwnMetadata(RouterSymbol, target, propertyKey) || [];
    console.log('existingParams', existingParams);
  };
}

export class Router {
  private readonly getRoutes = new Map();
  private readonly postRoutes = new Map();
  private readonly putRoutes = new Map();
  private readonly patchRoutes = new Map();
  private readonly deleteRoutes = new Map();
  getAllMethods(target: any) {
    let currentPrototype = Object.getPrototypeOf(target);
    const methods = new Set<string>();

    while (currentPrototype !== Object.prototype) {
      Object.getOwnPropertyNames(currentPrototype).forEach((property) => {
        if (typeof currentPrototype[property] === 'function') {
          methods.add(property);
        }
      });
      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    return Array.from(methods);
  }

  registerRoutes(target: any) {
    const methods = [
      GetMethodSymbol,
      PostMethodSymbol,
      PutMethodSymbol,
      PatchMethodSymbol,
      DeleteMethodSymbol,
    ]; // Add more method symbols as needed
    methods.forEach((methodSymbol) => {
      const path = Reflect.getMetadata(methodSymbol, target);
      if (path) {
        this.addRoute(methodSymbol, target);
      }
    });
  }

  addRoute(methodSymbol: symbol, target: any) {
    const methods = this.getAllMethods(target);
    methods.forEach((propertyKey) => {
      const keys = Reflect.getMetadataKeys(target, propertyKey);
      keys.forEach((key) => {
        if (key === methodSymbol) {
          const path = Reflect.getMetadata(key, target, propertyKey);
          if (typeof target[propertyKey] === 'function') {
            const method = target[propertyKey].bind(target);
            const params =
              Reflect.getMetadata(QuerySymbol, target, propertyKey) || [];
            const bodyIndices: number[] =
              Reflect.getMetadata(BodyMetadataKey, target, propertyKey) || [];
            // const queries: number[] =
            //   Reflect.getMetadata(BodyMetadataKey, target, propertyKey) || [];

            switch (methodSymbol) {
              case GetMethodSymbol:
                this.getRoutes.set(path, {
                  target,
                  propertyKey,
                  method,
                  params,
                  bodyIndices,
                });
                break;
              case PostMethodSymbol:
                this.postRoutes.set(path, {
                  target,
                  propertyKey,
                  method,
                  params,
                  bodyIndices,
                });
                break;
              case PutMethodSymbol:
                this.putRoutes.set(path, {
                  target,
                  propertyKey,
                  method,
                  params,
                  bodyIndices,
                });
                break;
              case PatchMethodSymbol:
                this.patchRoutes.set(path, {
                  target,
                  propertyKey,
                  method,
                  params,
                  bodyIndices,
                });
                break;
              case DeleteMethodSymbol:
                this.deleteRoutes.set(path, {
                  target,
                  propertyKey,
                  method,
                  params,
                });
                break;
              default:
                throw new Error(
                  `Unsupported method symbol: ${methodSymbol.toString()}`,
                );
            }
          }
        }
      });
    });
  }

  routeWithoutBodyHandler(path: string) {
    let bestMatch: any = null;
    let maxMatchedSegments = 0;

    for (const [route, { method, params }] of this.getRoutes.entries()) {
      const routeSegments = route.split('/');
      const pathSegments = path.split('/');

      if (routeSegments.length !== pathSegments.length) {
        continue;
      }

      let matchedSegments = 0;
      const extractedParams: { [key: string]: string } = {};

      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) {
          extractedParams[routeSegments[i].substring(1)] = pathSegments[i];
          matchedSegments++;
        } else if (routeSegments[i] === pathSegments[i]) {
          matchedSegments++;
        } else {
          break;
        }
      }

      if (matchedSegments > maxMatchedSegments) {
        maxMatchedSegments = matchedSegments;
        bestMatch = { method, params: extractedParams };
      }
    }

    if (bestMatch) {
      return async (req: NextRequestWithParams, resp: NextResponse) => {
        req.params = bestMatch.params;
        return bestMatch.method(...Object.values(bestMatch.params), req, resp);
      };
    } else {
      return (req: NextRequest, resp: NextResponse) => {
        return () => ({ number: 404 });
      };
    }
  }

  routeWithBodyHandler(path: string) {
    let bestMatch: any = null;
    let maxMatchedSegments = 0;

    for (const [
      route,
      { target, propertyKey, method, params, bodyIndices },
    ] of this.postRoutes.entries()) {
      const routeSegments = route.split('/');
      const pathSegments = path.split('/');

      if (routeSegments.length !== pathSegments.length) {
        continue;
      }

      let matchedSegments = 0;
      const extractedParams: { [key: string]: string } = {};

      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) {
          extractedParams[routeSegments[i].substring(1)] = pathSegments[i];
          matchedSegments++;
        } else if (routeSegments[i] === pathSegments[i]) {
          matchedSegments++;
        } else {
          break;
        }
      }

      if (matchedSegments > maxMatchedSegments) {
        maxMatchedSegments = matchedSegments;
        bestMatch = {
          target,
          propertyKey,
          method,
          params: extractedParams,
          bodyIndices,
        };
      }
    }
    if (bestMatch) {
      return async (req: NextRequestWithParams, resp: NextResponse) => {
        req.params = bestMatch.params;
        const args = [...Object.values(bestMatch.params)];
        for (const index of bestMatch.bodyIndices || []) {
          // Get the type of the @Body() parameter
          const bodyType = Reflect.getMetadata(
            BodyTypeMetadataKey,
            bestMatch.target,
            bestMatch.propertyKey,
          );
          const body = await req.json();
          // Create an instance of bodyType from the request body
          args[index] = Object.assign(new bodyType(body));
        }
        return bestMatch.method(...Object.values(args), req, resp);
      };
    } else {
      return (req: NextRequest, resp: NextResponse) => {
        return Response.json({ number: 404 });
      };
    }
  }

  matchPath(route: string, path: string) {
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    if (routeParts.length > pathParts.length) {
      return null;
    }
    const params: { [key: string]: string } = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return { params };
  }
}

export function APIService() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      router: Router;
      constructor(...args: any[]) {
        super(...args);
        this.router = new Router();
        Reflect.defineMetadata(RouterSymbol, this.router, constructor);
        this.addRoutes();
      }
      addRoutes() {
        this.router.addRoute(GetMethodSymbol, this);
        this.router.addRoute(PostMethodSymbol, this);
        this.router.addRoute(PutMethodSymbol, this);
        this.router.addRoute(PatchMethodSymbol, this);
        this.router.addRoute(DeleteMethodSymbol, this);
      }
      nonBodyHandler = async (req: any, resp: NextResponse<unknown>) => {
        const handler = this.router.routeWithoutBodyHandler(
          req.nextUrl.pathname.split('api')[1],
        );
        if (handler) {
          const result = await handler(req, resp);
          return Response.json(result);
        } else {
          return NextResponse.json({ number: 404 });
        }
      };

      bodyHandler = async (req: any, resp: NextResponse<unknown>) => {
        const handler = this.router.routeWithBodyHandler(
          req.nextUrl.pathname.split('api')[1],
        );
        if (handler) {
          return handler(req, resp);
        } else {
          return NextResponse.json({ number: 404 });
        }
      };

      GET = this.nonBodyHandler;
      POST = this.bodyHandler;
      PUT = this.bodyHandler;
      PATCH = this.bodyHandler;
      DELETE = this.nonBodyHandler;
    };
  };
}

/**
 * Routes the request to the appropriate method of the service based on the HTTP method.
 * @param service - The service object containing the methods to be called.
 * @param req - The Next request object.
 * @param resp - The Next response object.
 * @returns The result of the method call.
 */
export const routeService = (service: any, req: Request, resp: Response) => {
  return service[req.method](req, resp);
};
