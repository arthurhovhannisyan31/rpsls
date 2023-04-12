import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql/type";
import { type GraphQLFieldConfig } from "graphql/type/definition";

// import { commonTimeStamps } from "../../schema/common";

export const userType = new GraphQLObjectType({
  name: "User",
  description: "Any real person",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "User name"
    },
  }),
  // interfaces: [commonTimeStamps]
});

// export const userQueryResolver: GraphQLFieldConfig<any, any, any> = {
//   type: userType,
// })

// TODO Replace with generated types
interface CreateUserArgs {
  name: string;
}

export const login: GraphQLFieldConfig<any, any, CreateUserArgs> = {
  type: userType,
  args: {
    name: {
      description: "name of the user",
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: (_source, { name }, context, info): Promise<number> => {
    console.log(_source);
    console.log(name);
    console.log(context);
    console.log(info);

    return Promise.resolve(1);
  }
};
