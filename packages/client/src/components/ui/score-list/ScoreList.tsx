import Button from "@mui/material/Button";
import { FC } from "react";

import { ScoreCard } from "./components/score-card";

import styles from "./ScoreList.module.css";
import { Round } from "src/models/generated";

export interface ScoreListComponentProps {
  rounds: Round[];
  clearScores: () => void;
}

export const ScoreListComponent: FC<ScoreListComponentProps> = ({
  rounds,
  clearScores
}) => {

  const scoreCards = rounds.map((round) => (
    <ScoreCard
      key={round._id}
      players={`${round.host?.user?.name} vs ${round.guest?.user?.name}`}
      winner={round.winner?.name as string}
    />
  ));

  console.log(scoreCards);

  return(
      <div className={styles.container}>
        <div className={styles.list}>
          {scoreCards}
        </div>
        <Button
          variant={"contained"}
          className={styles.clearControl}
          onClick={clearScores}
        >
          Clear the list
        </Button>
      </div>
  );
};

ScoreListComponent.displayName = "ScoreListComponent";