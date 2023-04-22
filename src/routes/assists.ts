import { ChangeStreamDocument, ChangeStreamUpdateDocument } from "mongodb"
import { Assist } from "../models/assist"
import {
  getAssists,
  getAssistsStream,
  updateAssists,
} from "../services/assist-service"
import { Router, Request, Response } from "express"

const router: Router = Router()

router.get("/", async (req: Request, res: Response<Assist[]>) => {
  res.send(await getAssists())
})

router.get("/stream", async (req: Request, res: Response) => {
  const changeStream = await getAssistsStream()

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
})


router.post("/update", async (req: Request, res: Response) => {
  const assists = await updateAssists()
  res.json(assists)
})

export default router
