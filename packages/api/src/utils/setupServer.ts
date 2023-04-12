import fs from "fs";
import path from "path";

import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import morgan from "morgan";

import { addSecurityHeaders, customCorsCheck } from "./helpers";
import { schema } from "../graphql/schema";

const accessLogStream = fs.createWriteStream(
  path.resolve(process.cwd(), "logs", "access.log"),
  { flags: "a" }
);

export const customHandler = (
  req: Request,
  _: Response,
  next: NextFunction
): Response | void => {
  console.log(req.method);
  console.log(req.body);
  console.log(req.query);
  console.log(req.originalUrl);
  console.log(req.cookies);
  console.log(req.route);

  return next();
};

export const createServer = (): Express => {
  const app = express();
  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(customCorsCheck);
  app.use(customHandler);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.set("trust proxy", true);
  app.all("/graphql", createHandler({
    schema,
    // context; logged in user, or access to a database.
  }));
  app.use(addSecurityHeaders);

  return app;
};
