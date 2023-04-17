FROM client-node-cache
RUN apk add bash

WORKDIR /app

COPY --from=client-node-cache /node_modules ./node_modules
COPY . .

CMD ["yarn", "start:dev"]
