import fs from "fs";
import path from "path";

import express, { type Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import morgan from "morgan";

import { addSecurityHeaders, customCorsCheck } from "./helpers";
import { schema } from "../graphql/schema";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

export const createServer = (): Express => {
  const app = express();
  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(customCorsCheck);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.set("trust proxy", true);

  app.all("/graphql", createHandler({
    schema,
  }));
  app.use(addSecurityHeaders);

  return app;
};
