import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Navigation } from "./components/navigation";
import { UserCard } from "./components/user-card";

import styles from "./Header.module.css";

export interface HeaderProps {
  roomName: string;
}

export const Header = memo<HeaderProps>(({
  roomName
}) => {

  return(
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={"Logo"}
            width={32}
            height={32}
          />
        </Link>
        <Navigation />
      </div>
      <div className={styles.middle}>
        {roomName && (
          <Typography variant="h4" gutterBottom>
            {roomName}
          </Typography>
        )}
      </div>
      <div className={styles.right}>
        <UserCard />
      </div>
    </div>
  );
}) ;

Header.displayName = "HeaderWrap";
