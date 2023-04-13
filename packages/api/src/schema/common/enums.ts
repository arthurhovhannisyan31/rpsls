import {
  GraphQLEnumType,
} from "graphql";

export const roomStatus = new GraphQLEnumType({
  name: "RoomStatus",
  description: "Displays if room is available to join",
  values: {
    OPEN: {
      value: "OPEN",
      description: "Room has only 1 user"
    },
    CLOSED: {
      value: "CLOSED",
      description: "Room has both users"
    }
  }
});

export const room = new GraphQLEnumType({
  name: "RoomType",
  description: "Displays type of opponent",
  values: {
    PVP: {
      value: "PVP",
      description: "Person versus person"
    },
    PVC: {
      value: "PVC",
      description: "Person versus computer"
    },
  }
});

export const choice = new GraphQLEnumType({
  name: "Choice",
  description: "One of game options: rock, paper, scissors, spock, lizard",
  values: {
    ROCK:{
      value: "ROCK",
    },
    PAPER:{
      value: "PAPER",
    },
    SCISSORS:{
      value: "SCISSORS",
    },
    SPOCK:{
      value: "SPOCK",
    },
    LIZARD:{
      value: "LIZARD",
    },
  }
});

export const role = new GraphQLEnumType({
  name: "Role",
  description: "Either host or guest",
  values: {
    HOST:{
      value: "HOST"
    },
    GUEST: {
      value: "GUEST"
    }
  }
});
