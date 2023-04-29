import { Collection, Db, MongoClient } from "mongodb"
import { withService } from "@injectors/injector"
import { InjectedRouteFunc } from "../types/express"
import { Match } from "types/match"

const client = new MongoClient(process.env.MONGO_URL ?? "").connect()

async function getDb() {
  return (await client).db("qatar-2022")
}

async function getCollection(collection: string) {
  return await getDb().then(db => db.collection<Match>(collection))
}

export function withDb(routeFunc: InjectedRouteFunc<Db>) {
  return withService<Db>(getDb, routeFunc)
}

