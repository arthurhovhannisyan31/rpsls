import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";

import { GameTableComponent } from "src/components/ui/game-table/GameTable";
import { useStore } from "src/hooks";
import { ChoiceEnum } from "src/models/generated";
import { GameStatus } from "src/typings/enums";

export interface GameTableProps {}

export const GameTable: FC<GameTableProps> = observer(({}) => {
  const { game } = useStore();

  const [timeOutNotification, setTimeOutNotification] = useState(false);

  const handleRoundStart = useCallback(() => {
    if (game.room?._id) {
      game.startRound(game.room?._id);
    }
  }, [game]);

  const handleRoundPlay = useCallback((choice: ChoiceEnum) => {
    if (game.round?._id) {
      game.playRound(game.round?._id, choice);
    }
  }, [game]);

  const handleRoundEnd = useCallback(() => {
    if (game.round?._id) {
      game.endRound(game.round?._id);
    }
  }, [game]);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;

    if (game.gameStatus === GameStatus.RESULTS && game.autoplay){
      timeoutID = setTimeout(() => {
        handleRoundStart();
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [game.autoplay, game.gameStatus, handleRoundStart]);

  const scores = game.getPlayersScores();

  useEffect(() => {
    if(!timeOutNotification) {
      setTimeOutNotification(true);
    }
  }, [timeOutNotification]);

  return(
    <GameTableComponent
      guest={game.room?.guest}
      host={game.room?.host}
      winner={game.getWinner()}
      gameStatus={game.gameStatus}
      role={game.myRole}
      guestChoice={game.round?.guest?.choice as ChoiceEnum}
      hostChoice={game.round?.host?.choice as ChoiceEnum}
      scoresByUser={scores}
      roundStart={handleRoundStart}
      roundPlay={handleRoundPlay}
      roundEnd={handleRoundEnd}
    />
  );
});

GameTable.displayName = "GameTable";
