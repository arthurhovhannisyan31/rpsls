FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY configs ./configs

FROM base as build

RUN yarn install --frozen-lockfile

COPY . .

RUN npx tsc

FROM build as serve

CMD yarn start
