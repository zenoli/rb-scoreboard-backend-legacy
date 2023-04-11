import * as dotenv from "dotenv"
import * as dotenvExpand from "dotenv-expand"

export default function() {
  dotenv.config()
  dotenvExpand.expand(dotenv.config())
}
