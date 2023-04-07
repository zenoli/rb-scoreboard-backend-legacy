import express, { Express, Request, Response } from "express";
import { extractAssistsFromDocument, fetchAssistsPage } from "./routes/assists";
import { MongoClient } from "mongodb";
import { Assist } from "./models/assist";
import { setAssists } from "./services/db-service";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.get("/db", async (req: Request, res: Response) => {
  const MONGO_DB_URI = process.env.MONGO_URL ?? "";
  const client = new MongoClient(MONGO_DB_URI);
  try {
    await client.connect();
    const myMatch = await client
      .db("qatar-2022")
      .collection("matches")
      .findOne({ id: 1 });
    res.send(myMatch);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

app.get("/assists", async (req: Request, res: Response<Assist[]>) => {
  const assistsPage = await fetchAssistsPage();
  const assists: Assist[] = extractAssistsFromDocument(assistsPage)
  setAssists(assists)
  res.send(assists)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
