import { makeObservable, observable } from "mobx";

import { RootStore } from "src/store/store";
import { Observer } from "src/utils/observer";

export class RoomsStore implements Observer<Action<any>>{
  rootStore: RootStore;
  status: "idle" | "fetching" | "done" | "error" = "idle" // TODO look for network statuses in api
  rooms: any[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this,{
      status: observable,
      rooms: observable
    })
    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }
}
