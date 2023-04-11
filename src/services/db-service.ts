import { MongoClient } from "mongodb"
import { Assist } from "../models/assist"

let client: MongoClient

export const getDb = async () => {
  console.log("CONNECTING TO: ", process.env.MONGO_URL)
  if (!client)
    client = await new MongoClient(process.env.MONGO_URL ?? "").connect()
  return client.db("qatar-2022")
}


export async function getAssistsFromDb() {
  await client.connect()
  const collection = client.db("qatar-2022").collection<Assist>("assists")
  const assists = await collection.find({}).toArray()

  client.close()
  return assists
}

export async function setAssists(assists: Assist[]) {
  try {
    await client.connect()
    console.log("inserting")
    console.table(assists)
    console.table(process.env.MONGO_URL)
    const collection = client.db("qatar-2022").collection("assists")

    await collection.deleteMany({})
    await collection.insertMany(assists)
  } catch (error) {
    console.error(error)
  } finally {
    await client.close()
  }
}
