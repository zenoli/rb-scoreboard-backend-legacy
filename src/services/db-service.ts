import { MongoClient } from "mongodb";
import { Assist } from "../models/assist";

const client: MongoClient = new MongoClient(process.env.MONGO_URL ?? "")


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
