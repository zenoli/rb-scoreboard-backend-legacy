import { withDb } from "@services/db.service"
import { getMatchEvents } from "@services/match-event.service"
import { Request, Response, Router } from "express"
import { Db } from "mongodb"
import { TypedRequest } from "types/express"

const router: Router = Router()

router.get(
  "/",
  withDb(async (req: Request, res: Response, db: Db) => {
    console.log(req.query)
    res.send(
      await getMatchEvents(
        db,
        req.query.participant as string,
        req.query.type_of_event as string
      )
    )
  }),
)

export default router
