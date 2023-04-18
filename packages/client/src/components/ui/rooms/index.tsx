import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { RoomModal } from "src/components/ui/modals/room";
import { useStore } from "src/hooks";
import { NetworkRequestStatus } from "src/typings/enums";
import { SSPData } from "src/typings/models/common";
import { RoomsResponse } from "src/typings/models/rooms";

import { RoomsComponent } from "./Rooms";

export interface RoomsProps {
  roomsData: SSPData<RoomsResponse>
}

export const Rooms = observer<RoomsProps>(({ roomsData }) => {
  const { rooms, user } = useStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleRedirect = useCallback((id: string) => {
    router.push(`/rooms/${id}`);
  }, [router]);

  const handleSubmit = useCallback((name: string, roomType: string) => {
    rooms.createRoom(name, roomType, handleRedirect);
  }, [handleRedirect, rooms]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  /**
   * Stores rooms from server-side request
   */
  useEffect(() => {
    if (roomsData.data?.data?.rooms){
      rooms.setRooms(roomsData.data.data.rooms);
    }
  }, [roomsData, rooms]);

  /**
   * Closes modal when request is done
   */
  useEffect(() => {
    if (rooms.status === NetworkRequestStatus.DONE){
      handleCloseModal();
    }
  }, [handleCloseModal, rooms.status]);

  return(
    <>
      <RoomsComponent
        rooms={rooms.rooms}
        isAuth={!!user.userName}
        openModal={handleOpenModal}
      />
      <RoomModal
        label={"Please enter room name:"}
        open={open}
        onClose={handleCloseModal}
        errorMessage={rooms.errorMessage}
        loading={rooms.status === NetworkRequestStatus.PENDING}
        onSubmit={handleSubmit}
      />
    </>
  );
});

Rooms.displayName = "Rooms";
