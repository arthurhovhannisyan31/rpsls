import { type Request, type Response } from "express";
import { v4 as v4uuid } from "uuid";

import { type SSEClient } from "./types";
import { sse_headers } from "../configs";
import { createAction } from "../createAction";

export class SSEManager {
  clients: SSEClient[];

  constructor() {
    this.clients = [];
  }

  public sendEventsToAll(data: Action<any>): void{
    console.log("Send Events To All");
    this.clients.forEach(client => {
      console.log("send to", client.id);

      client.response.write(`data: ${JSON.stringify(data)}\n\n`);
    });
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
    const clientId = v4uuid();
    const newClient: SSEClient = {
      id: clientId,
      response
    };

    response.writeHead(200, sse_headers);

    const data = `data: ${JSON.stringify(createAction("user:joined", clientId))};\n\n`;

    response.write(data);

    this.clients.push(newClient);

    request.on("close", () => {
      console.log("CONNECTION CLOSED", clientId);

      this.sendEventsToAll(
        createAction(
          "DISCONNECT",
          clientId
        )
      );
      this.clients = this.clients.filter(client => client.id !== clientId);
    });
  };
}
