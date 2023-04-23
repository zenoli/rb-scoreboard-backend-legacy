import * as dotenv from "dotenv"
import * as dotenvExpand from "dotenv-expand"

function init() {
  dotenv.config()
  dotenvExpand.expand(dotenv.config())
}
 init()
