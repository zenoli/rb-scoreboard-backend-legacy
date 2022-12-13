import express from "express"
import * as cheerio from 'cheerio'
import pretty from "pretty"
import { fetchAssists } from "./assists.js"

const app = express()
const port = 3000

app.get("/", async (req, res) => {
  const assists = await fetchAssists()

  const $ = cheerio.load(assists);
  const assistsPretty = pretty($.html())
  // console.log($("table"))
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
