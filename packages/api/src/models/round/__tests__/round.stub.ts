import type { Round } from "models/round";

import { ChoiceValue } from "../../choices";
import { mockDate, mockId } from "../../utils";

export const roundDataStub: Round = {
  _id: mockId,
  room_id: mockId,
  host_choice: ChoiceValue.Rock,
  guest_choice: ChoiceValue.Rock,
  winner_id: mockId,
  createdAt: mockDate,
  updatedAt: mockDate
};
