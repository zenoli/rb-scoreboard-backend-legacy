import { withDb } from "@services/db.service"
import { getDrafts } from "@services/drafts.service"
import { Request, Response, Router } from "express"
import { Db } from "mongodb"

const router: Router = Router()

router.get("/", withDb(async (req: Request, res: Response, db: Db) => {
  res.send(await getDrafts(db))
}))

export default router
