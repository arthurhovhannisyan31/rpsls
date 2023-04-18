import { FC, memo } from "react";

import { Results } from "src/components/ui/game-table/components/results/Results";
import { ChoiceEnum, User } from "src/models/generated";
import { GameStatus, UserRole } from "src/typings/enums";

import { CardsSet } from "./components/cards-set/CardsSet";
import { GameFlowControls } from "./components/game-controls/GameControls";
import { UserCardComponent } from "./components/user-card/UserCard";

import style from "./GameTable.module.css";

export interface GameTableComponentProps {
  guest?: User | null;
  host?: User | null;
  winner: string;
  gameStatus: GameStatus;
  role?: UserRole;
  roundStart: () => void;
  roundPlay: (val: ChoiceEnum) => void;
  roundEnd: () => void;
  guestChoice?: ChoiceEnum;
  hostChoice?: ChoiceEnum;
}

const noop = () => null;

export const GameTableComponent: FC<GameTableComponentProps> = memo(({
  host,
  guest,
  winner,
  gameStatus,
  role,
  roundStart,
  roundEnd,
  roundPlay,
  guestChoice,
  hostChoice
}) => {
  const gameEnded = gameStatus === GameStatus.RESULTS;
  const gameNotStarted = gameStatus === GameStatus.IDLE;
  const gameInProgress = gameStatus === GameStatus.BET;
  const gamerStopped = gameStatus === GameStatus.STOP;

  console.log({ host,
    guest,
    gameStatus,
    role,
    roundStart,
    roundEnd,
    roundPlay,
    guestChoice,
    hostChoice });

  return(
    <div className={style.container}>
      <UserCardComponent
        name={host?.name || ""}
        score={0}
      />
      <div className={style.gameBoard}>
        <div>
          <CardsSet
            disabled={gameNotStarted}
            inactive={gameEnded}
            current={hostChoice}
            onClick={roundPlay}
          />
        </div>
        <div className={style.result}>
          <GameFlowControls
            role={role}
            gameStatus={gameStatus}
            roundStart={roundStart}
            roundEnd={roundEnd}
          />
          {!(gameNotStarted || gamerStopped) && <Results winner={winner} />}
        </div>
        <div>
          <CardsSet
            disabled={gameInProgress}
            inactive
            current={gameStatus === GameStatus.RESULTS ? guestChoice : undefined}
            onClick={noop}
          />
        </div>
      </div>
      <UserCardComponent
        name={guest?.name || ""}
        score={0}
      />
    </div>
  );
});

GameTableComponent.displayName = "GameTableComponent";
