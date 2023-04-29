import { Db } from "mongodb";

export async function getDrafts(db: Db) {
  return await db.collection("drafts").find({}).toArray()
}
