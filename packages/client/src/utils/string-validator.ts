import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "src/constants";

export interface PassportStrengthValidation {
  hasSpecial: boolean
  tooShort: boolean
  tooLong: boolean
}

export const getStringValidation = (
  string: string,
): PassportStrengthValidation => {
  return ({
    hasSpecial: /[*.!@#$%^&(){}[\]:;<>,?~_+\-=|\\/]/g.test(string),
    tooShort: string.length < NAME_MIN_LENGTH,
    tooLong: string.length > NAME_MAX_LENGTH
  });
};
