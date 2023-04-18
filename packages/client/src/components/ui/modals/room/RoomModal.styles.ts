import { SxProps } from "@mui/system/styleFunctionSx";

export const style: SxProps<any> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexFlow: "column",
  alignItems: "center"
};
