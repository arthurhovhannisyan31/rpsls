import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { choiceType } from "./choices";
import { roomType } from "./room";
import { sessionType } from "./session";
import { userType } from "./user";
import { choice, choices } from "../resolvers/choices";
import { createRoom, room, rooms, updateRoom } from "../resolvers/room";
import { login, logout, me } from "../resolvers/user";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    choices,
    choice,
    me,
    room,
    rooms
  })
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login,
    logout,
    createRoom,
    updateRoom
  })
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: [
    userType,
    choiceType,
    sessionType,
    roomType
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
