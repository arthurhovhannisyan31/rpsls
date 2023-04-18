export enum ChoiceValue {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
  SPOCK = 4,
  LIZARD = 5
}

export enum ChoiceName {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
  SPOCK = "SPOCK",
  LIZARD = "LIZARD"
}

export const choiceNameByValue: Record<ChoiceName, ChoiceValue> = {
  ROCK: ChoiceValue.ROCK,
  PAPER: ChoiceValue.PAPER,
  SCISSORS: ChoiceValue.SCISSORS,
  SPOCK: ChoiceValue.SPOCK,
  LIZARD: ChoiceValue.LIZARD,
};

export const choiceValueByName: Record<ChoiceValue, ChoiceName> = {
  [ChoiceValue.ROCK]: ChoiceName.ROCK ,
  [ChoiceValue.PAPER]: ChoiceName.PAPER ,
  [ChoiceValue.SCISSORS]: ChoiceName.SCISSORS ,
  [ChoiceValue.SPOCK]: ChoiceName.SPOCK ,
  [ChoiceValue.LIZARD]: ChoiceName.LIZARD ,
};
