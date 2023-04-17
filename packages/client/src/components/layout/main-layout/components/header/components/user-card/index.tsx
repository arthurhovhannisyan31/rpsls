import { memo } from "react";

import { User } from "src/models/generated";

import {UserCardComponent} from "./UserCard"

export interface UserCardProps {
  user: OmitTypeName<User>
}

export const UserCard = memo<UserCardProps>(({
  user
}) => {
  return(
      <>
        <UserCardComponent
          name={user.name}
        />
      </>
  )
})

UserCard.displayName = "UserCard"
