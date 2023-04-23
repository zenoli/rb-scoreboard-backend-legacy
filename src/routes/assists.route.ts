import { Db } from "mongodb"
import { Assist } from "../types/assist"
import {
  getAssists,
  getAssistsStream,
  updateAssists,
} from "../services/assists.service"
import { Router, Request, Response } from "express"
import { withDb } from "../services/db.service"

const router: Router = Router()

router.get("/stream", withDb(async (req: Request, res: Response, db: Db) => {
  const changeStream = await getAssistsStream(db)

  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  })
  res.flushHeaders()
  for await (const change of changeStream) {
    const fullDocument = (change as { fullDocument: Assist }).fullDocument
    console.log("Change [Assists]:", fullDocument)
    res.write(`${JSON.stringify(fullDocument)}\n`)
  }
}))

router.post(
  "/update",
  withDb(async (req: Request, res: Response, db: Db) => {
    const assists = await updateAssists(db)
    res.json(assists)
  }),
)

router.get(
  "/",
  withDb(async (req: Request, res: Response, db: Db) => {
    res.send(await getAssists(db))
  }),
)

export default router
