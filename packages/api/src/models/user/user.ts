import mongoose, { type Document, Schema } from "mongoose";

import { defaultFields, regExps } from "models/utils";

import { type ModelDefaultFields } from "../types";

// TODO Replace with generated types
export interface User extends ModelDefaultFields{
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
