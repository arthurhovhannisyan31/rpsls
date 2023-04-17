import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { memo } from "react";

import { SnackbarProps } from "src/context/SnackbarContext";

export interface SnackbarComponentProps extends SnackbarProps{
  handleClose: () => void;
}

export const SnackbarComponent = memo<SnackbarComponentProps>(({
  handleClose,
  type,
  message,
  open
}) => {

  return(
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
});

SnackbarComponent.displayName = "SnackbarComponent";
