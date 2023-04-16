import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import { choiceType , choice, choices } from "./choices";
import { roomType , createRoom, room, rooms, updateRoom } from "./room";
import { roundEnd, roundPlay, roundStart } from "./round";
import { userType , login, logout, me } from "./user";

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
    updateRoom,
    roundStart,
    roundEnd,
    roundPlay
  })
});

const subscriptionType =new GraphQLObjectType({
  name: "Subscription",
  fields: {
    greetings: {
      type: GraphQLString,
      subscribe: async function* () {
        for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
          yield { greetings: hi };
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  subscription: subscriptionType,
  types: [
    userType,
    choiceType,
    roomType
  ]
});
