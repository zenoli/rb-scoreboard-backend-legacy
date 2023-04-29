import { Db } from "mongodb";
import { Match } from "types/match";

export async function getMatch(db: Db, id: number) {
  return await db.collection<Match>("matches").findOne({ id })
}

export async function getMatches(db: Db) {
  return await db.collection("matches").find<Match>({}).toArray()
}
