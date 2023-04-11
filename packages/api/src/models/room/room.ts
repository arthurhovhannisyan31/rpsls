import mongoose, { type Document, Schema } from "mongoose";

import { type RoomStatus, type RoomType } from "./enums";
import { type ModelDefaultFields } from "../types";
import { defaultFields, regExps } from "../utils";

export interface Room extends ModelDefaultFields{
  _id: string;
  type: RoomType;
  name:  string;
  host_id: string;
  guest_id: string;
  status: RoomStatus;
  active: boolean;
}

const roomSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    match: regExps.modelString,
  },
  host_id: {
    type: String,
    required: true,
  },
  guest_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  ...defaultFields,
});

export const RoomModel = mongoose.model<Room & Document>(
  "Room",
  roomSchema,
  "rooms"
);
