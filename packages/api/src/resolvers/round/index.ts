import { GraphQLError } from "graphql";

import type { RoundEndArgs, RoundStartArgs, RoundPlayArgs } from "../../schema/round";
import type { ResponseData } from "../../schema/types";
import type { Context } from "../../typings/context";

import { getRandomChoiceName, playByNames } from "./helpers";
import { RoomModel, RoomType } from "../../models/room";
import { type Round, RoundModel } from "../../models/round";

export const roundStartResolver = async (
  _: any,
  { room }: RoundStartArgs,
  { session }: Context
): Promise<ResponseData<Round>> => {
  try {
    if (!session){
      return {
        errors: [{
          path: "roundStart",
          message: "Session not found!"
        }]
      };
    }

    const existingRoom = await RoomModel.findById(room);

    if (!existingRoom){
      return {
        errors: [{
          path: "roundStart",
          message: "Room not found!"
        }]
      };
    }

    if (existingRoom.open || !existingRoom.active){
      return {
        errors: [{
          path: "roundStart",
          message: "Cannot start round in the room!"
        }]
      };
    }

    if (existingRoom.host.toString() !== session.user_id){
      return {
        errors: [{
          path: "roundStart",
          message:  "Round should be started by the host!",
        }]
      };
    }

    const rounds = await RoundModel.find({ room, ended: false });

    if (rounds.length){
      return {
        errors: [{
          path: "roundStart",
          message: "Room has started round!"
        }]
      };
    }

    const newRound = new RoundModel({
      room,
      host: {
        user: existingRoom.host
      },
      guest: {
        user: existingRoom.guest
      }
    });

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
};

// user left
// host left
// none played
// one played
// both played

export const roundEndResolver = async (
  _: any,
  { _id }: RoundEndArgs,
  { session }: Context
): Promise<ResponseData<Round>> => {
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

    if (round.host.user.toString() !== session.user_id){
      return {
        errors: [{
          path: "round",
          message: "Round should be ended by the host!"
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
     * If one of the users haven't made a choice, the other user wins
     */
    let winner = null;
    if (!round.winner){
      if (round.host.choice){
        winner = round.host.user;
      }
      if (round.guest.choice){
        winner = round.guest.user;
      }
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
};

export const roundPlayResolver = async (
  _: any,
  { _id, choice }: RoundPlayArgs,
  { session }: Context
): Promise<ResponseData<Round>> => {
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

    const existingRoom = await RoomModel.findById(round.room);

    if (!existingRoom){
      return {
        errors: [{
          path: "roundStart",
          message: "Room not found!"
        }]
      };
    }

    if (round.ended){
      return {
        errors: [{
          path: "round",
          message: "Round was ended!"
        }]
      };
    }

    if (
      ![round.host.user.toString(), round.guest.user.toString()]
        .includes(session.user_id)
    ){
      return {
        errors: [{
          path: "round",
          message: "Round should be played by the players!"
        }]
      };
    }

    const updateProps: Pick<Round, "host"|"guest"|"winner"|"ended"> = {
      host: round.host,
      guest: round.guest,
      winner: round.winner,
      ended: round.ended
    };

    switch (existingRoom.roomType){
      case RoomType.PVC:{
        updateProps.host.choice = choice;
        updateProps.guest.choice = getRandomChoiceName();

        break;
      }
      case RoomType.PVP:{
        const isHost = session.user_id === round.host.user.toString();
        const updatePropsKey = isHost ? "host" : "guest";

        updateProps[updatePropsKey].choice = choice;
      }
    }

    if (updateProps?.host?.choice && updateProps?.guest?.choice){
      const result = playByNames(updateProps.host.choice, updateProps.guest.choice);
      if (result === 0){
        updateProps.winner = null;
      } else {
        updateProps.winner = result === 1 ?  round.host.user : round.guest.user;
      }
      updateProps.ended = true;
    }

    const roundResponse = await RoundModel.findByIdAndUpdate(
      _id,
      {
        $set: updateProps
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
};
