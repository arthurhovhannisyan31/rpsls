import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

import { commonTimeStamps } from "../common";

export const sessionType = new GraphQLObjectType({
  name: "Session",
  description: "User session",
  fields: () => ({
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (id: any) => {
        console.log(id);
        console.log("try to resolve Session user");
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
