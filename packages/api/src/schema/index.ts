import {
  GraphQLSchema,
} from "graphql";
import { GraphQLObjectType } from "graphql/index";

import { droidType, humanType, queryType } from "./sw-schema";
import { login, userType } from "./user";

export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login: login,
    // logout,
    // me:
  })
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: [
    humanType,
    droidType,
    userType
  ],
  // subscription: new GraphQLObjectType({
  //   name: "Subscription",
  //   fields: {
  //     greetings: {
  //       type: GraphQLString,
  //       subscribe: async function* () {
  //         for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
  //           yield { greetings: hi };
  //         }
  //       },
  //     },
  //   },
  // }),
});
