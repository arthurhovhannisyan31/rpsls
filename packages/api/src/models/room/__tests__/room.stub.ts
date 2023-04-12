import type { Room } from "models/room";

import { mockDate, mockId } from "../../utils";
import { RoomStatus, RoomType } from "../enums";

export const roomDataStub: Room = {
  _id: mockId,
  type: RoomType.PVC,
  name:  "name",
  host_id: mockId,
  guest_id: mockId,
  status: RoomStatus.Open,
  active: true,
  createdAt: mockDate,
  updatedAt: mockDate
};
