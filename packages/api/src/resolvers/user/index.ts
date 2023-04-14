import {
  type GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from "graphql";

import { SessionModel } from "../../models/session";
import { UserModel ,type User } from "../../models/user";
import { fieldError, responseData } from "../../schema/common";
import { type ResponseData } from "../../schema/types";
import { userType } from "../../schema/user";
import { type Context } from "../../typings/context";
import { COOKIE_NAME } from "../../utils/constants";
import { getSession } from "../../utils/helpers";
import { isSessionExpired } from "../session/helpers";

interface CreateUserArgs {
  name: string;
}

const loginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  description: "Login response type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: userType
    }
  }),
  interfaces: [responseData]
});

export const login: GraphQLFieldConfig<any, Context, CreateUserArgs> = {
  type: loginResponseType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: async (_, { name }, { response, session }): Promise<ResponseData<User>> => {
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
            field: "username",
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
        data: newUser
      };
    } catch (err){
      /**
       * Fatal error
       */
      return {
        errors: [{
          field: "login",
          message: "Internal server error"
        }]
      };
    }
  },
};

const logoutResponseType = new GraphQLObjectType({
  name: "LogoutResponse",
  description: "Logout response type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: GraphQLBoolean
    }
  }),
  interfaces: [responseData]
});

export const logout: GraphQLFieldConfig<any, Context> = {
  type: logoutResponseType,
  resolve: async (_, __, { response, session }): Promise<void>=> {
    if (session?.uuid){
      await SessionModel.findOneAndDelete({ uuid: session.uuid });
    }

    response.setHeader(
      "Set-Cookie",
      `${COOKIE_NAME}=""; SameSite=Lax; Secure; HttpOnly; Expires=${Date.now()}`,
    );
  }
};

const meResponseType = new GraphQLObjectType({
  name: "MeResponse",
  description: "Me response type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: userType
    }
  }),
  interfaces: [responseData]
});

export const me: GraphQLFieldConfig<any, Context> = {
  type: meResponseType,
  resolve: async (_, __, { session }): Promise<ResponseData<User>> => {
    try {
      if (!session?.uuid) {
        return {
          errors: [{
            field: "me",
            message: "Session not found!"
          }]
        };
      }

      const user = await UserModel.findById(session.user_id);

      if (!user){
        return {
          errors: [{
            field: "me",
            message: "User not found!"
          }]
        };
      }

      return {
        data: user
      };
    } catch (err){
      return {
        errors: [{
          field: "me",
          message: "Internal server error"
        }]
      };
    }
  }
};
