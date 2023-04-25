#!/bin/bash
npx nodemon --exec 'node \
  --inspect=0.0.0.0:9229 \
  --require tsconfig-paths/register \
  --require ts-node/register src/server.ts'
