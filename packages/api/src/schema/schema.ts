import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { choiceType } from "./choices";
import { sessionType } from "./session";
import { userType } from "./user";
import { choice, choices } from "../resolvers/choices";
import { login, logout, me } from "../resolvers/user";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    choices,
    choice,
    me
  })
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login,
    logout
  })
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: [
    userType,
    choiceType,
    sessionType
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
