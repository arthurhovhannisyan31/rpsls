import { type Request, type Response } from "express";

import { type SSEClient } from "./types";
import { sse_headers } from "../configs";

export class SSEManager {
  clients: SSEClient[];

  constructor() {
    this.clients = [];
  }

  public sendEventsToAll(data: any): void{
    this.clients.forEach(client => client.response.write(`data: ${JSON.stringify(data)}\n\n`));
  }

  public notify = (
    request: Request,
    response: Response,
  ): void => {
    const newFact = request.body;
    response.json(newFact);

    this.sendEventsToAll(newFact);
  };

  public subscribe = (
    request: Request,
    response: Response,
  ): void => {
    const clientId = request.body;
    const newClient: SSEClient = {
      id: clientId,
      response
    };

    response.writeHead(200, sse_headers);

    const data = `data: ${JSON.stringify({
      type: "user:joined",
      payload: clientId
    })}\n\n`;

    response.write(data);

    this.clients.push(newClient);

    request.on("close", () => {
      this.sendEventsToAll({
        type: "",
        payload: ""
      });
      this.clients = this.clients.filter(client => client.id !== clientId);
    });
  };
}
