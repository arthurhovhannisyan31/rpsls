export enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT"
}

export enum GameStatus {
  IDLE = "IDLE",
  BET = "BET",
  RESULTS = "RESULTS",
  STOP = "STOP"
}

export enum NetworkRequestStatus {
  IDLE = "IDLE",
  PENDING = "PENDING",
  DONE = "DONE",
  ERROR = "ERROR"
}

export enum Routes {
  ROOMS = "/rooms",
  ABOUT = "/about"
}

export enum RoomType {
  PVP = "PVP",
  PVC = "PVC"
}

export enum WinStatus {
  WIN = "WIN",
  LOOSE = "LOOSE",
  TIE = "TIE"
}

export enum UserRole {
  HOST = "HOST",
  GUEST = "GUEST"
}
