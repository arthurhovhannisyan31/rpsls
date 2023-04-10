FROM node:16-alpine as base

WORKDIR /app

COPY yarn.lock ./
COPY ./packages/api/package.json ./packages/api/tsconfig.json ./
COPY ./packages/api/configs ./configs

FROM base as dev

RUN yarn install

COPY . .

CMD yarn start:dev
