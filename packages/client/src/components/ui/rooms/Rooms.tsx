import { FC, useMemo } from "react";

import { Room } from "src/models/generated";

export interface RoomsComponentProps {
  rooms: OmitTypeName<Room>[]
}

export const RoomsComponent: FC<RoomsComponentProps> = ({ rooms }) => {
  const roomsCards = useMemo(() => rooms.map((room) => (
    <div key={room._id}>
      <span>Hey!</span>
      <span>{}</span>
    </div>
  )) ,[rooms]);

  return(
    <div>
      {roomsCards}
    </div>
  );
};

RoomsComponent.displayName = "RoomsComponent";
