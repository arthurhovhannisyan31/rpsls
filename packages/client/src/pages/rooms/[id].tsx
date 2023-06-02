import { type GetServerSideProps } from "next";
import { type ReactElement } from "react";

import { MainLayout } from "src/components/layout/main-layout";
import { Room } from "src/components/ui/room";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRoom } from "src/gql/queries";
import { type SSPData } from "src/typings/models/common";
import { type RoomResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils";

export interface GameProps {
  data: RoomResponse
}

export const Game: NextPageWithLayout<GameProps> = ({ data }) => {

  return(
    <Room
      data={data}
    />
  );
};

Game.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSPData<RoomResponse>> = async (context) => {
  const res = await wrappedFetch(
    SERVERSIDE_API_URL,
    queryRoom({ _id: context.params?.id as string, }),
    {
      Cookie: context.req.headers.cookie as string
    }
  );

  const data: RoomResponse = await res.json();

  if (data.data?.room?.errors){
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};

Game.displayName = "Game";

export default Game;
