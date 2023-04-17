import { memo, useCallback, useContext } from "react";

import { SnackbarComponent } from "src/components/ui/snackbar/Snackbar";
import { SnackbarContext, SnackbarContextProps } from "src/context";

export interface SnackbarProps {}

export const Snackbar = memo<SnackbarProps>(() => {
  const {
    snackbarState: { message, open, type },
    setSnackbarState,
  } = useContext<SnackbarContextProps>(SnackbarContext);

  const handleClose = useCallback((): void => {
    setSnackbarState({ open: false });
  }, [setSnackbarState]);

  return(
      <SnackbarComponent
        message={message}
        handleClose={handleClose}
        open={open}
        type={type}
      />
  );
});

Snackbar.displayName = "Snackbar";
