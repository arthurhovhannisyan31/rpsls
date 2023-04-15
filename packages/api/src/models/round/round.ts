import mongoose, { type Document, Schema } from "mongoose";

import { type ChoiceValue } from "../choices";
import { type ModelDefaultFields } from "../types";

export interface UserRoundProps {
  user: string;
  choice: ChoiceValue;
  choice_change_count: number;
}

const userRoundSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  choice:{
    type: Number
  },
  choice_change_count: {
    type: Number,
    required: true,
    default: 0
  }
});

export interface Round extends ModelDefaultFields{
  _id: string;
  room: string;
  host: UserRoundProps;
  guest: UserRoundProps;
  winner: string | null;
  ended: boolean;
}

const roundSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  host: userRoundSchema,
  guest: userRoundSchema,
  winner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ended: {
    type: Boolean,
    required: true,
    default: false,
  }
},{ timestamps: true });

export const RoundModel = mongoose.model<Round & Document>(
  "Round",
  roundSchema,
  "rounds"
);
