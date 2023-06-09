import Button from "@mui/material/Button";
import { type FC } from "react";

import { useEvent } from "src/hooks";
import { type ChoiceEnum } from "src/models/generated";
import { type WinStatus } from "src/typings/enums";

import { winStatusColorsMap } from "./helpers";
import gameIcons from "./icons.json";
import { type ColorType, type VariantType } from "./types";

export interface GameCardProps {
  value: ChoiceEnum;
  current?: ChoiceEnum;
  winStatus?: WinStatus;
  onClick: (val: ChoiceEnum) => void;
  disabled?: boolean;
}

export const GameCard: FC<GameCardProps> = ({
  value,
  current,
  winStatus,
  onClick,
  disabled
}) => {
  let variant: VariantType = "outlined";
  let color: ColorType = "primary";

  if (winStatus){
    variant = "outlined";
    color = winStatusColorsMap[winStatus];
  } else {
    if (value === current){
      variant = "contained";
    } else {
      variant = "text";
    }
  }

  const handleClick = useEvent(() => {
    onClick(value);
  });

  return(
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
      disabled={disabled}
    >
      {gameIcons[value]}
    </Button>
  );
};

GameCard.displayName = "GameCard";
