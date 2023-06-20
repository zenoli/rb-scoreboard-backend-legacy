import { withDb } from "@services/db.service"
import { getScoreEvents, getScores } from "@services/scores.service"
import { Request, Response, Router } from "express"
import { Db } from "mongodb"

const router: Router = Router()

router.get("/", withDb(async (req: Request, res: Response, db: Db) => {
  console.log("scores hit")
  res.send(await getScores(db))
}))

router.get("/events", withDb(async (req: Request, res: Response, db: Db) => {
  const participant = req.query.participant as string
  const eventType = req.query.type_of_event as string
  res.send(await getScoreEvents(db, participant, eventType))
}))

export default router
