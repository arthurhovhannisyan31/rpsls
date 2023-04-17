import { Subject } from "src/utils/observer";

import { GameStore } from "./game"
import { RoomsStore } from "./rooms"
import { SettingsStore } from "./settings"

export class RootStore {
  subject = new Subject();
  game: GameStore;
  rooms: RoomsStore;
  settings: SettingsStore;

  constructor() {
    this.game = new GameStore(this);
    this.rooms = new RoomsStore(this);
    this.settings = new SettingsStore(this);

    this.subject.addObserver(this.game);
    this.subject.addObserver(this.rooms);
    this.subject.addObserver(this.settings);
  }

  notify = (data: Action<any>) => {
    this.subject.notify(data);
  }
}

export const rootStore = new RootStore();

