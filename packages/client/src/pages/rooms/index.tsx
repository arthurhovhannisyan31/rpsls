import { observer } from "mobx-react-lite";

import { useStore } from "src/hooks";

export interface RoomProps {}

// memo if needed
export const Rooms = observer(() => {
  const { rooms } = useStore();

  console.log(rooms);

  return(
    <div>
      rooms
    </div>
  )
})

Rooms.displayName = "Room"

// getServerSideProps
export default Rooms
