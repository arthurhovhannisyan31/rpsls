import Button from "@mui/material/Button";
import { memo } from "react";

import { GameStatus, UserRole } from "src/typings/enums";

import style from "./GameControls.module.css";

export interface GameFlowControlsProps {
  role?: UserRole;
  gameStatus: GameStatus;
  roundStart: () => void;
  roundEnd: () => void;
}

export const GameFlowControls = memo<GameFlowControlsProps>(({
  role,
  gameStatus,
  roundEnd,
  roundStart
}) => {

  const gameCanBeStarted = gameStatus === GameStatus.IDLE || gameStatus === GameStatus.STOP;

  return(
      <div>
        {role && (
          <div className={style.container}>
            {
              gameCanBeStarted
                ? (
                  <Button
                    color={"success"}
                    variant={"contained"}
                    onClick={roundStart}
                  >
                    Start game
                  </Button>
                ) : (
                  <Button
                    color={"warning"}
                    variant={"contained"}
                    onClick={roundEnd}
                  >
                    Stop game
                  </Button>
                )
            }
          </div>
        )}
      </div>
  );
});

GameFlowControls.displayName = "GameFlowControls";
