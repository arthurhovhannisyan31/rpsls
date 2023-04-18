import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect } from "react";

import { GameTableComponent } from "src/components/ui/game-table/GameTable";
import { useStore } from "src/hooks";
import { ChoiceEnum } from "src/models/generated";
import { GameStatus } from "src/typings/enums";

export interface GameTableProps {}

export const GameTable: FC<GameTableProps> = observer(({}) => {
  const { game } = useStore();

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
    game.stopRound();
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

  return(
    <GameTableComponent
      guest={game.room?.guest}
      host={game.room?.host}
      winner={game.getWinner()}
      gameStatus={game.gameStatus}
      role={game.myRole}
      guestChoice={game.round?.guest?.choice as ChoiceEnum}
      hostChoice={game.round?.host?.choice as ChoiceEnum}
      roundStart={handleRoundStart}
      roundPlay={handleRoundPlay}
      roundEnd={handleRoundEnd}
    />
  );
});

GameTable.displayName = "GameTable";
