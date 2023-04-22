import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URL ?? "").connect()

export async function getDb() {
  return (await client).db("qatar-2022")
}

