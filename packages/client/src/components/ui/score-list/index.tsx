import { FC } from "react";

import { ScoreListComponent } from "src/components/ui/score-list/ScoreList";

export interface ScoreListProps {}

export const ScoreList: FC<ScoreListProps> = ({}) => {

  return(
    <ScoreListComponent/>
  );
};

ScoreList.displayName = "ScoreList";
