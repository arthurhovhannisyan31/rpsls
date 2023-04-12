import { GraphQLInterfaceType, GraphQLNonNull } from "graphql/index";
import { GraphQLString } from "graphql/type";

export const commonTimeStamps = new GraphQLInterfaceType({
  name: "Common timestamps",
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
