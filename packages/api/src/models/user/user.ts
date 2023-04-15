import mongoose, { type Document, Schema } from "mongoose";

import type { ModelDefaultFields } from "../types";

import { defaultFields, regExps } from "../utils";

export interface User extends ModelDefaultFields {
  _id: string;
  name: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: regExps.modelString,
  },
  ...defaultFields,
});

export const UserModel = mongoose.model<User & Document>(
  "User",
  userSchema,
  "users"
);
