import type { Round } from "models/round";

import { ChoiceName } from "../../choices";
import { mockDate, mockId } from "../../utils";

export const roundDataStub: Round = {
  _id: mockId,
  room: mockId,
  host: {
    user: mockId,
    choice: ChoiceName.ROCK,
  },
  guest: {
    user: mockId,
    choice: ChoiceName.ROCK,
  },
  winner: mockId,
  createdAt: mockDate,
  updatedAt: mockDate,
  ended: false
};
