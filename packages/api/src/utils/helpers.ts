import { type NextFunction, type Request, type Response } from "express";

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

export const populateUserData = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const sid = req.header("SID");
  if (sid){
    console.log(sid);
  }
  // go to sessions and find the user id
  // got to users and find the user id
  // append the user id to request body

  return next();
};
