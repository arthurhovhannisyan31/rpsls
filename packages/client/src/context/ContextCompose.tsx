import { type PropsWithChildren , type ReactNode, type FC } from "react";

import { StoreContextContainer } from "./StoreContext";

export const ContextCompose: FC<PropsWithChildren> = ({ children }) => (
  <>
    {[
      StoreContextContainer
    ].reduceRight(
      (child: ReactNode, Container: FC<PropsWithChildren>) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
);
