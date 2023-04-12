import path from "path";

import type { ConnectConfig } from "models/config";

import { __PROD__, DEFAULT_PORT } from "./constants";

export const getConnectionString = (dbName: string): string =>
  // `mongodb://${process?.env.USER}:${process?.env.PASSWORD}@mongodb:27017/${dbName}?authSource=admin`;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  `mongodb://${process?.env.USER}:${process?.env.PASSWORD}@host.docker.internal:27017/${dbName}?authSource=admin`;

export const mongoOptions: Record<string, boolean> = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const CONNECT_CONFIG: ConnectConfig = {
  PORT: process.env.PORT_API ?? DEFAULT_PORT,
  IS_DEV: !__PROD__,
  DB_CONNECTION_STRING: getConnectionString(process.env.DB_NAME || ""),
  ENV_PATH: path.resolve(process.cwd(), `configs/env/${ __PROD__ ? ".env" : ".env.dev" }`)
};
