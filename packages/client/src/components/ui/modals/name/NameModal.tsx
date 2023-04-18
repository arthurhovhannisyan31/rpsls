import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState, ChangeEvent, useMemo, useEffect, memo, KeyboardEvent } from "react";

import { handleEnterKeyDown } from "src/components/ui/modals/helpers";
import { useEvent } from "src/hooks";
import { getStringValidation, PassportStrengthValidation } from "src/utils/string-validator";

import styles from "./NameModal.module.css";

export interface NameModalProps {
  label: string;
  onSubmit: (val: string) => void;
  open?: boolean;
  onClose: () => void;
  errorMessage: string;
  loading?: boolean;
}

const NAME_MODAL_ID = "NAME_MODAL_ID";

export const NameModal = memo<NameModalProps>(
({
  label,
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

  const disableConfirm = loading || !!validationError;

  const handleKeyDownSubmit = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!disableConfirm) {
        handleEnterKeyDown(handleSubmit)(event);
      }
    },
    [disableConfirm, handleSubmit],
  );

  return (
    <div>
      <Modal
        open={!!open}
        onClose={onClose}
      >
        <Box className={styles.box}>
          <Typography id={`${NAME_MODAL_ID}-label`} variant="h6" component="h2">
            {label}
          </Typography>
          <TextField
            id={`${NAME_MODAL_ID}-text-input`}
            label="Name"
            variant="standard"
            value={name}
            onChange={handleInputChange}
            error={!!(error && name.length)}
            helperText={name.length ? error : ""}
            disabled={loading}
            onKeyDown={handleKeyDownSubmit}
          />
          <Button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={disableConfirm}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
});

NameModal.displayName = "NameModal";
