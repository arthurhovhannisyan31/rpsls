# Rock Paper Scissors Lizard Spock

## Description
The project demonstrates full-stack implementation of the game RPSLS using containerized database, back-end and front-end.

## Deployment

Please fetch codebase from the following repository:
```git
git clone https://github.com/arthurhovhannisyan31/rpsls.git
```

All project dependencies installed during project build.


## How to use
### Prod
Please run following command in project root of the project to start the containers in production mode.
```shell
docker compose --env-file ./configs/env/.env.dev --file docker-compose.prod.yml up --build
```
### Dev
For development please prepare cache containers for each package:
#### API:
```shell
cd ./packages/api
docker build --tag api-node-cache -f ./configs/docker/node-cache.dockerfile .
```
#### Client:
```shell
cd ./packages/client
docker build --tag client-node-cache -f ./configs/docker/node-cache.dockerfile .
```
Then run project in development mode:
```shell
docker compose --env-file ./configs/env/.env.dev --file docker-compose.dev.yml up --build
```

## Game Flow
1. Login 
2. Join to room or create one
3. Play or switch the room

Game works in autoplay mode. In current implementation only PVC mode is supported.

Project client is available at [Localhost:3001](http://localhost:3001/)

Please refer to [Front-end](packages/client/README.md) and [Back-End](packages/api/README.md) Readme files for details.


## Source of inspiration
Architecture:
- [Employees-MERG-FE](https://github.com/arthurhovhannisyan31/Employees-MERG-FE)
- [Employees-MERG-BE](https://github.com/arthurhovhannisyan31/Employees-MERG-BE)

Code:
- [ParseCookies - StackOverflow](https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server)

Styles:
- [SWR page](https://swr.vercel.app/) 

## Setup for development
Run `yarn prepare` to setup local checks and scripts.

For purposes of development were implemented custom bash scrips with informative output to console. 

## CI
For purposes of continuous integration used GitHub CI API. Please take a look at [configuration files](.github/workflows), will you have any suggestions or question please feel free to reach me.
