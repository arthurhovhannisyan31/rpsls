import { FC, useEffect } from "react";

import { useStore } from "src/hooks";
import { SSPData } from "src/typings/models/common";
import { RoomsResponse } from "src/typings/models/rooms";

import { RoomsComponent } from "./Rooms";

export interface RoomsProps {
  roomsData: SSPData<RoomsResponse>
}

export const Rooms: FC<RoomsProps> = ({ roomsData }) => {
  const { rooms } = useStore();

  useEffect(() => {
    if (roomsData.data?.data?.rooms){
      rooms.setRooms(roomsData.data.data.rooms);
    }
  }, [roomsData, rooms]);

  return(
      <RoomsComponent
        rooms={rooms.rooms}
      />
  );
};

Rooms.displayName = "Rooms";
