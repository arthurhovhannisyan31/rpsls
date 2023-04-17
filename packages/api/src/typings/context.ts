import type { Session } from "../models/session";
import type { Response, Request } from "express";

export interface Context<Req = Request, Res = Response> {
  request: Req;
  response: Res;
  session?: Session;
  [key: string|symbol]: any;
}
