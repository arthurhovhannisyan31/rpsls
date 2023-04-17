import { type PropsWithChildren , type ReactNode, type FC } from "react";

import { SnackbarContextContainer } from "./SnackbarContext";
import { StoreContextContainer } from "./StoreContext";

export const ContextCompose: FC<PropsWithChildren> = ({ children }) => (
  <>
    {[
      StoreContextContainer,
      SnackbarContextContainer
    ].reduceRight(
      (child: ReactNode, Container: FC<PropsWithChildren>) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
);
