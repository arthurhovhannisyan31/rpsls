import { render } from "@testing-library/react";

import { NAV_LINK_ID, NavigationComponent, type NavigationComponentProps } from "../Navigation";

jest.mock("src/constants", () => ({
  ...(jest.requireActual("../../../../../../../../constants")),
}));

describe("<NavigationComponent />",   () => {
  const path = "/rooms";

  const defaultProps: NavigationComponentProps = {
    currentPath: path
  };

  it("renders active link", async () => {
    const result = render(
      <NavigationComponent
        currentPath={defaultProps.currentPath}
      />
    );

    const link = await result.findByTestId(`${NAV_LINK_ID}-rooms`);

    expect(link).toBeInTheDocument();
    expect(link.className.includes("activeLink")).toEqual(true);
  });
});
