import { ReactElement } from "react";

import { useSSEvents } from "src/hooks/useSSEvents";

import { MainLayout } from "../components/layout/main-layout"

import styles from "./index.module.css"

// header: icon, navigation, user login/logout + name
// grapql: query + mutation
// login modal
// rooms: components
// rooms query + mutation
// room: components
// room: query + mutations

// sse resolver
// components + notification
// favicon
//  Files inside public can then be referenced by your code starting from the base URL (/).
// ave error boundaries in
// material ui theme wrapper

export default function Home() {
  useSSEvents();

  return (
    <div className={styles.container}>

    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
