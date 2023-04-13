import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLID } from "graphql/type/scalars";

import { commonTimeStamps, room, roomStatus } from "../common";

export const roomType = new GraphQLObjectType({
  name: "Room",
  description: "Room object",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLList(room)
    },
    host: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (id: any) => {
        console.log(id);
        console.log("try to resolve Room host");
      }
    },
    guest: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (id: any) => {
        console.log(id);
        console.log("try to resolve Room guest");
      }
    },
    status: {
      type: new GraphQLNonNull(roomStatus),
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
