import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLID } from "graphql/type/scalars";

import { type Room } from "../../models/room";
import { roomEnum } from "../common";
import { userType } from "../user";
import { getUserById } from "../user/helpers";

export const roomType = new GraphQLObjectType({
  name: "Room",
  description: "Room object",
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    roomType: {
      type: new GraphQLNonNull(roomEnum)
    },
    host: {
      type: new GraphQLNonNull(userType),
      resolve: async (room: Room) => await getUserById(room.host)
    },
    guest: {
      type: userType,
      resolve: async (room: Room) => {
        if (!room?.guest) return null;

        return  await getUserById(room.guest);
      }
    },
    open: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
  })
});
