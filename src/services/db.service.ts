import { Db, MongoClient } from "mongodb"
import { withService } from "@injectors/injector"
import { InjectedRouteFunc } from "../types/express"

const client = new MongoClient(process.env.MONGO_URL ?? "").connect()

async function getDb() {
  return (await client).db("qatar-2022")
}

export function withDb(routeFunc: InjectedRouteFunc<Db>) {
  return withService<Db>(getDb, routeFunc)
}
