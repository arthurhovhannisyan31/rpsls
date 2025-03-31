FROM node:22-alpine as build
RUN corepack enable
COPY package.json yarn.lock ./
RUN set -eux \
    & apk add \
        --no-cache \
        yarn
COPY /node_modules ./node_modules
