import { observer } from "mobx-react-lite";
import { ScoreListComponent } from "src/components/ui/score-list/ScoreList";
import { useStore } from "src/hooks";

export interface ScoreListProps {}

export const ScoreList = observer<ScoreListProps>(() => {
  const { game } = useStore();

  return(
    <ScoreListComponent
      rounds={game.rounds.slice()} // stack with no-rerender issue
      clearScores={game.clearRounds}
    />
  );
});

ScoreList.displayName = "ScoreList";
