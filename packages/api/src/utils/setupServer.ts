import fs from "fs";
import path from "path";

import express, { type Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import morgan from "morgan";

import type { Context } from "../typings/context";

import { populateContextData } from "./context-handler";
import {
  addSecurityHeaders,
  customCorsCheck
} from "./helpers";
import { SSEManager } from "./sse/handlers";
import { schema } from "../schema/schema";

const accessLogStream = fs.createWriteStream(
  path.resolve(process.cwd(), "logs", "access.log"),
  { flags: "a" }
);

export const createServer = (): Express => {
  const app = express();
  const sseManager = new SSEManager();
  const context = {} as Context;
  const handler = createHandler<Context>({
    schema,
    context
  });

  app.disable("x-powered-by");
  app.set("trust proxy", true);
  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(customCorsCheck);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, }));
  app.use(populateContextData(context));
  app.get("/subscribe", sseManager.subscribe);
  app.post("/notify", sseManager.notify);
  app.all("/graphql", handler);
  app.use(addSecurityHeaders);

  return app;
};
