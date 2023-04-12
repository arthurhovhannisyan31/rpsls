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
