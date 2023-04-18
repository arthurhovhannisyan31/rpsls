import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";

export interface UserCardComponentProps {
  name: string;
  score: number;
}

export const UserCardComponent = memo<UserCardComponentProps>(({
  name,
  score
}) => {
  return(
    <Box>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {score}
      </Typography>
    </Box>
  );
});

UserCardComponent.displayName = "UserCardComponent";
