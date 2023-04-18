import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";

import { LoginFormComponent } from "src/components/ui/modals/login/Login";
import { useStore } from "src/hooks";
import { NetworkRequestStatus } from "src/typings/enums";

export interface LoginFormProps {
  open?: boolean;
  onClose: () => void;
}

export const LoginForm: FC<LoginFormProps> = observer(({
  open,
  onClose
}) => {
  const { user } = useStore();

  const submit = useCallback((val: string) => {
    user.login(val);
  }, [user]);

  return(
    <LoginFormComponent
      open={open}
      onClose={onClose}
      onSubmit={submit}
      errorMessage={user.errorMessage}
      loading={user.status === NetworkRequestStatus.PENDING}
    />
  );
});

LoginForm.displayName = "LoginForm";
