import mongoose, { type Document, Schema } from "mongoose";

import { type ChoiceValue } from "../choices";
import { type ModelDefaultFields } from "../types";
import { defaultFields } from "../utils";

export interface Round extends ModelDefaultFields{
  _id: string;
  room_id: string;
  host_choice: ChoiceValue;
  guest_choice: ChoiceValue;
  winner_id: string;
}

const roundSchema = new Schema({
  room_id: {
    type: String,
    required: true,
  },
  host_choice: {
    type: Number,
    required: true,
  },
  guest_choice: {
    type: Number,
    required: true,
  },
  winner_id:{
    type: String,
    required: true,
  },
  ...defaultFields,
});

export const RoundModel = mongoose.model<Round & Document>(
  "Round",
  roundSchema,
  "rounds"
);
