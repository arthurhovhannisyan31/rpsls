import { Subject } from "src/utils/observer";

import { GameStore } from "./game";
import { RoomsStore } from "./rooms";
import { UserStore } from "./user";

export class RootStore {
  subject = new Subject();
  game: GameStore;
  rooms: RoomsStore;
  user: UserStore;

  constructor() {
    this.game = new GameStore(this);
    this.rooms = new RoomsStore(this);
    this.user = new UserStore(this);

    this.subject.addObserver(this.game);
    this.subject.addObserver(this.rooms);
    this.subject.addObserver(this.user);
  }

  notify = (data: Action<any>) => {
    this.subject.notify(data);
  };
}

export const rootStore = new RootStore();
