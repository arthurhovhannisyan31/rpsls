import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";

import { Routes } from "src/typings/enums";

import styles from "./Navigation.module.css";

export interface NavigationComponentProps {
  currentPath: string;
}

export const NAV_LINK_ID = "nav-link-id";

export const NavigationComponent = memo<NavigationComponentProps>(({
  currentPath,
}) => {
  return(
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link
            data-testid={`${NAV_LINK_ID}-rooms`}
            href={Routes.ROOMS}
            className={clsx(styles.link, {
              [styles.activeLink]: currentPath === Routes.ROOMS
            })}
          >
            Main
          </Link>
        </li>
        <li>
          <Link
            data-testid={`${NAV_LINK_ID}-about`}
            href={Routes.ABOUT}
            className={clsx(styles.link, {
              [styles.activeLink]: currentPath === Routes.ABOUT
            })}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
});

NavigationComponent.displayName = "NavigationComponent";
