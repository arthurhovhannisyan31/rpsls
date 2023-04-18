import { GraphQLError } from "graphql";

import type { CreateUserArgs, RoomArgs, RoomsArgs, UpdateRoomArgs } from "../../schema/room";
import type { ResponseData } from "../../schema/types";
import type { Context } from "../../typings/context";
import type { FilterQuery } from "mongoose";

import { RoomUpdateAction } from "./enums";
import { type Room, RoomModel } from "../../models/room";
import { UserModel } from "../../models/user";
import { RoomType } from "../../typings/enum";

export const roomResolver = async (
  _:any,
  { _id }:RoomArgs,
  { session }:Context
): Promise<ResponseData<Room>> => {
  try {
    if (!session){
      return {
        errors: [{
          path: "room",
          message: "Session not found!"
        }]
      };
    }

    const existingRoom = await RoomModel.findOne({ _id });

    if (!existingRoom){
      return {
        errors: [{
          path: "room",
          message:  "Room does not exists!",
        }]
      };
    }

    if (!existingRoom.active){
      return {
        errors: [{
          path: "room",
          message:  "Room is not active!",
        }]
      };
    }

    return {
      data: existingRoom
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

export const roomsResolver = async (_: any, { name }:RoomsArgs): Promise<ResponseData<Room[]>> => {
  try {
    const searchParams: FilterQuery<Room> = {
      active: true,
    };

    if (name) {
      searchParams.name = { $regex: name, $options: "i" };
    }

    const rooms = await RoomModel.find(searchParams);

    if(!rooms) {
      return {
        errors: [{
          path: "rooms",
          message: "Rooms not found!"
        }]
      };
    }

    return {
      data: rooms
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

export const createRoomResolver = async (
  _:any,
  { roomType, name }:CreateUserArgs,
  { session }: Context
): Promise<ResponseData<Room>> => {
  try {
    if (!session){
      return {
        errors: [{
          path: "createRoom",
          message: "Session not found!"
        }]
      };
    }

    const room = await RoomModel.findOne({ name });

    if (room){
      return {
        errors: [{
          path: "createRoom",
          message: `Room: ${name} already exists!`
        }]
      };
    }

    let guest = null;

    if (roomType === RoomType.PVC){
      const pcResult = await UserModel.findOne({ name: "PC" });

      if (!pcResult){
        return {
          errors: [{
            path: "createRoom",
            message: "Error fetching PC user"
          }]
        };
      }

      guest = pcResult._id;
    }

    const newRoom = new RoomModel({
      host: session.user_id,
      guest,
      roomType,
      name,
      open: roomType === RoomType.PVP,
      active: true
    });

    const roomResult = await newRoom.save();

    return {
      data: roomResult
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

export const updateRoomResolver = async (
  _: any,
  { _id, action }: UpdateRoomArgs,
  { session }: Context
): Promise<ResponseData<Room>> => {
  try {
    if (!session){
      return {
        errors: [{
          path: "updateRoom",
          message: "Session not found!"
        }]
      };
    }

    const room = await RoomModel.findOne({ _id });

    if (!room){
      return {
        errors: [{
          path: "updateRoom",
          message:  "Room does not exists!",
        }]
      };
    }

    if (!room.active){
      return {
        errors: [{
          path: "updateRoom",
          message: "Room is deactivated!",
        }]
      };
    }

    let roomProps: Partial<Room> = {};

    switch (action){
      case RoomUpdateAction.JOIN: {
        switch (room.roomType){
          case RoomType.PVP:{
            /**
             * User is authenticated but room is not open for joining
             */
            if (!room.open){
              return {
                errors: [{
                  path: "updateRoom",
                  message: "Room is not open to join!",
                }]
              };
            }

            /**
             * User is authenticated and room exists and open
             */
            roomProps = {
              guest: session.user_id,
              open: false
            };
            break;
          }
          case RoomType.PVC:{
            return {
              errors: [{
                path: "updateRoom",
                message: "Room is not open to join!",
              }]
            };
          }
        }
        break;
      }
      case RoomUpdateAction.LEAVE: {
        switch (room.roomType){
          case RoomType.PVP:{
            if (!(
              room.host.toString() === session.user_id ||
              room.guest && room.guest.toString() === session.user_id
            )){
              return {
                errors: [{
                  path: "updateRoom",
                  message:  "User does not belong to the room!",
                }]
              };
            }

            if (session.user_id === room.host.toString()){
              if (!room.open && !!room.guest){
                /**
                 * Host leave, guest is present
                 */
                roomProps = {
                  host: room.guest,
                  guest: null,
                  open: true
                };
              } else {
                /**
                 * Host leave, no guest
                 */
                roomProps = {
                  open: false,
                  active: false
                };
              }
            } else {
              /**
               * Guest leaves, room is open to join
               */
              roomProps = {
                guest: null,
                open: true,
              };
            }
            break;
          }
          case RoomType.PVC:{
            if (room.host.toString() !== session.user_id){
              return {
                errors: [{
                  path: "updateRoom",
                  message:  "User does not belong to the room!",
                }]
              };
            }

            /**
             * Host leave, guest is PC
             */
            roomProps = {
              open: false,
              active: false
            };
          }
        }
      }
    }

    const result = await RoomModel.findByIdAndUpdate(
      _id,
      roomProps,
      {
        returnDocument: "after"
      }
    );

    if (!result){
      return {
        errors: [{
          path: "updateRoom",
          message: "Error updating room!",
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
