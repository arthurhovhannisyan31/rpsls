import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  type GraphQLFieldConfig,
  GraphQLList
} from "graphql";
import { GraphQLID } from "graphql/type/scalars";

import type  { Room } from "../../models/room";
import type {  RoomUpdateAction } from "../../resolvers/room/enums";
import type {  Context } from "../../typings/context";

import { createRoomResolver, roomResolver, roomsResolver, updateRoomResolver } from "../../resolvers/room";
import { fieldError, responseData, roomEnum, roomUpdateActionEnum } from "../common";
import { userType } from "../user";
import { getUserById } from "../user/helpers";

export const roomType = new GraphQLObjectType({
  name: "Room",
  description: "Room object",
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    roomType: {
      type: new GraphQLNonNull(roomEnum)
    },
    host: {
      type: new GraphQLNonNull(userType),
      resolve: async (room: Room) => await getUserById(room.host)
    },
    guest: {
      type: userType,
      resolve: async (room: Room) => {
        if (!room?.guest) return null;

        return  await getUserById(room.guest);
      }
    },
    open: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
  })
});

const getRoomResponseType = new GraphQLObjectType({
  name: "SingleRoom",
  description: "Room type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: roomType
    }
  }),
  interfaces: [responseData]
});

export type RoomArgs = Pick<Room, "_id">;

export const room: GraphQLFieldConfig<any, Context, RoomArgs> = {
  type: getRoomResponseType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: roomResolver
};

const roomsResponseType = new GraphQLObjectType({
  name: "Rooms",
  description: "Rooms collection type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: new GraphQLList( new GraphQLNonNull(roomType) )
    }
  }),
  interfaces: [responseData]
});

export type RoomsArgs = Pick<Room, "name">

export const rooms: GraphQLFieldConfig<any, Context, RoomsArgs> = {
  type: roomsResponseType,
  args: {
    name: {
      type: GraphQLString
    }
  },
  resolve: roomsResolver
};

export type CreateUserArgs = Pick<Room, "roomType"|"name">

const createRoomResponseType = new GraphQLObjectType({
  name: "CreateRoom",
  description: "Create room type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
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
  },
  resolve: createRoomResolver
};

const updateRoomResponseType = new GraphQLObjectType({
  name: "UpdateRoom",
  description: "Update room type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: roomType
    }
  }),
  interfaces: [responseData]
});

export type UpdateRoomArgs = Pick<Room,"_id"> & {
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
  resolve: updateRoomResolver
};
