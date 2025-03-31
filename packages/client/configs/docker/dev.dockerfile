FROM node:22-alpine
RUN corepack enable
RUN apk add bash
WORKDIR /app
COPY --from=client-node-cache /node_modules ./node_modules
COPY . .
CMD ["yarn", "start:dev"]
