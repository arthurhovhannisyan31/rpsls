import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import { type Room } from "src/models/generated";

import styles from "./RoomCard.module.css";

export interface RoomCardProps {
  roomProps: OmitTypeName<Room>;
  isAuth?: boolean;
  redirect: () => void;
}

export const RoomCardComponent = memo<RoomCardProps>(({
  roomProps:{
    open,
    name,
    host,
    guest,
    roomType,
    _id
  },
  isAuth,
  redirect
}) => {
  const isOpenForJoin = isAuth && open;

  return(
    <Card sx={{ width: 275, height: 160, margin: 1 }}>
      <CardContent>
        <div className={styles.labelContainer}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2">
            {roomType}
          </Typography>
        </div>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {host.name} vs {guest?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant={"caption"}>
          {_id}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          disabled={!isOpenForJoin}
          onClick={redirect}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
});

RoomCardComponent.displayName = "RoomCardComponent";
