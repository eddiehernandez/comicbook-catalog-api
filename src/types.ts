import { Request, Response, NextFunction } from 'express';

type ExpressRouteFunction = (req: Request, res: Response, next?: NextFunction) => Response<any, Record<string, any>> | undefined;

export {ExpressRouteFunction};