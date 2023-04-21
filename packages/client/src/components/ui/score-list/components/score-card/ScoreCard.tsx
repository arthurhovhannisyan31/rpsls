import { type FC } from "react";

import styles from "./ScoreCard.module.css";

export interface ScoreCardProps {
  players: string;
  winner: string;
}

export const ScoreCard: FC<ScoreCardProps> = ({
  players,
  winner
}) => {
  return(
    <div className={styles.container}>
      <span>{players}</span>
      <span>Winner is: {winner}</span>
    </div>
  );
};

ScoreCard.displayName = "ScoreCard";
