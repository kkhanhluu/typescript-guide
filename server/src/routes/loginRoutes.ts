import { Router, Response, Request, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

export { router };
