import { makeAutoObservable, runInAction } from "mobx";

import { RUNTIME_API_URL } from "src/constants";
import { mutationRoundEnd, mutationRoundPlay, mutationRoundStart } from "src/gql/mutations";
import { ChoiceEnum, FieldError, Room, Round, RoomType } from "src/models/generated";
import { RootStore } from "src/store/store";
import { GameStatus, NetworkRequestStatus, UserRole } from "src/typings/enums";
import { RoundEndResponse, RoundPlayResponse, RoundStartResponse } from "src/typings/models/rounds";
import { wrappedFetch } from "src/utils";
import { Observer } from "src/utils/observer";

export class GameStore implements Observer<Action<any>> {
  rootStore: RootStore;
  status: NetworkRequestStatus = NetworkRequestStatus.IDLE;
  gameStatus: GameStatus = GameStatus.IDLE;
  myRole?: UserRole;
  scores: any[] = [];
  round?: OmitTypeName<Round>;
  room?: OmitTypeName<Room>;
  error?: FieldError;
  autoplay = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  update(action: Action<any>){
    console.log(action);
  }

  setRoomProps = (room: OmitTypeName<Room>) => {
    this.room = room;
    if (this.rootStore.user.userName === room.host.name){
      this.myRole = UserRole.HOST;
    }
  };

  getGameProps = () => {
    return {
      room: this.room,
      myRole: this.myRole,
      scores: this.scores,
      round: this.round,
      gameStatus: this.gameStatus,
      status: this.status,
    };
  };

  setGameProps = () => {

  };

  resetGameProps = () => {
    console.log("reset");
    this.room = undefined;
    this.myRole = undefined;
    this.room = undefined;
    this.scores = [];
    this.round = undefined;
    this.gameStatus = GameStatus.IDLE;
    this.status = NetworkRequestStatus.IDLE;
  };

  setHostChoice = (choice: ChoiceEnum) => {
    if (!this.round?.host) return;

    this.round.host.choice = choice;
  };

  getWinner = (): string => {
    if (!this.room || !this.round) return "";

    let winnerName = "";

    if (this.round.ended){
      winnerName = this.round.winner?.name as string;

      if (!winnerName){
        winnerName = "It is a tie!";
      }
    }

    return winnerName;
  };

  startRound = async (room: string) => {
    this.autoplay = true;

    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(
        RUNTIME_API_URL,
        mutationRoundStart({ room })
      );
      const data: RoundStartResponse = await res.json();
      const roundStart = data.data?.roundStart;
      if (roundStart?.errors){
        const error = roundStart?.errors[0];
        if (error) {
          this.status = NetworkRequestStatus.ERROR;
          this.error = error;
        }
      } else if(roundStart?.data){
        this.round = roundStart?.data;
        this.status = NetworkRequestStatus.DONE;
        this.gameStatus = GameStatus.BET;
      }
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  playRound = async (_id: string, choice: ChoiceEnum) => {
    if (!this.round || !this.room) return;

    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(
        RUNTIME_API_URL,
        mutationRoundPlay({ _id, choice })
      );
      const data: RoundPlayResponse = await res.json();
      const roundPlay = data.data?.roundPlay;
      if (roundPlay?.errors){
        const error = roundPlay?.errors[0];
        if (error) {
          this.status = NetworkRequestStatus.ERROR;
          this.error = error;
        }
      } else if(roundPlay?.data){
        Object.assign(this.round, roundPlay?.data);
        if (this.room.roomType as RoomType === RoomType.Pvc){
          this.round.ended = true;
          this.gameStatus = GameStatus.RESULTS;
        }
        this.status = NetworkRequestStatus.DONE;
      }
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  endRound = async (_id: string) => {
    this.autoplay = false;

    if (!this.round || !this.room) return;

    runInAction(() => {
      this.status = NetworkRequestStatus.PENDING;
    });

    try {
      const res = await wrappedFetch(
        RUNTIME_API_URL,
        mutationRoundEnd({ _id })
      );
      const data: RoundEndResponse = await res.json();
      const roundEnd = data.data?.roundEnd;
      if (roundEnd?.errors){
        const error = roundEnd?.errors[0];
        if (error) {
          this.status = NetworkRequestStatus.ERROR;
          this.error = error;
        }
      } else if(roundEnd?.data){
        Object.assign(this.round, roundEnd?.data);
        this.status = NetworkRequestStatus.DONE;
        this.gameStatus = GameStatus.RESULTS;
      }
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.status = NetworkRequestStatus.ERROR;
      });
    }
  };

  stopRound = () => {
    this.gameStatus = GameStatus.STOP;
  };

  clearRounds = () => {
    this.scores = [];
  };

  updateScores = () => {

  };
}
