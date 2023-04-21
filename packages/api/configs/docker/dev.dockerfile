FROM node:16-alpine
RUN apk add bash
WORKDIR /app
COPY --from=api-node-cache /node_modules ./node_modules
COPY . .
CMD ["yarn", "start:dev"]
