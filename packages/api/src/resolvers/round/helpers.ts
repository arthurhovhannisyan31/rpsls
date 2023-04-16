import { type ChoiceName, choiceNameValueMap, type ChoiceValue, choiceValueNameMap } from "../../models/choices";

export const playByNames = (choice1: ChoiceName, choice2: ChoiceName): number => {
  const val1 = choiceNameValueMap[choice1];
  const val2 = choiceNameValueMap[choice2];

  return play(val1, val2);
};

export const play = (choice1: number, choice2: number): number => {
  if (choice1 === choice2) return 0;

  const choice1Winners = [
    normalizeChoice(choice1 + 1), normalizeChoice(choice1 + 3),
  ];
  if (choice1Winners.includes(choice2)){
    return -1;
  }

  return 1;
};

const gameOptionsLength = 5;

const normalizeChoice = (val: number, optionsLen = gameOptionsLength): number => {
  if (val > optionsLen) return val % optionsLen;

  return val;
};

export const getRandomChoice = (): number => Math.floor(Math.random() * 5);

export const getRandomChoiceName = (): ChoiceName => {
  const choice = getRandomChoice() + 1;

  return choiceValueNameMap[choice as ChoiceValue];
};
