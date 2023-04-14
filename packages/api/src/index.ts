import * as dotenv from "dotenv";
import mongoose from "mongoose";

import type { Express } from "express";

import { CONNECT_CONFIG, mongoOptions } from "./utils/configs";
import { createServer } from "./utils/setupServer";

dotenv.config({
  path: CONNECT_CONFIG.ENV_PATH
});

const main = async (): Promise<void> => {
  const server: Express = createServer();

  try {
    await mongoose.connect(CONNECT_CONFIG.DB_CONNECTION_STRING, mongoOptions);
    server.listen({ port: CONNECT_CONFIG.PORT });
    if (CONNECT_CONFIG.IS_DEV){
      console.log(`Server started at http://localhost:${CONNECT_CONFIG.PORT}`);
      console.log(`Graphql environment: http://localhost:${CONNECT_CONFIG.PORT}/graphql`);
    }
  } catch (err){
    console.log(err);
  }
};

main().catch((err: Error) => {
  console.log(err);
});
