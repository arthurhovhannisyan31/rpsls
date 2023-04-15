import { GraphQLError } from "graphql/error";

import { type Room, RoomModel } from "../../models/room";

export const getRoomById = async (id: string): Promise<Room> => {
  const room = await RoomModel.findById(id);
  if(!room) throw new GraphQLError("Room not found");

  return room;
};
