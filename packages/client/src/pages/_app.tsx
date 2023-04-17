import { ReactElement, ReactNode } from "react";

import { ContextCompose } from "src/context/ContextCompose"

import type { NextPage } from "next"
import type { AppProps } from "next/app"

import "src/styles/globals.css"


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ContextCompose>
      <Component {...pageProps} />
    </ContextCompose>
  )
}
