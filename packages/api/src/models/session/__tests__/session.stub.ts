import type { Session } from "models/session";

import { mockDate, mockId } from "../../utils";

export const sessionDataStub: Session = {
  _id: mockId,
  uuid: mockId,
  user_id:   mockId,
  expired: false,
  createdAt: mockDate,
  updatedAt: mockDate
};
