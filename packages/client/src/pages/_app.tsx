import type { AppProps } from "next/app";

import { MainLayout } from "src/components/layout/main-layout";
import { ContextCompose } from "src/context/ContextCompose";

import "src/styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => (
    <MainLayout>
      {page}
    </MainLayout>
  ));

  return getLayout(
    <ContextCompose>
      <Component {...pageProps} />
    </ContextCompose>
  );
}
