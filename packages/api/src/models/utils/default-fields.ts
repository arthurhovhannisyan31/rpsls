import { type SchemaDefinition } from "mongoose";

export const defaultFields: SchemaDefinition = {
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
};
