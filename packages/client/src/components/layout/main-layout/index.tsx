import { observer } from "mobx-react-lite";
import Head from "next/head";
import { type ReactNode } from "react";

import { useStore } from "src/hooks";
import { useFetchMe } from "src/hooks/useFetchMe";

import { Header } from "./components/header";

import styles from "./MainLayout.module.css";

export interface MainLayoutProps {
  children: ReactNode;
}
export const MainLayout = observer<MainLayoutProps>(({ children }) => {
  const { game } = useStore();

  const roomName = game.room?.name ?? "";

  useFetchMe();

  return(
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header
          roomName={roomName}
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
});

MainLayout.displayName = "MainLayoutProps";
