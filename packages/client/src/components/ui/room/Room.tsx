import Button from "@mui/material/Button";
import { FC,  } from "react";

import { GameTable } from "src/components/ui/game-table";
import { ScoreList } from "src/components/ui/score-list";

import style from "./Room.module.css";

export interface RoomComponentProps {
  leaveRoom: () => void;
}

export const RoomComponent: FC<RoomComponentProps> = ({
  leaveRoom
}) => {

  return(
    <div className={style.container}>
      <Button
        className={style.leaveButton}
        variant={"contained"}
        onClick={leaveRoom}
      >
        ← Leave
      </Button>
      <GameTable />
      <div className={style.scoreList}>
        <ScoreList/>
      </div>
    </div>

  );
};

RoomComponent.displayName = "RoomComponent";
