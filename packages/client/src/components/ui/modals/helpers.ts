import { type KeyboardEvent } from "react";

export const handleEnterKeyDown =
  (cb: () => void) =>
    (event: KeyboardEvent): void => {
      if (event.key === "Enter") {
        cb();
      }
    };
