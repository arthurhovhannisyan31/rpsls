import { useEffect } from "react";

import { createAction } from "src/utils";

import {rootStore} from "../store/store"

export const useSSEvents = () => {

  useEffect(() => {
    const evtSource = new EventSource("/api/events");

    evtSource.onmessage = (event) => {
      console.log(event.data);
      rootStore.notify(
        createAction(
          "SSE-Message",
          event
        )
      );
    };

    evtSource.onerror = (err) => {
      console.error("EventSource failed:", err);
    };

    return () => {
      evtSource.onmessage = null;
      evtSource.close();
    }
  }, [])
}
