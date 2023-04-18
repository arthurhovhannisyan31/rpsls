import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FC, useCallback, useState, ChangeEvent, useMemo, useEffect } from "react";

import { useEvent } from "src/hooks";
import { getStringValidation, PassportStrengthValidation } from "src/utils/string-validator";

import styles from "./Login.module.css";

export interface LoginFormComponentProps {
  onSubmit: (val: string) => void;
  open?: boolean;
  onClose: () => void;
  errorMessage: string;
  loading?: boolean;
}

const LOGIN_FORM_ID = "LOGIN_FORM_ID";

export const LoginFormComponent: FC<LoginFormComponentProps> = ({
  open,
  onClose,
  onSubmit,
  errorMessage,
  loading
}) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<PassportStrengthValidation>({
    tooLong: false,
    tooShort: false,
    hasSpecial: false
  });

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleSubmit = useEvent(() => {
    onSubmit(name);
  });

  useEffect(() => {
    setErrors(getStringValidation(name));
  }, [name]);

  const validationError = useMemo(() => {
    let messages = [];
    if (errors.hasSpecial){
      messages.push("Name has non-word characters!");
    }
    if (errors.tooShort){
      messages.push("Name is too short");
    }
    if (errors.tooLong){
      messages.push("Name is too long");
    }
    return messages.join(", ");
  }, [errors]);

  const error = validationError || errorMessage;

  return (
    <div>
      <Modal
        open={!!open}
        onClose={onClose}
      >
        <Box className={styles.box}>
            <Typography id={`${LOGIN_FORM_ID}-label`} variant="h6" component="h2">
              Please enter your name:
            </Typography>
            <TextField
              id={`${LOGIN_FORM_ID}-text-input`}
              label="Name"
              variant="standard"
              value={name}
              onChange={handleInputChange}
              error={!!(error && name.length)}
              helperText={name.length ? error : ""}
              disabled={loading}
            />
            <Button
              className={styles.submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </Button>
        </Box>
      </Modal>
    </div>
  );
};

LoginFormComponent.displayName = "LoginFormComponent";
