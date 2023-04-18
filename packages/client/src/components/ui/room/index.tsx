import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RoomComponent } from "src/components/ui/room/Room";
import { useStore } from "src/hooks";
import { RoomUpdateAction } from "src/models/generated";
import { useRouter } from "next/router";
import { RoomResponse } from "src/typings/models/rooms";

export interface RoomProps {
  data: RoomResponse;
}

export const Room = observer<RoomProps>(({
  data
}) => {
  const { game, rooms } = useStore();
  const router = useRouter();

  const handleLeaveRoom = useCallback(() => {
    if (game.room){
      rooms.updateRoom(game.room._id, RoomUpdateAction.Leave,
        () => router.push("/")
      );
    }
  }, [game.room, rooms, router]);

  useEffect(() => {
    const room = data.data?.room;
    if (room?.data){
      game.setRoomProps(room?.data);
    }

    return () => {
      game.resetGameProps();
    };
  }, [data, data.data?.room, game]);

  return(
    <RoomComponent
      leaveRoom={handleLeaveRoom}
    />
  );
});

Room.displayName = "Room";
