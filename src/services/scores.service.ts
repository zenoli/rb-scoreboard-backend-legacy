import { Db } from "mongodb";
import { Score, ScoreEvent } from "types/score-events";


export async function getScores(db: Db): Promise<Score[]> {
  const scores = await db.collection("scores").find<Score>({}).toArray()
  return scores
}

export async function getScoreEvents(
  db: Db,
  participant?: string,
  eventType?: string
): Promise<ScoreEvent[]> {
  const query: { participant ?: string, type_of_event ?: string } = {}
  if (participant != null)
    query.participant = participant
  if (eventType != null) {
    query.type_of_event = eventType
  }
  const scoreEvents = await db.collection("participant_match_events").find<ScoreEvent>(query).toArray()
  return scoreEvents
}

