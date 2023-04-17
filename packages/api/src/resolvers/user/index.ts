import { GraphQLError } from "graphql";

import type { ResponseData } from "../../schema/types";
import type { CreateUserArgs } from "../../schema/user";
import type { Context } from "../../typings/context";

import { isSessionExpired } from "./helpers";
import { SessionModel } from "../../models/session";
import { UserModel, type User } from "../../models/user";
import { COOKIE_NAME } from "../../utils/constants";
import { getSession } from "../../utils/middlewares/session";

export const loginResolver = async (
  _: any,
  { name }: CreateUserArgs,
  { response, session }: Context
): Promise<ResponseData<User>> => {
  try {
    const user = await UserModel.findOne({ name });

    if (user){
      if (session?.user_id === user.id){
        /**
         * Has valid credentials for the desired user
         */

        return {
          data: user
        };
      } else {
        /**
         * Hasn't valid credentials for the desired user but
         * if the user is abandoned or logged out it is free to be taken
         */
        const existingUserSession = await SessionModel.findOne({
          user_id: user.id
        });

        if (!existingUserSession || isSessionExpired(existingUserSession)){
          await getSession(user.id, response);

          return {
            data: user
          };
        }
      }

      /**
       * Has session but wants to take somebody else's user
       */
      return {
        errors: [{
          path: "login",
          message: `User: ${name} is active`
        }]
      };
    }

    /**
     * New user, new session
     */
    const newUser = new UserModel({
      name
    });

    const userResult = await newUser.save();

    await getSession(userResult._id, response);

    return {
      data: userResult
    };
  } catch (err){
    throw new GraphQLError(
      (err as Error).message,
      {
        originalError: (err as Error)
      }
    );
  }
};

export const logoutResolver = async (
  _: any,
  __: any,
  { response, session }: Context
): Promise<void>=> {
  if (session?.uuid){
    await SessionModel.findOneAndDelete({ uuid: session.uuid });
  }

  response.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=""; SameSite=Lax; Secure; HttpOnly; Expires=${Date.now()}`,
  );
};

export const meResolver = async (
  _: any,
  __: any,
  { session }: Context
): Promise<ResponseData<User>> => {
  try {
    if (!session?.uuid) {
      return {
        errors: [{
          path: "me",
          message: "Session not found!"
        }]
      };
    }

    const user = await UserModel.findById(session.user_id);

    if (!user){
      return {
        errors: [{
          path: "me",
          message: "User not found!"
        }]
      };
    }

    return {
      data: user
    };
  } catch (err){
    throw new GraphQLError(
      "Internal server error",
      {
        originalError: err as Error,
      }
    );
  }
};
