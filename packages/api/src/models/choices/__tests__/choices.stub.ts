import { mockDate, mockId } from "../../utils";
import { type Choice } from "../choices";
import { ChoiceName, ChoiceValue } from "../enums";

export const choicesStub: Choice = {
  _id: mockId,
  value: ChoiceValue.Rock,
  name: ChoiceName.Rock,
  createdAt: mockDate,
  updatedAt: mockDate
};
