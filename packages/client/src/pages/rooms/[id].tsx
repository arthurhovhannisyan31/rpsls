import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { Room } from "src/components/ui/room";
import { SERVERSIDE_API_URL } from "src/constants";
import { queryRoom } from "src/gql/queries";
import { useStore } from "src/hooks";
import { SSPData } from "src/typings/models/common";
import { RoomResponse, UpdateRoomResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils";

export interface GameProps {
  data: RoomResponse
}

export const Game = observer<GameProps>(({
  data
}) => {
  const { game } = useStore();

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
    <Room/>
  );
});

export const getServerSideProps: GetServerSideProps<SSPData<UpdateRoomResponse>> = async (context) => {
  const res = await wrappedFetch(
    SERVERSIDE_API_URL,
    queryRoom({ _id: context.params?.id as string, }),
    {
      Cookie: context.req.headers.cookie as string
    }
  );

  const data: UpdateRoomResponse = await res.json();

  if (data.data?.updateRoom?.errors){
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
