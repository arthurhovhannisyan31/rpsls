import { memo } from "react";

import { User } from "src/models/generated";

import { UserCardComponent } from "./UserCard";

export interface UserCardProps {
  user: OmitTypeName<User>
}

export const UserCard = memo<UserCardProps>(({
  user
}) => {

  const login = () => {
    // open login modal
  };

  const logout = () => {
    // call swr with logout query
  };

  return(
      <UserCardComponent
        name={user.name}
        login={login}
        logout={logout}
      />
  );
});

UserCard.displayName = "UserCard";
