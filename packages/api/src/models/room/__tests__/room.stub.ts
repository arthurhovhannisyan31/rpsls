import type { Room } from "models/room";

import { RoomType } from "../../../typings/enum";
import { mockDate, mockId } from "../../utils";

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
