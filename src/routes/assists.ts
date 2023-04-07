import { Assist } from "../models/assist"
import { extractAssistsFromDocument, fetchAssistsPage } from "../services/assist-service"
import { Router, Request, Response } from "express"
import { setAssists } from "../services/db-service";

const router: Router = Router()

router.get("/", async (req: Request, res: Response<Assist[]>) => {
  const assistsPage = await fetchAssistsPage();
  const assists: Assist[] = extractAssistsFromDocument(assistsPage)
  setAssists(assists)
  res.send(assists)
});

export default router

