import Image from "next/image";
import { memo } from "react";

import { UserCard } from "src/components/layout/main-layout/components/header/components/user-card";
import { User } from "src/models/generated";

import styles from "./Header.module.css"

export interface HeaderComponentProps {
  user: OmitTypeName<User>
}

// memo Check if needed
export const HeaderComponent = memo<HeaderComponentProps>(
  ({
     user
   }) => {
  return(
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src={"/logo.png"}
          alt={"Logo"}
          width={32}
          height={32}
        />
        <nav className={"nav"}>
          Main
          About
        </nav>
      </div>
      <div className={styles.right}>
        {
          user && (
            <UserCard
              user={user}
            />
          )
        }
      </div>
    </div>
  )
})

HeaderComponent.displayName = "HeaderComponent"
