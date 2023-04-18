import { FieldError } from "src/models/generated";

export const errorArrayToMap = (
  errors: FieldError[] = [],
): Record<string, string> => {
  return errors.reduce((acc: Record<string, string>, fieldError) => {
    acc[fieldError.path] = fieldError.message;
    return acc;
  }, {});
};
