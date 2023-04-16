import { type NextFunction, type Request, type Response } from "express";
import { type Document } from "mongoose";
import { v4 as v4uuid } from "uuid";

import { COOKIE_NAME } from "./constants";
import { type Session, SessionModel } from "../models/session";
import { type Context } from "../typings/context";

export const populateContextData = (
  contextData: Context
) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  contextData.response = res;
  contextData.request = req;
  contextData.session = undefined;

  await updateContextSession(req, res, contextData);

  next();
};

/**
 * Logic does not cover cases when same uuid is sent multiple times
 * Considered case for browser to take the Set-Cookie header and send new uuid each time
 */
const updateContextSession = async (
  req: Request,
  res: Response,
  contextData: Context
): Promise<void> => {
  const cookies = parseCookies(req);
  const expires = cookies["Expires"];
  const uuid = cookies[COOKIE_NAME];

  if (!expires || !uuid) return;

  let session = await SessionModel.findOneAndUpdate(
    { uuid },
    {
      $set:{
        expired: new Date(expires) < new Date()
      }
    },
    {
      returnDocument: "after",
    }
  );

  if (!session) return;

  if (session.expired){
    session = await getSession(session.user_id, res);
  }

  contextData.session = session;
};

export const getSession = async (
  user_id: string,
  response: Response
): Promise<Session & Document> => {
  const newSession = new SessionModel({
    user_id,
    uuid: v4uuid()
  });
  const sessionResult = await newSession.save();
  const date = new Date();

  date.setHours(date.getHours() + 24);

  response.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${sessionResult.uuid}; SameSite=Lax; Secure; HttpOnly; Expires=${date.toISOString()}`,
  );

  return sessionResult;
};

export const parseCookies = (request: Request): Record<string, string> => {
  const list: Record<string, string> = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach(function(cookie: string) {
    // eslint-disable-next-line prefer-const
    let [ name, ...rest] = cookie.split("=");
    name = name?.trim();

    if (!name) return;

    const value = rest.join("=").trim();

    if (!value) return;

    list[name] = decodeURIComponent(value);
  });

  return list;
};
