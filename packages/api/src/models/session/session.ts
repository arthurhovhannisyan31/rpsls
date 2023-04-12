import mongoose, { type Document, Schema } from "mongoose";

import { defaultFields } from "models/utils";

import { type ModelDefaultFields } from "../types";

export interface Session extends ModelDefaultFields{
  _id: string;
  user_id:   string;
  createdAt: string;
  updatedAt: string;
}

const sessionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  ...defaultFields,
});

export const SchemaModel = mongoose.model<Session & Document>(
  "Session",
  sessionSchema,
  "sessions"
);
