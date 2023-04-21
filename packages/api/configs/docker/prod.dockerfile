FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "start:dev"]
