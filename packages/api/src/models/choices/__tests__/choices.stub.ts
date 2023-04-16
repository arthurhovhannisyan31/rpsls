import { mockDate, mockId } from "../../utils";
import { type Choice } from "../choices";
import { ChoiceValue } from "../enums";

export const choicesStub: Choice = {
  _id: mockId,
  value: ChoiceValue.ROCK,
  name: "ROCK",
  createdAt: mockDate,
  updatedAt: mockDate
};
