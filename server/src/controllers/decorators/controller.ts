import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Metadatakeys } from './Metadatakey';
import { Methods } from './Methods';

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }

    next();
  };
}

export function controller(prefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        Metadatakeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        Metadatakeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(Metadatakeys.middelware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(Metadatakeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidator(requiredBodyProps);

      if (path) {
        router[method](
          `${prefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
