import { GraphQLString } from "graphql";
import {
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql/type";
import { GraphQLID } from "graphql/type/scalars";

import { choice, commonTimeStamps } from "../common";
import { roomType } from "../room";

export const roundType = new GraphQLObjectType({
  name: "Round",
  description: "Game round",
  fields: () => ({
    room: {
      type: new GraphQLNonNull(roomType),
    },
    host_choice: {
      type: choice
    },
    guest_choice: {
      type: choice
    },
    winner: {
      type: GraphQLID,
      resolve: (id: any) => {
        console.log(id);
        console.log("try to resolve Room host");
      }
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
