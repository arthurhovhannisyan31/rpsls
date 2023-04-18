import { FieldError, Maybe, Mutation, Query, Room } from "src/models/generated";

export type RoomsResponse = {
  data?: {
    rooms: Query["rooms"]
  }
}

export type RoomResponse = {
  data?: {
    room: Query["room"]
  }
}

export type CreateRoomResponse = {
  data?: {
    createRoom: Mutation["createRoom"]
  }
}

export type UpdateRoomResponse = {
  data?: {
    updateRoom: Mutation["updateRoom"]
  }
}

export type RoomResponseData = {
  data?: Maybe<Room>;
  errors?: Maybe<Array<FieldError>>;
}
