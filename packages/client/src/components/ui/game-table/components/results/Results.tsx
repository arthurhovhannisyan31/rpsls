import Typography from "@mui/material/Typography";
import { memo } from "react";

import style from "./Results.module.css";

export interface ResultsProps {
  winner: string
}

export const Results = memo<ResultsProps>(({
  winner
}) => {

  return(
      <div className={style.container}>
        <Typography variant="body2" gutterBottom>
          Winner:
        </Typography>
        <Typography variant="body2" gutterBottom>
          {winner}
        </Typography>
      </div>
  );
});

Results.displayName = "Results";
