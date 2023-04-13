import fs from "fs";
import path from "path";

import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import morgan from "morgan";

import { addSecurityHeaders, customCorsCheck, populateUserData } from "./helpers";
import { schema } from "../schema";

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

  return next();
};

export const createServer = (): Express => {
  const app = express();
  // TODO add user data to context/request
  // Check SID in sessions and append user_id to request/session

  app.disable("x-powered-by");

  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(customCorsCheck);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, }));
  app.set("trust proxy", true);
  app.use(populateUserData);
  app.use(customHandler); // TODO remove
  app.all("/graphql", createHandler({
    schema,
    // context; logged in user, or access to a database.
  }));
  app.use(addSecurityHeaders);

  return app;
};
