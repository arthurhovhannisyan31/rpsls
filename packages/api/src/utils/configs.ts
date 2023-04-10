import { __PROD__, DEFAULT_PORT } from "./constants";
import { type ConnectConfig } from "../models/config";

export const getConnectionString = (dbName: string) =>
  // `mongodb://${process?.env.USER}:${process?.env.PASSWORD}@mongodb:27017/${dbName}?authSource=admin`;
  `mongodb://${process?.env.USER}:${process?.env.PASSWORD}@host.docker.internal:27017/${dbName}?authSource=admin`;

export const mongoOptions: Record<string, boolean> = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const CONNECT_CONFIG: ConnectConfig = {
  PORT: process.env.PORT_API ?? DEFAULT_PORT,
  IS_DEV: !__PROD__,
  DB_CONNECTION_STRING: getConnectionString(process.env.DB_NAME || ""),
};