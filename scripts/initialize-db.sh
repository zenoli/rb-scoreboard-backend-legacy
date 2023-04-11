#!/bin/bash

json_location=${1:-"./src/resources/api-sample.json"}

if ! [[ -e $json_location ]]; then
  echo "File ${json_location}" does not exist.
  echo "Import aborted."
  exit 
fi

echo "Initializing mongoDB (using mongoimport) from file:"
echo "$json_location:"

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
    --file "$json_location" \
    --authenticationDatabase="admin" \
    --jsonArray \
    --drop

echo "Import complete!"
