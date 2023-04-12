import type { Session } from "models/session";

import { mockDate, mockId } from "../../utils";

export const sessionDataStub: Session = {
  _id: mockId,
  user_id:   mockId,
  createdAt: mockDate,
  updatedAt: mockDate
};
