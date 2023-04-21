import Box from "@mui/material/Box";
import clsx from "clsx";
import { type FC } from "react";

import { GameCard } from "src/components/layout/main-layout/components/header/components/game-card/GameCard";
import { ChoiceEnum } from "src/models/generated";

import styles from "./CardsSet.module.css";

export interface CardsSetProps {
  current?: ChoiceEnum;
  onClick: (val: ChoiceEnum) => void;
  disabled?: boolean; // disable whe game is not started
  inactive?: boolean; // inactivate when game in result phase
}

export const CardsSet: FC<CardsSetProps> = ({
  current,
  onClick,
  disabled,
  inactive
}) => {

  return(
      <Box
        sx={{ display: "flex", flexFlow: "column" }}
        className={clsx({
          [styles.boxDisabled]: inactive
        })}
      >
        <GameCard
          value={ChoiceEnum.Rock}
          current={current}
          onClick={onClick}
          disabled={disabled}
        />
        <GameCard
          value={ChoiceEnum.Paper}
          current={current}
          onClick={onClick}
          disabled={disabled}
        />
        <GameCard
          value={ChoiceEnum.Spock}
          current={current}
          onClick={onClick}
          disabled={disabled}
        />
        <GameCard
          value={ChoiceEnum.Lizard}
          current={current}
          onClick={onClick}
          disabled={disabled}
        />
        <GameCard
          value={ChoiceEnum.Scissors}
          current={current}
          onClick={onClick}
          disabled={disabled}
        />
      </Box>
  );
};

CardsSet.displayName = "CardsSet";
