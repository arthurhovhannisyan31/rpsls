import { action, makeObservable, observable, runInAction } from "mobx";

import { RUNTIME_API_URL } from "src/constants";
import { mutationLogin, mutationLogout } from "src/gql/mutations";
import { queryMe } from "src/gql/queries";
import { NetworkRequestStatus } from "src/typings/enums";
import { LoginResponse, MeResponse } from "src/typings/models/user";
import { wrappedFetch } from "src/utils";
import { Observer } from "src/utils/observer";

import { RootStore } from "./store";

export class UserStore implements Observer<Action<any>>{
  rootStore: RootStore;
  userName = "";
  triedToRequest = false;
  status: NetworkRequestStatus = NetworkRequestStatus.IDLE;
  errorMessage = "";

  constructor(rootStore: RootStore) {
    makeObservable(this,{
      userName: observable,
      triedToRequest: observable,
      status: observable,
      errorMessage: observable,
      login: action
    });
    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }

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
          if (data.data?.me?.data){
            this.userName = data.data.me.data.name;
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

      if (data.data?.login?.errors){
        const error = data.data.login.errors[0];
        if (error){
          runInAction(() => {// check
            this.status = NetworkRequestStatus.ERROR;
            this.errorMessage = error.message;
          });
        }
      } else if (data.data?.login?.data){
        this.status = NetworkRequestStatus.DONE;
        this.userName = data.data.login.data.name;
      }
    } catch (err){
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };
}
