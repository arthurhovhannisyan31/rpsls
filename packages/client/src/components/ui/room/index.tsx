import { FC } from "react";

import { RoomComponent } from "src/components/ui/room/Room";
export interface RoomProps {}

export const Room: FC<RoomProps> = (() => {

  return(
    <RoomComponent />
  );
});

Room.displayName = "Room";
