import { GraphQLError } from "graphql";

import { type User, UserModel } from "../../models/user";

export const getSingleUser = async (id: string): Promise<User> => {

  const user = await UserModel.findById(id);
  if (!user) throw new GraphQLError("User not found");

  return user;
};
