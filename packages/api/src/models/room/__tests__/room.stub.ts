import type { Room } from "models/room";

import { mockDate, mockId } from "../../utils";
import { RoomType } from "../enums";

export const roomDataStub: Room = {
  _id: mockId,
  roomType: RoomType.PVC,
  name:  "name",
  host: mockId,
  guest: mockId,
  open: true,
  active: true,
  createdAt: mockDate,
  updatedAt: mockDate
};
