import { memo } from "react";

import { User } from "src/models/generated";

import styles from "./UserCard.module.css"

export type UserCardComponentProps = OmitTypeName<User>;

export const USER_CARD_ID = "user-card-id"

export const UserCardComponent = memo<UserCardComponentProps>(
  ({
    name
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
        login / logout
      </div>
    </div>
  )
})

UserCardComponent.displayName = "UserCard"
