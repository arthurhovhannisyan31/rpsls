import { makeAutoObservable, runInAction } from "mobx";

import { RUNTIME_API_URL } from "src/constants";
import { mutationCreateRoom , mutationUpdateRoom } from "src/gql/mutations";
import { type FieldError, type Room, type Rooms, type RoomUpdateAction } from "src/models/generated";
import { type RootStore } from "src/store/store";
import { NetworkRequestStatus } from "src/typings/enums";
import { type CreateRoomResponse, type RoomResponseData, type UpdateRoomResponse } from "src/typings/models/rooms";
import { wrappedFetch } from "src/utils";
import { type Observer } from "src/utils/observer";

export class RoomsStore implements Observer<Action<any>> {
  rootStore: RootStore;
  status: NetworkRequestStatus = NetworkRequestStatus.IDLE;
  rooms: Room[] = [];
  errors: FieldError[] = [];
  errorMessage = "";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  update(action: Action<any>) {
    console.log(action);
  }

  setRooms = (data: Rooms) => {
    if (data?.errors) {
      this.status = NetworkRequestStatus.ERROR;
      this.errors = data?.errors;
    } else if (data?.data) {
      this.status = NetworkRequestStatus.DONE;
      this.errorMessage = "";
      this.rooms = data.data as Room[];
    }
  };

  processRoomData = (data: RoomResponseData, cb?: (val: string) => void) => {
    runInAction(() => {
      if (data?.errors){
        const error = data.errors[0];
        if (error) {
          this.status = NetworkRequestStatus.ERROR;
          this.errorMessage = error.message;
        }
      } else if (data?.data){
        this.status = NetworkRequestStatus.DONE;
        this.errorMessage = "";
        cb?.(data.data._id);
      }
    });
  };

  updateRoom = async (
    _id: string,
    action: RoomUpdateAction,
    cb?: (val: string) => void
  ) => {
    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(
        RUNTIME_API_URL,
        mutationUpdateRoom({ _id, action })
      );
      const data: UpdateRoomResponse = await res.json();
      const updateRoom = data.data?.updateRoom;

      this.processRoomData(updateRoom as RoomResponseData, cb);
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  createRoom = async (
    name: string,
    roomType: string,
    cb: (val: string) => void
  ) => {
    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(
        RUNTIME_API_URL,
        mutationCreateRoom({
          name, roomType
        })
      );
      const data: CreateRoomResponse = await res.json();
      const createRoom = data.data?.createRoom;
      this.processRoomData(createRoom as RoomResponseData, cb);
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };
}
