import {
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLList,
 GraphQLObjectType
} from "graphql";

export const fieldError = new GraphQLObjectType({
  name: "FieldError",
  description: "Field error",
  fields: () => ({
    path: {
      type: new GraphQLNonNull(GraphQLString),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }),
});

export const responseData = new GraphQLInterfaceType({
  name: "ResponseData",
  description: "Response data",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
  }),
});
