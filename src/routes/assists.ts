import { Assist } from "../models/assist"
import { getAssists, getAssistsStream } from "../services/assist-service"
import { Router, Request, Response } from "express"

const router: Router = Router()

router.get("/", async (req: Request, res: Response<Assist[]>) => {
  res.send(await getAssists())
});

router.get("/stream", async (req: Request, res: Response<string>) => {
  await getAssistsStream()

  res.send("Change stream initiated")
});

export default router

