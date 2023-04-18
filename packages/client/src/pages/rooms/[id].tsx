import { GetServerSideProps } from "next";

import { Room } from "src/components/ui/room";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRoom } from "src/gql/queries";
import { SSPData } from "src/typings/models/common";
import { RoomResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils";
import { FC } from "react";

export interface GameProps {
  data: RoomResponse
}

export const Game: FC<GameProps> = ({ data }) => {

  return(
    <Room
      data={data}
    />
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
