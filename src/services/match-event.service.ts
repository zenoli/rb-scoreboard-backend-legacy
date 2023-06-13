import { Db } from "mongodb"
import { MatchEvent } from "types/match-event"

export async function getMatchEvents(
  db: Db,
  participant?: string,
  type_of_event?: string,
) {
  const collection = db.collection<MatchEvent>("match_events")
  return await collection
    .find(
      { participant, type_of_event },
      {
        projection: {
          participant: 0,
          type_of_event: 0,
        },
      },
    )
    .toArray()
}
