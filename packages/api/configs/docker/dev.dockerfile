FROM node-cache:latest as cache

FROM node:16-alpine as base
RUN apk add bash

WORKDIR /app

COPY --from=cache /node_modules ./node_modules
COPY . .

CMD ["yarn", "start:dev"]
