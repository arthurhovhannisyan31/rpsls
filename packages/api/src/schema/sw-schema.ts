import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLNonNull, GraphQLList,
} from "graphql";

import { getDroid, getFriends, getHero, getHuman } from "./sw-data";
import { userType } from "./user";

const episodeEnum = new GraphQLEnumType({
  name: "Episode",
  description: "One of the films in the Star Wars Trilogy",
  values: {
    NEW_HOPE: {
      value: 4,
      description: "Released in 1977.",
    },
    EMPIRE: {
      value: 5,
      description: "Released in 1980.",
    },
    JEDI: {
      value: 6,
      description: "Released in 1983.",
    },
  },
});

const characterInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
  name: "Character",
  description: "A character in the Star Wars Trilogy",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the character.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the character.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the character, or an empty list if they have none.",
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "All secrets about their past.",
    },
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  resolveType(character) {
    switch (character.type) {
      case "Human":
        return humanType.name;
      case "Droid":
        return droidType.name;
    }
  },
});

export const humanType = new GraphQLObjectType({
  name: "Human",
  description: "A humanoid creature in the Star Wars universe.",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the human.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the human.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the human, or an empty list if they have none.",
      resolve: (human) => getFriends(human),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    homePlanet: {
      type: GraphQLString,
      description: "The home planet of the human, or null if unknown.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "Where are they from and how they came to be who they are.",
      resolve() {
        throw new Error("secretBackstory is secret.");
      },
    },
  }),
  interfaces: [characterInterface],
});

export const droidType = new GraphQLObjectType({
  name: "Droid",
  description: "A mechanical creature in the Star Wars universe.",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the droid.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the droid.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the droid, or an empty list if they have none.",
      resolve: (droid) => getFriends(droid),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "Construction date and the name of the designer.",
      resolve() {
        throw new Error("secretBackstory is secret.");
      },
    },
    primaryFunction: {
      type: GraphQLString,
      description: "The primary function of the droid.",
    },
  }),
  interfaces: [characterInterface],
});

export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hero: {
      type: characterInterface,
      args: {
        episode: {
          description:
            "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.",
          type: episodeEnum,
        },
      },
      resolve: (_source, { episode }) => getHero(episode),
    },
    human: {
      type: humanType,
      args: {
        id: {
          description: "id of the human",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_source, { id }) => getHuman(id),
    },
    droid: {
      type: droidType,
      args: {
        id: {
          description: "id of the droid",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_source, { id }) => getDroid(id),
    },
    user: {
      type: userType
    }
  }),
});