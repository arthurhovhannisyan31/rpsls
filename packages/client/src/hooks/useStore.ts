import { useContext } from "react";

import type { RootStore } from "../store/store";

import { StoreContext } from "../context";

export const useStore = (): RootStore => useContext(StoreContext);
