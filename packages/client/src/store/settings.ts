import { makeObservable, observable } from "mobx";

import { Theme } from "src/typings/enums";
import { Observer } from "src/utils/observer";

import { RootStore } from "./store";

interface UserProps {
  name: string;
  authenticated: boolean;
}

export class SettingsStore implements Observer<Action<any>>{
  rootStore: RootStore;
  user: UserProps = {
    name: "",
    authenticated: false
  };
  theme: Theme = Theme.DARK;

  constructor(rootStore: RootStore) {
    makeObservable(this,{
      user: observable,
      theme: observable
    })
    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }
}
