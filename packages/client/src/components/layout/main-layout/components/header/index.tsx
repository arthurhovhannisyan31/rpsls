import { memo } from "react";

import { HeaderComponent, HeaderComponentProps } from "./Header";

// memo Check if needed
export const Header = memo(() => {
  const mockProps: HeaderComponentProps = {
    user: {
      name: "Mock User Name"
    }
  }

  return(
      <>
        <HeaderComponent
          user={mockProps.user}
        />
      </>
  )
})

Header.displayName = "HeaderWrap"
