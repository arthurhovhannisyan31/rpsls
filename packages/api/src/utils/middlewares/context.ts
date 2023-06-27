import { type NextFunction, type Request, type Response } from "express";

import { updateContextSession } from "./session";
import { type Context } from "../../typings/context";

export const populateContextData = (
  contextData: Context
) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("BE ", req.path);

  contextData.response = res;
  contextData.request = req;
  contextData.session = undefined;

  await updateContextSession(req, res, contextData);

  next();
};
