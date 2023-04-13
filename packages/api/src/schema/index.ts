import {
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";

import { choiceType } from "./choices";
import { userType } from "./user";
import { choice, choices } from "../resolvers/choices";
import { login } from "../resolvers/user";

export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    choices,
    choice,
  })
});

export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login,
    // logout,
    // me:
  })
});

export const schema = new GraphQLSchema({
  query: queryType,
  // mutation: mutationType,
  types: [
    userType,
    choiceType,
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
