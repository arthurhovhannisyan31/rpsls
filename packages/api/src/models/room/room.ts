import mongoose, { type Document, Schema } from "mongoose";

import type { RoomType } from "./enums";
import type { ModelDefaultFields } from "../types";

import { regExps } from "../utils";

export interface Room extends ModelDefaultFields {
  _id: string;
  roomType: RoomType;
  name:  string;
  host: string;
  guest: string | null;
  open: boolean;
  active: boolean;
}

const roomSchema = new Schema({
  roomType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    match: regExps.modelString,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  open: {
    type: Boolean,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

export const RoomModel = mongoose.model<Room & Document>(
  "Room",
  roomSchema,
  "rooms"
);
