import { GraphQLError } from "graphql";

import type { ResponseData } from "../../schema/types";

import { ChoiceModel, type Choice } from "../../models/choices";
import { getRandomChoice } from "../round/helpers";

export const choicesResolver = async (): Promise<ResponseData<Choice[]>> => {
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
};

export const choiceResolver = async (): Promise<ResponseData<Choice>> => {
  try {
    const random = getRandomChoice(); // not inclusive 5

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
};
