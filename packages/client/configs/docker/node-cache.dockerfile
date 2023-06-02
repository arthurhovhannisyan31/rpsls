FROM node:18-alpine as build
COPY package.json yarn.lock ./
RUN yarn install

FROM node:18-alpine
COPY --from=build /node_modules ./node_modules
