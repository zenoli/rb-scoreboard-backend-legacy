import express from "express"
import * as cheerio from "cheerio"
import { fetchAssistsPage } from "./assists.js"
import { normalizeString, selectors } from "./utils.js"
import { MongoClient } from "mongodb"

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => res.send("Hello World"))

app.get("/db", async (req, res) => {
  const MONGO_DB_URI = process.env.MONGO_URL
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

app.get("/assists", async (req, res) => {
  const assistsPage = await fetchAssistsPage()
  const $ = cheerio.load(assistsPage)

  const table = $(
    selectors([
      "#site",
      "div.white",
      "div.content",
      "div.portfolio",
      "div.box",
      "div",
    ]),
  ).html()

  const trs = $(
    selectors([
      "#site",
      "div.white",
      "div.content",
      "div.portfolio",
      "div.box",
      "div",
      "table",
      "tbody",
      "tr",
    ]),
  )
  console.log("assists hit")

  const parsedAssists = $(trs)
    .map((_, e) => {
      const tds = $(e).find("td")
      const name = normalizeString($(tds[1]).text())
      const assists = $(tds[5]).text()
      return { name, assists }
    })
    .get()
    .filter((_, i) => i)

  res.send(parsedAssists)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
