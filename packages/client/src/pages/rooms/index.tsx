import { type GetServerSideProps } from "next";
import { type ReactElement, useEffect } from "react";

import { MainLayout } from "src/components/layout/main-layout";
import { Rooms } from "src/components/ui/rooms";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRooms } from "src/gql/queries";
import { useSSEvents } from "src/hooks/useSSEvents";
import { type SSPData } from "src/typings/models/common";
import { type RoomsResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils/wrappedFetch";

interface RoomsPageProps {
  data: RoomsResponse
}

export const RoomsPage = (roomsData: RoomsPageProps) => {

  useEffect(() => {
    const getHello = async () => fetch("/api/hello");
    getHello();
  }, []);

  useEffect(() => {
    const getRandomById = async () => fetch("/api/random?email=123");
    getRandomById();
  }, []);

  useSSEvents();

  return(
    <Rooms
      roomsData={roomsData}
    />
  );
};

RoomsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
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
