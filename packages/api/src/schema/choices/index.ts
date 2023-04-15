import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLID } from "graphql/type/scalars";

export const choiceType = new GraphQLObjectType({
  name: "Choice",
  description: "Game choice",
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
});
