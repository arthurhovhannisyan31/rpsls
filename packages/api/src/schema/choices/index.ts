import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { commonTimeStamps } from "../common";

export const choiceType = new GraphQLObjectType({
  name: "Choice",
  description: "Game choice",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
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
