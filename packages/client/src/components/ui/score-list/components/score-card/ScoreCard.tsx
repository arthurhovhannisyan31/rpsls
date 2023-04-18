import { memo } from "react";

import styles from "./ScoreCard.module.css";

export interface ScoreCardProps {
  textLeft: string;
  textRight: string;
}

export const ScoreCard = memo<ScoreCardProps>(({
  textLeft,
  textRight
}) => {
  return(
    <div className={styles.container}>
      <span>{textLeft}</span> <span>{textRight}</span>
    </div>
  );
});

ScoreCard.displayName = "ScoreCard";
