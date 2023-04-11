# Ravensburger Scoreboard - Backend
Backend API providing live scores and statistics during world cups/euros.

## Run

In order to run the app, make `MONGO_URL`-environment variable has be set with the valid Mongo DB credentials.
For local development it is recommended to create `.env` file in the project root directory with the following
content:

```
MONGOHOST={{my-mongo-host}}
MONGOUSER={{my-mongo-user}}
MONGOPASSWORD={{my-mongo-password}}
MONGO_URL="mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}"

```

Make sure to replace `{{my-mongo-host-url}}`, `{{my-mongodb-user}}` and `{{my-mongodb-password}}` with
appropriate values.

Then, simply run `npm run dev`.

Alternatively, if you can use:
```
MONGO_URL={{my-mongo-url}} npm run dev
```

