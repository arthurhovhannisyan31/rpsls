import {
  type GraphQLFieldConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

import { choiceResolver, choicesResolver } from "../../resolvers/choices";
import { fieldError, responseData } from "../common";

export const choiceType = new GraphQLObjectType({
  name: "Choice",
  description: "Game choice",
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
});

const choicesResponseType = new GraphQLObjectType({
  name: "ChoicesResponse",
  description: "Choices response type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: new GraphQLList(choiceType)
    }
  }),
  interfaces: [responseData]
});

export const choices: GraphQLFieldConfig<any ,any ,any> = {
  type: choicesResponseType,
  resolve: choicesResolver
};

const choiceResponseType = new GraphQLObjectType({
  name: "ChoiceResponse",
  description: "Choice response type",
  fields: () => ({
    errors: {
      type: new GraphQLList( new GraphQLNonNull( fieldError ))
    },
    data: {
      type: choiceType
    }
  }),
  interfaces: [responseData]
});

export const choice: GraphQLFieldConfig<any ,any ,any> = {
  type: choiceResponseType,
  resolve: choiceResolver
};
