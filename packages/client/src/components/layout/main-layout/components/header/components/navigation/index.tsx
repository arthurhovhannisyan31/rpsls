import { useRouter } from "next/router";
import { memo } from "react";

import { NavigationComponent } from "./Navigation";

export interface NavigationProps {}

export const Navigation = memo<NavigationProps>(() => {
  const router = useRouter();

  return(
      <NavigationComponent
        currentPath={router.pathname}
      />
  );
});

Navigation.displayName = "Navigation";
