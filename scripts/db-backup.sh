#!/bin/bash


if [[ -f .env ]]; then
  echo ".env file found. Loading environemnt variables"
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

echo "Starting mongodb backup..."

mongodump \
    --uri "mongodb+srv://${MONGOHOST}" \
    --username="$MONGOUSER" \
    --password="$MONGOPASSWORD" \

echo "Backup complete!"
