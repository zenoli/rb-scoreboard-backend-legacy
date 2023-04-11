import dotenvInit from "./utils/dotenv"
dotenvInit()

import express, { Express, Request, Response } from "express"
import AssistRouter from "./routes/assists"
import MatchRouter from "./routes/matches"

const app: Express = express()
const port = process.env.PORT || 3000

app.use("/assists", AssistRouter)
app.use("/matches", MatchRouter)
app.get("/", (req: Request, res: Response) => res.send("Hell RB Scoreboard"))

app.listen(port, () => {
  console.log(`Backend API started. Listening on port ${port}`)
})
