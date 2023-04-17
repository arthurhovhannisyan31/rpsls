import { render, fireEvent } from "@testing-library/react";

import { USER_CARD_ID, UserCardComponent, UserCardComponentProps } from "../UserCard";

describe("<UserCardComponent />", () => {
  const name = "name";

  const login = jest.fn();
  const logout = jest.fn();

  const defaultProps: UserCardComponentProps = {
    name: name,
    logout,
    login
  };

  it("renders without errors", () => {
    const result = render(
      <UserCardComponent
        {...defaultProps}
      />
    );

    expect(result.container.firstChild).toBeInTheDocument();
  });

  it("renders provided name",  async () => {
    const result = render(
      <UserCardComponent
        {...defaultProps}
      />
    );

    const nameContainer = await result.findByTestId(`${USER_CARD_ID}-name`);

    expect(nameContainer.textContent).toEqual(name);
  });

  it("calls logout callbacks",  async () => {
    const result = render(
      <UserCardComponent
        {...defaultProps}
      />
    );

    const logoutContainer = await result.findByTestId(`${USER_CARD_ID}-logout`);

    fireEvent.click(logoutContainer);
    expect(logout).toHaveBeenCalled();
  });

  it("calls logout callbacks",  async () => {
    const result = render(
      <UserCardComponent
        {...defaultProps}
        name={""}
      />
    );

    const loginContainer = await result.findByTestId(`${USER_CARD_ID}-login`);

    fireEvent.click(loginContainer);

    expect(login).toHaveBeenCalled();
  });
});
