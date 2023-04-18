import { v4 as v4uuid } from "uuid";

import type { Context } from "../../typings/context";
import type { Request, Response } from "express";
import type { Document } from "mongoose";

import { type Session, SessionModel } from "../../models/session";
import { isSessionExpired } from "../../resolvers/user/helpers";
import { COOKIE_NAME } from "../constants";

/**
 * Logic does not cover cases when same uuid is sent multiple times
 * Considered case for browser to take the Set-Cookie header and send new uuid each time
 */
export const updateContextSession = async (
  req: Request,
  res: Response,
  contextData: Context
): Promise<void> => {
  const cookies = parseCookies(req);
  const uuid = cookies[COOKIE_NAME];
  if (!uuid) return;

  let session = await SessionModel.findOne({ uuid });
  if (!session) return;

  if (isSessionExpired(session)) {
    session = await getSession(session.user_id, res);
  }
  if (!session) return;

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
    `${COOKIE_NAME}=${sessionResult.uuid}; Secure; HttpOnly; Expires=${date.toUTCString()}; Path=/`,
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
