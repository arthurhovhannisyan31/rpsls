import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";

import { Rooms } from "src/components/ui/rooms";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRooms } from "src/gql/queries";
import { useSSEvents } from "src/hooks/useSSEvents";
import { SSPData } from "src/typings/models/common";
import { RoomsResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils/wrappedFetch";

// rooms: components
// rooms query + mutation
// room: components
// room: query + mutations

// sse resolver
// components + notification
// favicon
//  Files inside public can then be referenced by your code starting from the base URL (/).
// ave error boundaries in
// material ui theme wrapper

export const RoomsPage = observer((roomsData: SSPData<RoomsResponse>) => {

  useSSEvents();

  return(
    <div>
      <Rooms
        roomsData={roomsData}
      />
    </div>
  );
});

export const getServerSideProps: GetServerSideProps<SSPData<RoomsResponse>> = async () => {
  const res = await wrappedFetch(SERVERSIDE_API_URL, queryRooms());
  const data: RoomsResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};

RoomsPage.displayName = "RoomsPage";

export default RoomsPage;
