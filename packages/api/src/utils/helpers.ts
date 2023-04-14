import { type NextFunction, type Request, type Response } from "express";
import { type Document } from "mongoose";
import { v4 as v4uuid } from "uuid";

import { COOKIE_NAME } from "./constants";
import { type Session, SessionModel } from "../models/session";
import { type Context } from "../typings/context";

export const customCorsCheck = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  return next();
};

export const addSecurityHeaders = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader("X-XSS-Protection", "1;mode=block");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Content-Security-Policy", "script-src 'self'");

  return next();
};

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
        updatedAt: Date.now(),
        expired: new Date(expires) < new Date()
      }
    },
    {
      returnDocument: "after"
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

const parseCookies = (request: Request): Record<string, string> => {
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
