import { Query } from "src/models/generated";

export type RoomsResponse = {
  data?: {
    rooms: Query["rooms"]
  }
}
