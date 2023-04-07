import * as cheerio from "cheerio"
import { normalizeString, selectors } from "../utils/utils";
import { Assist } from "../models/assist";

export async function fetchAssistsPage() {
  const response = await fetch(
    "https://www.weltfussball.com/assists/wm-2022-in-katar/",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        cookie:
          "sprache=1; __cf_bm=Cz9TCcZGmymAJdUdrFGZCqr1mqjEyf_ulO6.n5mtv3Y-1670859983-0-AaSZQitdjJYqJ5Qd5RYKdt9O3cgwOeJ8jGwH/2Wzrt1Bq+Y3DO4qKy3qLd/ufMePBGeQErgzP8mjK1QGbYMz+hzOqseNO4Ok5GuTy4bOBywl+fEyKEHhIj9Yy4AZ/tQaAvM+B15WVyWofOYa+PoSyHY=; weltfussball=3; wfb_long_term=9; cc=9-CH-bs-basel",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    },
  )
  return await response.text()
}

export function extractAssistsFromDocument(assistsPage: string): Assist[] {
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

