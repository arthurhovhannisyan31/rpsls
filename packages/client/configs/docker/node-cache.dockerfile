FROM node:16-alpine as build
COPY package.json yarn.lock ./
RUN yarn install

FROM node:16-alpine
COPY --from=build /node_modules ./node_modules
