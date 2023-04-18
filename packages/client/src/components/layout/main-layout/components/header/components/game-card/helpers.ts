import { WinStatus } from "src/typings/enums";

import { ColorType } from "./types";

export const winStatusColorsMap: Record<WinStatus, ColorType> = {
  WIN: "success",
  TIE: "warning",
  LOOSE: "error"
};
