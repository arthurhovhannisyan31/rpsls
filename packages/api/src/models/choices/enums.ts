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

export const choiceNameValueMap = {
  [ChoiceName.ROCK]: ChoiceValue.ROCK ,
  [ChoiceName.PAPER]: ChoiceValue.PAPER ,
  [ChoiceName.SCISSORS]: ChoiceValue.SCISSORS ,
  [ChoiceName.SPOCK]: ChoiceValue.SPOCK ,
  [ChoiceName.LIZARD]: ChoiceValue.LIZARD ,
};

export const choiceValueNameMap = {
  [ChoiceValue.ROCK]: ChoiceName.ROCK ,
  [ChoiceValue.PAPER]: ChoiceName.PAPER ,
  [ChoiceValue.SCISSORS]: ChoiceName.SCISSORS ,
  [ChoiceValue.SPOCK]: ChoiceName.SPOCK ,
  [ChoiceValue.LIZARD]: ChoiceName.LIZARD ,
};
