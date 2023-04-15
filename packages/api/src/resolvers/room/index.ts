import { type GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLError } from "graphql/error";

import { RoomUpdateAction } from "./enums";
import { type Room, RoomModel } from "../../models/room";
import { fieldError, responseData, roomUpdateActionEnum } from "../../schema/common";
import { roomType } from "../../schema/room";
import { type ResponseData } from "../../schema/types";
import { type Context } from "../../typings/context";

type RoomArgs = Pick<Room, "_id">;

const getRoomResponseType = new GraphQLObjectType({
  name: "SingleRoom",
  description: "Room type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roomType
    }
  }),
  interfaces: [responseData]
});

export const room: GraphQLFieldConfig<any, Context, RoomArgs> = {
  type: getRoomResponseType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_, { _id }, { session }): Promise<ResponseData<Room>> => {
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
            path: "getRoom",
            message:  "Room does not exists!",
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
  }
};

const roomsResponseType = new GraphQLObjectType({
  name: "Rooms",
  description: "Rooms collection type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: new GraphQLList(roomType)
    }
  }),
  interfaces: [responseData]
});

export const rooms: GraphQLFieldConfig<any, Context> = {
  type: roomsResponseType,
  resolve: async (): Promise<ResponseData<Room[]>> => {
    try {
      const rooms = await RoomModel.find();

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
  }
};

type CreateUserArgs = Pick<Room, "roomType"|"name">

const createRoomResponseType = new GraphQLObjectType({
  name: "CreateRoom",
  description: "Create room type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roomType
    }
  }),
  interfaces: [responseData]
});

export const createRoom: GraphQLFieldConfig<any, Context, CreateUserArgs> = {
  type: createRoomResponseType,
  args: {
    roomType:{
      type: new GraphQLNonNull(GraphQLString),
    },
    name:{
      type: new GraphQLNonNull(GraphQLString),
    },
    host_id:{
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: async (_, { roomType, name }, { session }): Promise<ResponseData<Room>> => {
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

      const newRoom = new RoomModel({
        host: session.user_id,
        roomType,
        name,
        open: true,
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
  }
};

const updateRoomResponseType = new GraphQLObjectType({
  name: "UpdateRoom",
  description: "Update room type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: roomType
    }
  }),
  interfaces: [responseData]
});

type UpdateRoomArgs = Pick<Room,"_id"> & {
  action: RoomUpdateAction
};

/**
 * Only 2 updates allowed
 * - guest enter|leave
 * - host leave
 */
export const updateRoom: GraphQLFieldConfig<any, Context, UpdateRoomArgs> = {
  type: updateRoomResponseType,
  args:{
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    action: {
      type: new GraphQLNonNull(roomUpdateActionEnum)
    }
  },
  resolve: async (_, { _id, action }, { session }): Promise<ResponseData<Room>> => {
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
        case RoomUpdateAction.LEAVE: {
          if ( room.host && room.host.toString() !== session.user_id ||
            room.guest && room.guest.toString() !== session.user_id
          ){
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
            message: "Error saving room!",
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
