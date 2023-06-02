import { type FC } from "react";

export const ServerError: FC = () => {
  return(
      <div>
        <span>Server-side error occurred</span>
      </div>
  );
};

ServerError.displayName = "ServerError";

export default ServerError;
