import { GetServerSideProps } from "next";

import { Rooms } from "src/components/ui/rooms";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRooms } from "src/gql/queries";
import { useSSEvents } from "src/hooks/useSSEvents";
import { SSPData } from "src/typings/models/common";
import { RoomsResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils/wrappedFetch";

// components + notification

interface RoomsPageProps {
  data: RoomsResponse
}

export const RoomsPage = (roomsData: RoomsPageProps) => {

  useSSEvents();

  return(
    <Rooms
      roomsData={roomsData}
    />
  );
};

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
