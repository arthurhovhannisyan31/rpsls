import {render } from "@testing-library/react"

import { USER_CARD_ID, UserCardComponent, UserCardComponentProps } from "../UserCard";

describe("<UserCardComponent />", () => {
  const name = "name"

  const defaultProps: UserCardComponentProps = {
    name: name
  }

  it("renders without errors", () => {
    const result = render(
      <UserCardComponent
        name={defaultProps.name}
      />
    )

    expect(result.container.firstChild).toBeInTheDocument()
  })

  it("renders provided name",  async () => {
    const result = render(
      <UserCardComponent
        name={defaultProps.name}
      />
    )

    const nameContainer = await result.findByTestId(`${USER_CARD_ID}-name`)

    expect(nameContainer.textContent).toEqual(name);
  })
})
