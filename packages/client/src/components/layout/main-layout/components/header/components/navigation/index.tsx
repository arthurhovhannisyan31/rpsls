import { memo } from "react";

import {NavigationComponent} from "./Navigation"

export interface NavigationProps {}

export const Navigation = memo<NavigationProps>(() => {
  return(
      <>
        <NavigationComponent/>
      </>
  )
})

Navigation.displayName = "Navigation"
