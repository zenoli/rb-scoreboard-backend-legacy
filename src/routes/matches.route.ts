import { Request, Response, Router } from "express"
import { MongoClient } from "mongodb"

const router: Router = Router()

router.get("/", async (req: Request, res: Response) => {
  const MONGO_DB_URI = process.env.MONGO_URL ?? ""
  const client = new MongoClient(MONGO_DB_URI)
  try {
    await client.connect()
    const myMatch = await client
      .db("qatar-2022")
      .collection("matches")
      .findOne({ id: 1 })
    res.send(myMatch)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
})

export default router
