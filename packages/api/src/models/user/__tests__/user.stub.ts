import type { User } from "models/user";

import { mockDate, mockId } from "../../utils";

export const userDataStub: User = {
  _id: mockId,
  name: "name",
  createdAt: mockDate,
  updatedAt: mockDate
};
