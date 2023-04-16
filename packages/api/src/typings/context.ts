import { type Response, type Request } from "express";

import { type Session } from "../models/session";

export interface Context<Req = Request, Res = Response> {
  request: Req;
  response: Res;
  session?: Session;
  [key: string | symbol]: any; // need to satisfy OperationContext type
}
