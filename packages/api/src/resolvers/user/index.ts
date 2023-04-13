import { type GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";

import { UserModel } from "../../models/user";
import { responseData } from "../../schema/common";

interface CreateUserArgs {
  name: string;
}

export const login: GraphQLFieldConfig<any, any, CreateUserArgs> = {
  type: responseData,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: async (_, { name }) => {
    console.log("login");
    console.log(name);

    const user = UserModel.find({ name });

    if (user){
      console.log(user);

      return {
        errors: [{
          field: name,
          message: "User already exist"
        }]
      };
    }

    return {
      data: {
        name
      }
    };
  },
};
