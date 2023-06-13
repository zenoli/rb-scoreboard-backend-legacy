import { NextFunction, Request, Response } from "express"
import { Query } from "express-serve-static-core"

export interface TypedRequest<U, T extends Query> extends Request {
  body: U
  query: T
}

export type ExpressRouteFunc = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void>

export type InjectedRouteFunc<T> = (
  req: Request,
  res: Response,
  service: T,
) => Promise<void>
