import {
  type GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLError, GraphQLInt
} from "graphql";

import type { ResponseData } from "../../schema/types";
import type { Context } from "../../typings/context";

import { type Round, RoundModel, type UserRoundProps } from "../../models/round";
import { fieldError, responseData } from "../../schema/common";
import { roundType } from "../../schema/round";

type RoundStartArgs = Pick<Round, "room"|"host"|"guest">

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
    host: {
      type: new GraphQLNonNull(GraphQLString)
    },
    guest: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_, { room, host, guest }, { session }): Promise<ResponseData<Round>> => {
    try {
      if (!session){

        return {
          errors: [{
            path: "round",
            message: "Session not found!"
          }]
        };
      }

      const newRound = new RoundModel({ room, host, guest });

      const roundResponse = await newRound.save();

      return {
        data: roundResponse
      };
    } catch (err){
      throw new GraphQLError(
        (err as Error).message,
        {
          originalError: (err as Error)
        }
      );
    }
  }
};

interface RoundEndArgs {
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
  resolve: async (_, { _id },{ session }): Promise<ResponseData<Round>> => {
    try {
      if (!session){

        return {
          errors: [{
            path: "round",
            message: "Session not found!"
          }]
        };
      }

      const round = await RoundModel.findById(_id);

      if (!round){

        return {
          errors: [{
            path: "round",
            message: "Round not found!"
          }]
        };
      }

      if (
        ![round.host.user.toString(), round.guest.toString()]
          .includes(session.user_id)
      ){

        return {
          errors: [{
            path: "round",
            message: "Round should be ended by the players!"
          }]
        };
      }

      if (round.ended){

        return {
          errors: [{
            path: "round",
            message: "Round is ended!"
          }]
        };
      }

      /**
       * At the time when round ends both users should have made their choices
       * During making choices the winner changes dynamically and last choices pair makes winner
       * If one of the users haven't made a choice, the other user wins
       */
      let winner = null;
      if (!round.winner){
        winner = round.host.choice ? round.host.user : round.host.user;
      }

      const result = await RoundModel.findByIdAndUpdate(
        _id,
        {
          $set:{
            winner,
            ended: true
          }
        },
        { returnDocument: "after" }
      );

      if (!result){

        return {
          errors: [{
            path: "roundEnd",
            message: "Error updating round!",
          }]
        };
      }

      return {
        data: result
      };
    } catch (err){
      throw new GraphQLError(
        (err as Error).message,
        {
          originalError: (err as Error)
        }
      );
    }
  }
};

interface RoundPlayArgs {
  _id: string;
  choice: number;
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
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (_, { _id, choice }, { session }): Promise<ResponseData<Round>> => {
    try {
      // PVP
      // PVC

      if (!session){

        return {
          errors: [{
            path: "round",
            message: "Session not found!"
          }]
        };
      }

      const round = await RoundModel.findById(_id);

      if (!round){

        return {
          errors: [{
            path: "round",
            message: "Round not found!"
          }]
        };
      }

      if (
        ![round.host.user.toString(), round.guest.toString()]
          .includes(session.user_id)
      ){

        return {
          errors: [{
            path: "round",
            message: "Round should be played by the players!"
          }]
        };
      }

      const isHost = session.user_id === round.host.user.toString();

      const userProps: UserRoundProps = isHost ? round.host : round.guest;

      userProps.choice = choice;
      userProps.choice_change_count += 1;

      const updatePropsKey = isHost ? "host" : "guest";

      const roundResponse = await RoundModel.findByIdAndUpdate(
        _id,
        {
          $set:{
            [updatePropsKey]: userProps
          }
        },
        { returnDocument:"after" }
      );

      if (!roundResponse){
        return {
          errors:[{
            path: "roundPlay",
            message: "Error saving round play!"
          }]
        };
      }

      return {
        data: roundResponse
      };

    } catch (err){
      throw new GraphQLError(
        (err as Error).message,
        {
          originalError: (err as Error)
        }
      );
    }
  }
};
