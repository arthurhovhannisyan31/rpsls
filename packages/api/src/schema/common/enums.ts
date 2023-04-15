import {
  GraphQLEnumType,
} from "graphql";

export const roomEnum = new GraphQLEnumType({
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

export const choiceEnum = new GraphQLEnumType({
  name: "ChoiceEnum",
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

export const roomUpdateActionEnum = new GraphQLEnumType({
  name: "RoomUpdateAction",
  description: "Type of action in room for user: join, leave",
  values: {
    JOIN: {
      value: "JOIN"
    },
    LEAVE: {
      value: "LEAVE"
    }
  }
});
