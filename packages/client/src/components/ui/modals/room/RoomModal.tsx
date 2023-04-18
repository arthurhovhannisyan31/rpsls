import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState, ChangeEvent, useMemo, useEffect, memo, KeyboardEvent } from "react";

import { handleEnterKeyDown } from "src/components/ui/modals/helpers";
import { useEvent } from "src/hooks";
import { RoomType } from "src/typings/enums";
import { getStringValidation, PassportStrengthValidation } from "src/utils/string-validator";

import styles from "./RoomModal.module.css";

export interface RoomModalProps {
  label: string;
  onSubmit: (name: string, type: string) => void;
  open?: boolean;
  onClose: () => void;
  errorMessage: string;
  loading?: boolean;
}

const ROOM_MODAL_ID = "ROOM_MODAL_ID";

export const RoomModal = memo<RoomModalProps>(
({
  label,
  open,
  onClose,
  onSubmit,
  errorMessage,
  loading
}) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>(RoomType.PVC);

  const [errors, setErrors] = useState<PassportStrengthValidation>({
    tooLong: false,
    tooShort: false,
    hasSpecial: false
  });

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleSubmit = useEvent(() => {
    onSubmit(name, type);
  });

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    setType(event.target.value as string);
  }, []);

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

  useEffect(() => {
    setErrors(getStringValidation(name));
  }, [name]);

  return (
    <div>
      <Modal
        open={!!open}
        onClose={onClose}
      >
        <Box className={styles.box}>
          <Typography id={`${ROOM_MODAL_ID}-label`} variant="h6" component="h2">
            {label}
          </Typography>
          <TextField
            id={`${ROOM_MODAL_ID}-text-input`}
            label="Name"
            variant="standard"
            value={name}
            onChange={handleInputChange}
            error={!!(error && name.length)}
            helperText={name.length ? error : ""}
            disabled={loading}
            onKeyDown={handleKeyDownSubmit}
          />
          <FormControl
            variant="standard"
            className={styles.selectForm}
          >
            <InputLabel id={`${ROOM_MODAL_ID}-input`}>Age</InputLabel>
            <Select
              labelId={`${ROOM_MODAL_ID}-select`}
              value={type}
              label="Age"
              onChange={handleSelectChange}
            >
              <MenuItem value={RoomType.PVC}>{RoomType.PVC}</MenuItem>
              {/*<MenuItem value={RoomType.PVP}>{RoomType.PVP}</MenuItem>*/}
            </Select>
          </FormControl>
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

RoomModal.displayName = "RoomModal";
