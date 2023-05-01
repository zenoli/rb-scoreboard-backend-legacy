#!/bin/bash

matches_json=${1:-"./src/resources/api-full.json"}
drafts_json=${1:-"./src/resources/drafts.json"}

if ! [[ -e $matches_json ]]; then
  echo "File ${matches_json}" does not exist.
  echo "Import aborted."
  exit 
fi

if ! [[ -e $drafts_json ]]; then
  echo "File ${drafts_json}" does not exist.
  echo "Import aborted."
  exit 
fi

echo "Initializing mongoDB (using mongoimport) from files:"
echo "$matches_json:"
echo "$drafts_json:"

if [[ -f .env ]]; then
  echo ".env file found. Loading environemnt variables"
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

echo "Starting import..."

mongoimport \
    --uri "mongodb+srv://${MONGOHOST}" \
    --username="$MONGOUSER" \
    --password="$MONGOPASSWORD" \
    --db="qatar-2022" \
    --collection "matches" \
    --file "$matches_json" \
    --authenticationDatabase="admin" \
    --jsonArray \
    --drop

mongoimport \
    --uri "mongodb+srv://${MONGOHOST}" \
    --username="$MONGOUSER" \
    --password="$MONGOPASSWORD" \
    --db="qatar-2022" \
    --collection "drafts" \
    --file "$drafts_json" \
    --authenticationDatabase="admin" \
    --drop

echo "Import complete!"
