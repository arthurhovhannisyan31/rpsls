FROM node:16-alpine as build

COPY package.json yarn.lock ./

RUN yarn install

FROM node:16-alpine as node-cache

COPY --from=build /node_modules ./node_modules

FROM node:16-alpine as base
RUN apk add bash

WORKDIR /app

COPY --from=node-cache /node_modules ./node_modules
COPY . .

CMD ["yarn", "start"]
