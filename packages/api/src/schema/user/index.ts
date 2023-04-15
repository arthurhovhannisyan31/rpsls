import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const userType = new GraphQLObjectType({
  name: "User",
  description: "Any real person",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
