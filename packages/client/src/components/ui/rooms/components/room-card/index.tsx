import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useStore } from "src/hooks";
import { Room, RoomUpdateAction } from "src/models/generated";

import { RoomCardComponent } from "./RoomCard";

export interface RoomCardProps {
  roomProps: OmitTypeName<Room>;
  isAuth?: boolean
}

export const RoomCard = observer<RoomCardProps>(({
  roomProps,
  isAuth
}) => {
  const { rooms } = useStore();
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    router.push(`/rooms/${roomProps._id}`);
  }, [roomProps._id, router]);

  const requestJoin = useCallback(() => {
    rooms.updateRoom(roomProps._id, RoomUpdateAction.Join, handleRedirect);
  }, [handleRedirect, roomProps._id, rooms]);

  return(
    <RoomCardComponent
      roomProps={roomProps}
      isAuth={isAuth}
      redirect={requestJoin}
    />
  );
});

RoomCard.displayName = "RoomCard";
