import { RequestHandler } from 'express';
import 'reflect-metadata';
import { Metadatakeys } from './Metadatakey';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(Metadatakeys.middelware, target, key) || [];

    middlewares.push(middleware);

    Reflect.defineMetadata(
      Metadatakeys.middelware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
