import mongoose, { type Document, Schema } from "mongoose";

import { type ModelDefaultFields } from "../types";

export interface Session extends ModelDefaultFields{
  _id: string;
  uuid: string;
  user_id:   string;
  expired: boolean;
  createdAt: string;
  updatedAt: string;
}

const sessionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  uuid:{
    type: String,
    required: true,
  },
  expired:{
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const SessionModel = mongoose.model<Session & Document>(
  "Session",
  sessionSchema,
  "sessions"
);
