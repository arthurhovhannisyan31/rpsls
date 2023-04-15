import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLID } from "graphql/type/scalars";

import { type Room } from "../../models/room";
import { commonTimeStamps, roomEnum } from "../common";
import { userType } from "../user";
import { getSingleUser } from "../user/helpers";

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
      resolve: async (room: Room) => await getSingleUser(room.host)
    },
    guest: {
      type: userType,
      resolve: async (room: Room) => {
        if (room?.guest){
          return  await getSingleUser(room.guest);
        }

        return null;
      }
    },
    open: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Creation time"
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Update time"
    }
  }),
  interfaces: [commonTimeStamps]
});
