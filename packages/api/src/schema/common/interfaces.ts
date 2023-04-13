import {
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";

export const commonTimeStamps = new GraphQLInterfaceType({
  name: "CommonTimeStamps",
  description: "Creation and update timestamps",
  fields: () => ({
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Creation time"
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Update time"
    }
  })
});

export const fieldError = new GraphQLInterfaceType({
  name: "FieldError",
  description: "Field error",
  fields: () => ({
    field: {
      type: new GraphQLNonNull(GraphQLString),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    }
  })
});

export const responseData = new GraphQLInterfaceType({
  name: "ResponseData",
  description: "Response data",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
  }),
  // TODO find a way to pass "data" prop as generic
});
