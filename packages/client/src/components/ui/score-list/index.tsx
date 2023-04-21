import { observer } from "mobx-react-lite";

import { ScoreListComponent } from "src/components/ui/score-list/ScoreList";
import { useStore } from "src/hooks";

export const ScoreList = observer(() => {
  const { game } = useStore();

  return(
    <ScoreListComponent
      rounds={game.rounds.slice()} // stack with no-rerender issue
      clearScores={game.clearRounds}
    />
  );
});

ScoreList.displayName = "ScoreList";
