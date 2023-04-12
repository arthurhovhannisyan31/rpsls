import { type Session } from "models/session";
import { mockId, mockDate } from "models/utils";

export const sessionDataStub: Session = {
  _id: mockId,
  user_id:   mockId,
  createdAt: mockDate,
  updatedAt: mockDate
};
