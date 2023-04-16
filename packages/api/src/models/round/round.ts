import mongoose, { type Document, Schema } from "mongoose";

import type { ChoiceName } from "../choices";
import type { ModelDefaultFields } from "../types";

export interface UserRoundProps {
  user: string;
  choice: ChoiceName;
}

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
  host: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    choice:{
      type: String,
      default: null
    },
  },
  guest: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    choice:{
      type: String,
      default: null
    },
  },
  winner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ended: {
    type: Boolean,
    required: true,
    default: false,
  },
},{ timestamps: true });

export const RoundModel = mongoose.model<Round & Document>(
  "Round",
  roundSchema,
  "rounds"
);
