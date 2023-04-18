# Rock Paper Scissors Lizard Spock

## API

API can be used without client application using Postman or any online tool with support of GraphQL requests.

## Collections
API implements 4 groups of collections which are  `Choices`, `Room`, `Round` aka as `Game`, `User`.

## Testing
For the purposes of testing would be helpful to use following mutations:
1. authorization
```graphql
mutation login($name: String!){
  login(name: $name){
```
2. creation of the game room
```graphql
mutation createRoom($name: String!, $roomType: String!) {
  createRoom(name: $name, roomType: $roomType) {
```
3. creation of the game session (aka round)
```graphql
mutation roundStart($room: String!) {
  roundStart(room: $room){
```

Subscriptions and ServerSideEvents were not implemented due to shortage of time.
Please come back later for updates.

You can use Postman or any online tool like [graphiql-online](https://lucasconstantino.github.io/graphiql-online/)

![img.png](docs/img/schema_request_postman.png)

![img.png](docs/img/schema_request_graphiql.png)

### Docker containers
In case if you need to connect to the database please use the following scripts.
Run `docker exec -it <container_id> /bin/bash` to connect to Docker image.

Run `mongosh --port 27017 -u admin -p admin --authenticationDatabase admin` in the db container shell to connect to mongodb.  

Run `use rpsls` to switch to RPSLS database collections.

Please refer to MongoDB [data manipulation spec](https://www.mongodb.com/docs/manual/crud/) for details.

### Used tech stack:
- TypeScript
- NodeJS
- Mongoose
- GraphQL
- Jest
