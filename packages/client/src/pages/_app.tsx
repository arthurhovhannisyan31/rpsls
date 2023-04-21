import { type ReactElement, type ReactNode } from "react";

import { MainLayout } from "src/components/layout/main-layout";
import { ContextCompose } from "src/context/ContextCompose";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "src/styles/globals.css";

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ContextCompose>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ContextCompose>
  );
}
