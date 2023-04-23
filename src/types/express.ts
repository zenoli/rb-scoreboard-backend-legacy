import { NextFunction, Request, Response } from "express"

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => Promise<void>
export type InjectedRouteFunc<T> = (req: Request, res: Response, service: T) => Promise<void>
