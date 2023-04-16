import {
  type GraphQLFieldConfig,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean
} from "graphql";

import type { Round, UserRoundProps } from "../../models/round";
import type { Context } from "../../typings/context";

import { type ChoiceName } from "../../models/choices";
import { getRoomById } from "../../resolvers/room/helpers";
import { roundEndResolver, roundPlayResolver, roundStartResolver } from "../../resolvers/round";
import { choiceEnum, fieldError, responseData } from "../common";
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
    host:{
      type: userRoundPropsType
    },
    guest:{
      type: userRoundPropsType
    },
    winner: {
      type: userType,
      resolve: async (round: Round) => {
        if (!round.winner) return null;

        return await getUserById(round.winner);
      }
    },
    ended:{
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  }),
});

export type RoundStartArgs = Pick<Round, "room">

const roundStartResponseType = new GraphQLObjectType({
  name: "RoundStart",
  description: "Round start",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roundType
    }
  }),
  interfaces: [responseData]
});

/**
 * Round start api is Room.type agnostic
 */
export const roundStart: GraphQLFieldConfig<any, Context, RoundStartArgs> = {
  type: roundStartResponseType,
  args: {
    room: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: roundStartResolver
};

export interface RoundEndArgs {
  _id: string
}

const roundStopResponseType = new GraphQLObjectType({
  name: "RoundStop",
  description: "Round stop type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roundType
    }
  }),
  interfaces: [responseData]
});

/**
 * Round end api is Room.type agnostic
 */
export const roundEnd: GraphQLFieldConfig<any, Context, RoundEndArgs> = {
  type: roundStopResponseType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: roundEndResolver
};

export type RoundPlayArgs = Pick<Round, "_id"> & {
  choice: ChoiceName
}

const rondPlayType = new GraphQLObjectType({
  name: "RoundPlay",
  description: "Round play type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roundType
    }
  }),
  interfaces: [responseData]
});

export const roundPlay: GraphQLFieldConfig<any, Context, RoundPlayArgs>= {
  type: rondPlayType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    choice:{
      type: new GraphQLNonNull(choiceEnum)
    }
  },
  resolve: roundPlayResolver
};
