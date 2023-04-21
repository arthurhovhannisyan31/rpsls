import { makeAutoObservable, runInAction } from "mobx";

import { RUNTIME_API_URL } from "src/constants";
import { mutationLogin, mutationLogout } from "src/gql/mutations";
import { queryMe } from "src/gql/queries";
import { NetworkRequestStatus } from "src/typings/enums";
import { type LoginResponse, type MeResponse } from "src/typings/models/user";
import { wrappedFetch } from "src/utils";
import { type Observer } from "src/utils/observer";

import { type RootStore } from "./store";

export class UserStore implements Observer<Action<any>>{
  rootStore: RootStore;
  userName = "";
  triedToRequest = false;
  status: NetworkRequestStatus = NetworkRequestStatus.IDLE;
  errorMessage = "";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }

  userProps = () => {
    return {
      userName: this.userName,
      triedToRequest: this.triedToRequest,
      status: this.status,
      errorMessage: this.errorMessage
    };
  };

  logout = async () => {
    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(RUNTIME_API_URL, mutationLogout());
      await res.json();

      runInAction(() => {
        this.status = NetworkRequestStatus.IDLE;
        this.userName = "";
        this.errorMessage = "";
      });
    } catch (err){
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  me = async () => {
    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
      this.triedToRequest = true;
    });

    try {
      const res = await wrappedFetch(RUNTIME_API_URL, queryMe());
      const data: MeResponse = await res.json();

        runInAction(() => {
          const me = data.data?.me;
          if (me?.data){
            this.userName = me.data.name;
          }
          this.status = NetworkRequestStatus.DONE;
        });
    } catch (err){
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  login = async (name: string) => {
    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
      this.triedToRequest = true;
    });

    try {
      const res = await wrappedFetch(RUNTIME_API_URL, mutationLogin({ name }));
      const data: LoginResponse = await res.json();

      runInAction(() => {
        const login = data.data?.login;
        if (login?.errors){
          const error = login.errors[0];
          if (error){
            this.status = NetworkRequestStatus.ERROR;
            this.errorMessage = error.message;
          }
        } else if (login?.data) {
          this.errorMessage = "";
          this.userName = login.data.name;
          this.status = NetworkRequestStatus.DONE;
        }
      });
    } catch (err){
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };
}
