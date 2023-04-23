import { Request, Response } from "express"
import { ExpressRouteFunc, InjectedRouteFunc } from "../types/express"


export function withService<T>(
  serviceSupplier: () => Promise<T>,
  injectedRouteFunc: InjectedRouteFunc<T>
): ExpressRouteFunc {
  return async function (req: Request, res: Response) {
    injectedRouteFunc(req, res, await serviceSupplier())
  }
}
