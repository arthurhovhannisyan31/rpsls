import mongoose, { type Document, Schema } from "mongoose";

import { type ModelDefaultFields } from "../types";

export interface Choice extends ModelDefaultFields {
  _id: string;
  value: number;
  name: string;
}

const choiceModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const ChoiceModel = mongoose.model<Choice & Document>(
  "Choice",
  choiceModel,
  "choices"
);
