import type { Round } from "models/round";

import { ChoiceValue } from "../../choices";
import { mockDate, mockId } from "../../utils";

export const roundDataStub: Round = {
  _id: mockId,
  room: mockId,
  host: {
    user: mockId,
    choice: ChoiceValue.Spock,
    choice_change_count: 1
  },
  guest: {
    user: mockId,
    choice: ChoiceValue.Spock,
    choice_change_count: 1
  },
  winner: mockId,
  createdAt: mockDate,
  updatedAt: mockDate,
  ended: false
};
