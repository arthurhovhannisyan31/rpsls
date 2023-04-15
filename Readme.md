# Rock Paper Scissors Spock Lizard

## Description

## How to use
```shell
docker compose --env-file ./configs/env/.env.dev --file docker-compose.dev.yml up --build
```
### Docker containers
Run `docker exec -it <container_id> /bin/bash` to connect to specific container.

Run `mongosh --port 27017 -u root -p root --authenticationDatabase admin` in the db container shell to connect to mongodb.  

## Application architecture

### Frontend architecture
### Backend architecture

## Tech stack

### Frontend
### Backend


## Source of inspiration
https://github.com/arthurhovhannisyan31/Employees-MERG-FE
https://github.com/arthurhovhannisyan31/Employees-MERG-BE

## Source of code
parseCookies - https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server

## Development
Run `yarn prepare` to setup local checks and scripts.
