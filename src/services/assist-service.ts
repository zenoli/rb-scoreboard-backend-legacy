import * as cheerio from "cheerio"
import { normalizeString, selectors } from "../utils/utils";
import { Assist } from "../models/assist";
import scraperConfig from "../resources/assist-scraper-config.json"
import { getDb } from "./db-service";
import { get } from "http";

async function getAssistFromWebPage(): Promise<Assist[]> {
    const assistsPage = await fetchAssistsPage()
    return extractAssistsFromDocument(assistsPage)

}

async function fetchAssistsPage() {
  const response = await fetch(
    scraperConfig.url,
    scraperConfig.options as RequestInit
  )
  if (!response.ok) {
    throw new Error("Failed to fetch assists page.")
  }
  return await response.text()
}

function extractAssistsFromDocument(assistsPage: string): Assist[] {
  const $ = cheerio.load(assistsPage);

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
    ])
  );

  const parsedAssists: Assist[] = $(trs)
    .map((_, e) => {
      const tds = $(e).find("td");
      const name = normalizeString($(tds[1]).text());
      const assists = +$(tds[5]).text();
      return { name, assists };
    })
    .get()
    .filter((_, i) => i);
  return parsedAssists
}

export async function getAssists() {
  const db = await getDb()
  const collection = db.collection<Assist>("assists")
  return await collection.find({}).toArray()
}

export async function getAssistsStream() {
  const db = await getDb()
  const collection = db.collection<Assist>("assists")

  const changeStream = collection.watch([], { fullDocument: "updateLookup" })
  changeStream.on("change", next => {
    console.log("received a achange to the collection: \t", next)
  })
}
