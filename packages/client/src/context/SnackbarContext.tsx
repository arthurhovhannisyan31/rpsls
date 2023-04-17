import React, { useState, createContext, useCallback, PropsWithChildren, memo } from "react";

const snackbarInitState: SnackbarProps = {
  open: false,
  type: "success",
  message: "",
};

export type SnackbarType = "error" | "warning" | "info" | "success"

export interface SnackbarProps {
  open: boolean
  type: SnackbarType
  message: string
}

export interface SnackbarContextProps {
  snackbarState: SnackbarProps
  setSnackbarState: (props: Partial<SnackbarProps>) => void
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarState: snackbarInitState,
  setSnackbarState: () => null,
});

export const SnackbarContextContainer = memo<PropsWithChildren>(
({
 children,
}) => {
  const [snackbarState, setSnackbarState] = useState(snackbarInitState);

  const handleChange = useCallback(() => (props: Partial<SnackbarProps>): void => {
    setSnackbarState((state: SnackbarProps) => ({
      ...state,
      ...props,
    }));
  }, []);

  const contextValue = {
    snackbarState,
    setSnackbarState: handleChange,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
});

SnackbarContextContainer.displayName = "SnackbarContextContainer";
