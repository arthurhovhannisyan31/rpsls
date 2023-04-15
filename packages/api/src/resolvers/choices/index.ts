import {
  type GraphQLFieldConfig, GraphQLObjectType, GraphQLList
} from "graphql";
import { GraphQLError } from "graphql/error";

import type { ResponseData } from "../../schema/types";

import { ChoiceModel, type Choice } from "../../models/choices";
import { choiceType } from "../../schema/choices";
import { fieldError, responseData } from "../../schema/common";

const choicesResponseType = new GraphQLObjectType({
  name: "ChoicesResponse",
  description: "Choices response type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: new GraphQLList(choiceType)
    }
  }),
  interfaces: [responseData]
});

export const choices: GraphQLFieldConfig<any ,any ,any> = {
  type: choicesResponseType,
  resolve: async (): Promise<ResponseData<Choice[]>> => {
    try {
      const choices = await ChoiceModel.find();
      if (!choices){
        return {
          errors: [{
            path: "choice",
            message: "Choices not found"
          }]
        };
      }

      return {
        data: choices
      };
    } catch (err){
      throw new GraphQLError(
        "Internal server error",
        {
          originalError: err as Error,
        }
      );
    }
  }
};

const choiceResponseType = new GraphQLObjectType({
  name: "ChoiceResponse",
  description: "Choice response type",
  fields: () => ({
    errors: {
      type: new GraphQLList(fieldError)
    },
    data: {
      type: choiceType
    }
  }),
  interfaces: [responseData]
});

export const choice: GraphQLFieldConfig<any ,any ,any> = {
  type: choiceResponseType,
  resolve: async (): Promise<ResponseData<Choice>> => {
    try {
      const random = Math.floor(Math.random()) * 5; // not inclusive 5

      const choices = await ChoiceModel.find();
      if (!choices){
        return {
          errors: [{
            path: "choice",
            message: "Choices not found"
          }]
        };
      }

      return {
        data: choices[random]
      };
    } catch (err){
      throw new GraphQLError(
        "Internal server error",
        {
          originalError: err as Error,
        }
      );
    }
  }
};
