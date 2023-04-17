import { memo } from "react";
import Link from "next/link";

export interface NavigationComponentProps {}

export const NavigationComponent = memo<NavigationComponentProps>(() => {
  return(
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
    </ul>
  )
})

NavigationComponent.displayName = "NavigationComponent"
