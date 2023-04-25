import * as cheerio from "cheerio"
import { normalizeString, selectors } from "../utils/utils"
import { Assist } from "../types/assist"
import scraperConfig from "../resources/assist-scraper-config.json"
import { Db } from "mongodb"

export async function updateAssists(db: Db) {
  const assists = await getAssistFromWebPage()
  const collection = db.collection<Assist>("assists")
  await collection.bulkWrite(
    assists.map(
      ({ name, assists }) => ({
        updateOne: {
          filter: { name },
          update: { $set: { assists }},
          upsert: true,
        }
      })
    ),
  )
  return assists
}

async function getAssistFromWebPage(): Promise<Assist[]> {
  const assistsPage = await fetchAssistsPage()
  return extractAssistsFromDocument(assistsPage)
}

async function fetchAssistsPage() {
  const response = await fetch(
    scraperConfig.url,
    scraperConfig.options as RequestInit,
  )
  if (!response.ok) {
    throw new Error("Failed to fetch assists page.")
  }
  return await response.text()
}

function extractAssistsFromDocument(assistsPage: string): Assist[] {
  const $ = cheerio.load(assistsPage)

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

  const parsedAssists: Assist[] = $(trs)
    .map((_, e) => {
      const tds = $(e).find("td")
      const name = normalizeString($(tds[1]).text())
      const assists = +$(tds[5]).text()
      return { name, assists }
    })
    .get()
    .filter((_, i) => i)
  return parsedAssists
}

export async function getAssists(db: Db) {
  const collection = db.collection<Assist>("assists")
  return await collection.find({}).toArray()
}

export async function getAssistsStream(db: Db) {
  const collection = db.collection<Assist>("assists")
  const changeStream = collection.watch([], { fullDocument: "updateLookup" })
  return changeStream
}
