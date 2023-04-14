import fs from "fs";
import path from "path";

import express, { type Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import morgan from "morgan";

import type { Context } from "../typings/context";

import {
  addSecurityHeaders,
  customCorsCheck,
  populateContextData
} from "./helpers";
import { schema } from "../schema/schema";

const accessLogStream = fs.createWriteStream(
  path.resolve(process.cwd(), "logs", "access.log"),
  { flags: "a" }
);

export const createServer = (): Express => {
  const context = {} as Context;
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", true);
  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(customCorsCheck);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, }));
  app.use(populateContextData(context));
  app.all("/graphql", createHandler<Context>({
    schema,
    context
  }));
  app.use(addSecurityHeaders);

  return app;
};
