import Button from "@mui/material/Button";
import { type FC, useMemo } from "react";

import { type Room } from "src/models/generated";

import { RoomCard } from "./components/room-card";

import styles from "./Rooms.module.css";

export interface RoomsComponentProps {
  rooms: OmitTypeName<Room>[];
  isAuth?: boolean;
  openModal: () => void;
}

export const ROOMS_ID = "rooms-id";

export const RoomsComponent: FC<RoomsComponentProps> = ({
  rooms,
  isAuth,
  openModal
}) => {
  const roomsCards = useMemo(() => rooms.map((room) => (
    <RoomCard
      key={room._id}
      roomProps={room}
      isAuth={isAuth}
    />
  )) ,[isAuth, rooms]);

  return(
    <div className={styles.container}>
      {
        isAuth && (
          <Button
            className={styles.createRoom}
            onClick={openModal}
            variant={"outlined"}
          >
            Create room
          </Button>
        )
      }
      {roomsCards}
    </div>
  );
};

RoomsComponent.displayName = "RoomsComponent";
