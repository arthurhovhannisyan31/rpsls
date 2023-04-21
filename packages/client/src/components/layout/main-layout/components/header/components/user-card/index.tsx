import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";

import { NameModal } from "src/components/ui/modals/name";
import { useStore } from "src/hooks";
import { NetworkRequestStatus } from "src/typings/enums";

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
      <NameModal
        label={"Please enter your name:"}
        open={open}
        onClose={closeModal}
        errorMessage={user.errorMessage}
        loading={user.status === NetworkRequestStatus.PENDING}
        onSubmit={user.login}
      />
    </>
  );
});

UserCard.displayName = "UserCard";
