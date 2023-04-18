import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";

import { LoginForm } from "src/components/ui/modals/login";
import { useStore } from "src/hooks";

import { UserCardComponent } from "./UserCard";

export const UserCard = observer(() => {
  const { user } = useStore();

  const [open, setOpen] = useState(false);

  const logout = useCallback(() => {
    user.logout();
  }, [user]) ;

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (user.userName){
      if (open){
        setOpen(false);
      }
    }
  }, [open, user.userName]);

  return(
    <>
      <UserCardComponent
        name={user.userName}
        login={openModal}
        logout={logout}
      />
      <LoginForm
        open={open}
        onClose={closeModal}
      />
    </>
  );
});

UserCard.displayName = "UserCard";
