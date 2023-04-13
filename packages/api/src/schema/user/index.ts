import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { commonTimeStamps } from "../common";

export const userType = new GraphQLObjectType({
  name: "User",
  description: "Any real person",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
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
