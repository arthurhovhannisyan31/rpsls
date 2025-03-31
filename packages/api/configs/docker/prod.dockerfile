FROM node:22-alpine
RUN corepack enable
RUN apk add bash
WORKDIR /app
COPY package.json yarn.lock ./
RUN set -eux \
    & apk add \
        --no-cache \
        yarn
COPY . .
CMD ["yarn", "start:dev"]
