import path from "path";

import * as dotenv from "dotenv";
dotenv.config({
  path: __PROD__
    ? path.resolve(process.cwd(), "../configs/env/.env")
    : path.resolve(process.cwd(), "../configs/env/.env.dev")
});
import mongoose from "mongoose";

import type { Express } from "express";

import { CONNECT_CONFIG, mongoOptions } from "./utils/configs";
import { __PROD__ } from "./utils/constants";
import { createServer } from "./utils/setupServer";

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
