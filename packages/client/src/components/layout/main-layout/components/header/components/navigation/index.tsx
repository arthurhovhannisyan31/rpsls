import { useRouter } from "next/router";
import { memo } from "react";

import { NavigationComponent } from "./Navigation";

export const Navigation = memo(() => {
  const router = useRouter();

  return(
      <NavigationComponent
        currentPath={router.pathname}
      />
  );
});

Navigation.displayName = "Navigation";
