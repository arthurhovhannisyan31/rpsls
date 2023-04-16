import { type Response } from "express";

export interface SSEClient {
  id: string;
  response: Response;
}
