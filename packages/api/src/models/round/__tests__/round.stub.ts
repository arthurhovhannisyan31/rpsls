import {  type Round } from "models/round";
import { mockDate, mockId } from "models/utils";

import { Choice } from "../enums";

export const roundDataStub: Round = {
  _id: mockId,
  room_id: mockId,
  host_choice: Choice.Rock,
  guest_choice: Choice.Rock,
  winner_id: mockId,
  createdAt: mockDate,
  updatedAt: mockDate
};
