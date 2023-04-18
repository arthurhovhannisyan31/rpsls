import { makeObservable, observable, action } from "mobx";

import { FieldError, Room, Rooms } from "src/models/generated";
import { RootStore } from "src/store/store";
import { NetworkRequestStatus } from "src/typings/enums";
import { Observer } from "src/utils/observer";

export class RoomsStore implements Observer<Action<any>> {
  rootStore: RootStore;
  status: NetworkRequestStatus = NetworkRequestStatus.IDLE;
  rooms: Room[] = [];
  errors: FieldError[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this,{
      status: observable,
      rooms: observable,
      setRooms: action
    });
    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }

  setRooms = (data: Rooms) => {
    if (data?.errors){
      this.status = NetworkRequestStatus.ERROR;
      this.errors = data?.errors;
    } else if (data?.data){
      this.status = NetworkRequestStatus.DONE;
      this.rooms = data.data as Room[];
    }
  };
}
