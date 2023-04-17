import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  type GraphQLFieldConfig,
  GraphQLList,
} from "graphql";

import { type User } from "../../models/user";
import { loginResolver, logoutResolver, meResolver } from "../../resolvers/user";
import { type Context } from "../../typings/context";
import { fieldError, responseData } from "../common";

export const userType = new GraphQLObjectType({
  name: "User",
  description: "Any real person",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export type CreateUserArgs = Pick<User, "name">

const loginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  description: "Login response type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
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
  resolve: loginResolver
};

const logoutResponseType = new GraphQLObjectType({
  name: "LogoutResponse",
  description: "Logout response type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: GraphQLBoolean
    }
  }),
  interfaces: [responseData]
});

export const logout: GraphQLFieldConfig<any, Context> = {
  type: logoutResponseType,
  resolve: logoutResolver
};

const meResponseType = new GraphQLObjectType({
  name: "MeResponse",
  description: "Me response type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: userType
    }
  }),
  interfaces: [responseData]
});

export const me: GraphQLFieldConfig<any, Context> = {
  type: meResponseType,
  resolve: meResolver
};
