import { makeObservable, observable } from "mobx";

import { RootStore } from "src/store/store";
import { Observer } from "src/utils/observer";

export class GameStore implements Observer<Action<any>> {
  rootStore: RootStore;
  status: "idle" | "fetching" | "done" | "error" = "idle";
  gamePhase: "idle" | "betting" | "waitingResults" = "idle";
  host: any = {};
  guest: any = {};
  myRole: "guest" | "host" = "host";
  scores: any[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this,{
      status: observable,
      gamePhase: observable,
      host: observable,
      guest: observable,
      myRole: observable,
      scores: observable,
    });
    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }
}
