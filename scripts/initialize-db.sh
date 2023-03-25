#!/bin/bash

json_location=${1:-"./src/resources/api-sample.json"}

if ! [[ -e $json_location ]]; then
  echo "File ${json_location}" does not exist.
  echo "Import aborted."
  exit 
fi

echo "Initializing mongoDB (using mongoimport) from file:"
echo "$json_location:"


echo "Starting import..."
mongoimport \
    --host="$MONGOHOST" \
    --port="$MONGOPORT" \
    --username="$MONGOUSER" \
    --password="$MONGOPASSWORD" \
    --db "qatar-2022" \
    --collection "matches" \
    --file "$json_location" \
    --authenticationDatabase="admin" \
    --jsonArray \
    --drop

echo "Import complete!"
