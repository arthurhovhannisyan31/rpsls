import Button from "@mui/material/Button";
import { memo } from "react";

import styles from "./UserCard.module.css";

export interface UserCardComponentProps {
  name: string;
  login: () => void;
  logout: () => void;
}

export const USER_CARD_ID = "user-card-id";

export const UserCardComponent = memo<UserCardComponentProps>(
  ({
    name,
    logout,
    login
   }) => {
  return(
    <div
      className={styles.container}
      data-testid={`${USER_CARD_ID}-container`}
    >
      <span
        className={styles.name}
        data-testid={`${USER_CARD_ID}-name`}
      >
        {name}
      </span>
      <div
        className={styles.auth_controls}
        data-testid={`${USER_CARD_ID}-controls`}
      >
        {
          name
            ? (<Button
              onClick={logout}
              data-testid={`${USER_CARD_ID}-logout`}
            >
              Logout
            </Button>)
            :(<Button
              onClick={login}
              data-testid={`${USER_CARD_ID}-login`}
            >
              Login
            </Button>)
        }
      </div>
    </div>
  );
});

UserCardComponent.displayName = "UserCard";
