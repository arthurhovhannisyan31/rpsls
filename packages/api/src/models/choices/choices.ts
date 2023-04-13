import mongoose, { type Document, Schema } from "mongoose";

import { type ModelDefaultFields } from "../types";
import { defaultFields } from "../utils";

export interface Choice extends ModelDefaultFields {
  _id: string;
  id: number;
  name: string;
}

const choiceModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  ...defaultFields,
});

export const ChoiceModel = mongoose.model<Choice & Document>(
  "Choice",
  choiceModel,
  "choices"
);
