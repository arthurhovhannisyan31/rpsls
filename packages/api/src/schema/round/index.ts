import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql/type";

import { type Round, type UserRoundProps } from "../../models/round";
import { getRoomById } from "../../resolvers/room/helpers";
import { choiceEnum } from "../common";
import { roomType } from "../room";
import { userType } from "../user";
import { getUserById } from "../user/helpers";

const userRoundPropsType = new GraphQLObjectType({
  name: "UserRoundProps",
  description: "User props per round",
  fields: () => ({
    user: {
      type: userType,
      resolve: async (userRoundProps1: UserRoundProps) => {
        if (!userRoundProps1.user) return null;

        return await getUserById(userRoundProps1.user);
      }
    },
    choice: {
      type: choiceEnum
    },
    choice_change_count: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

export const roundType = new GraphQLObjectType({
  name: "Round",
  description: "Game round",
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID),
    },
    room: {
      type: roomType,
      resolve: async (round: Round) => getRoomById(round.room)
    },
    hostProps:{
      type: userRoundPropsType
    },
    guestProps:{
      type: userRoundPropsType
    },
    winner: {
      type: userType,
      resolve: async (round: Round) => {
        if (!round.winner) return null;

        return await getUserById(round.winner);
      }
    }
  }),
});
