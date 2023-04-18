import Image from "next/image";
import Link from "next/link";

import { Navigation } from "./components/navigation";
import { UserCard } from "./components/user-card";

import styles from "./Header.module.css";

export const Header = () => {

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
      <div className={styles.right}>
        <UserCard />
      </div>
    </div>
  );
};

Header.displayName = "HeaderWrap";
