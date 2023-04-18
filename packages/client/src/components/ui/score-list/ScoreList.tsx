import Button from "@mui/material/Button";
import { memo } from "react";

import { ScoreCard } from "./components/score-card";

import styles from "./ScoreList.module.css";

export interface ScoreListComponentProps {}

export const ScoreListComponent = memo<ScoreListComponentProps>(() => {

  return(
      <div className={styles.container}>
        <div className={styles.list}>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
          <ScoreCard textLeft={"Ahmed1 vs PC"} textRight={"PC won"}/>
        </div>
        <Button
          variant={"contained"}
          className={styles.clearControl}
        >
          Clear the list
        </Button>
      </div>
  );
});

ScoreListComponent.displayName = "ScoreListComponent";
