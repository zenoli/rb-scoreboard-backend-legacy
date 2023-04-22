import { MongoClient } from "mongodb"
import { Assist } from "../models/assist"

let client: MongoClient

export async function getDb() {
  if (!client) {
    console.log("CONNECTING TO: ", process.env.MONGO_URL)
    client = await new MongoClient(process.env.MONGO_URL ?? "").connect()
  }
  return client.db("qatar-2022")
}

