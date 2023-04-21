FROM node:16-alpine as build
COPY package.json yarn.lock ./
RUN yarn install

FROM node:16-alpine
RUN apk add bash
WORKDIR /app
COPY --from=build /node_modules ./node_modules
COPY . .
CMD ["yarn", "start:dev"]
