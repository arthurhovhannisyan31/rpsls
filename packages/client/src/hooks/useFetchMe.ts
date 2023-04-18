import { useEffect } from "react";

import { NetworkRequestStatus } from "src/typings/enums";

import { useStore } from "./useStore";

export const useFetchMe = () => {
  const { user } = useStore();

  useEffect(() => {
    if (
      user.status !== NetworkRequestStatus.PENDING &&
      !user.triedToRequest && !user.userName
    ){
      user.me();
    }
  }, [user]);
};
