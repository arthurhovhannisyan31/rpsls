export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Game choice */
export type Choice = {
  __typename?: "Choice";
  _id: Scalars["ID"];
  name: Scalars["String"];
  value: Scalars["String"];
};

/** One of game options: rock, paper, scissors, spock, lizard */
export enum ChoiceEnum {
  Lizard = "LIZARD",
  Paper = "PAPER",
  Rock = "ROCK",
  Scissors = "SCISSORS",
  Spock = "SPOCK"
}

/** Choice response type */
export type ChoiceResponse = ResponseData & {
  __typename?: "ChoiceResponse";
  data?: Maybe<Choice>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Choices response type */
export type ChoicesResponse = ResponseData & {
  __typename?: "ChoicesResponse";
  data?: Maybe<Array<Maybe<Choice>>>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Create room type */
export type CreateRoom = ResponseData & {
  __typename?: "CreateRoom";
  data?: Maybe<Room>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Field error */
export type FieldError = {
  __typename?: "FieldError";
  message: Scalars["String"];
  path: Scalars["String"];
};

/** Login response type */
export type LoginResponse = ResponseData & {
  __typename?: "LoginResponse";
  data?: Maybe<User>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Logout response type */
export type LogoutResponse = ResponseData & {
  __typename?: "LogoutResponse";
  data?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Me response type */
export type MeResponse = ResponseData & {
  __typename?: "MeResponse";
  data?: Maybe<User>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createRoom?: Maybe<CreateRoom>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<LogoutResponse>;
  roundEnd?: Maybe<RoundStop>;
  roundPlay?: Maybe<RoundPlay>;
  roundStart?: Maybe<RoundStart>;
  updateRoom?: Maybe<UpdateRoom>;
};

export type MutationCreateRoomArgs = {
  name: Scalars["String"];
  roomType: Scalars["String"];
};

export type MutationLoginArgs = {
  name: Scalars["String"];
};

export type MutationRoundEndArgs = {
  _id: Scalars["String"];
};

export type MutationRoundPlayArgs = {
  _id: Scalars["String"];
  choice: ChoiceEnum;
};

export type MutationRoundStartArgs = {
  room: Scalars["String"];
};

export type MutationUpdateRoomArgs = {
  _id: Scalars["String"];
  action: RoomUpdateAction;
};

export type Query = {
  __typename?: "Query";
  choice?: Maybe<ChoiceResponse>;
  choices?: Maybe<ChoicesResponse>;
  me?: Maybe<MeResponse>;
  room?: Maybe<SingleRoom>;
  rooms?: Maybe<Rooms>;
};

export type QueryRoomArgs = {
  _id: Scalars["String"];
};

export type QueryRoomsArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

/** Response data */
export type ResponseData = {
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Room object */
export type Room = {
  __typename?: "Room";
  _id: Scalars["ID"];
  active: Scalars["Boolean"];
  guest?: Maybe<User>;
  host: User;
  name: Scalars["String"];
  open: Scalars["Boolean"];
  roomType: RoomType;
};

/** Displays type of opponent */
export enum RoomType {
  /** Person versus computer */
  Pvc = "PVC",
  /** Person versus person */
  Pvp = "PVP"
}

/** Type of action in room for user: join, leave */
export enum RoomUpdateAction {
  Join = "JOIN",
  Leave = "LEAVE"
}

/** Rooms collection type */
export type Rooms = ResponseData & {
  __typename?: "Rooms";
  data?: Maybe<Array<Maybe<Room>>>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Game round */
export type Round = {
  __typename?: "Round";
  _id: Scalars["ID"];
  ended: Scalars["Boolean"];
  guest?: Maybe<UserRoundProps>;
  host?: Maybe<UserRoundProps>;
  room?: Maybe<Room>;
  winner?: Maybe<User>;
};

/** Round play type */
export type RoundPlay = ResponseData & {
  __typename?: "RoundPlay";
  data?: Maybe<Round>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Round start */
export type RoundStart = ResponseData & {
  __typename?: "RoundStart";
  data?: Maybe<Round>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Round stop type */
export type RoundStop = ResponseData & {
  __typename?: "RoundStop";
  data?: Maybe<Round>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Room type */
export type SingleRoom = ResponseData & {
  __typename?: "SingleRoom";
  data?: Maybe<Room>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

export type Subscription = {
  __typename?: "Subscription";
  greetings?: Maybe<Scalars["String"]>;
};

/** Update room type */
export type UpdateRoom = ResponseData & {
  __typename?: "UpdateRoom";
  data?: Maybe<Room>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Any real person */
export type User = {
  __typename?: "User";
  name: Scalars["String"];
};

/** User props per round */
export type UserRoundProps = {
  __typename?: "UserRoundProps";
  choice?: Maybe<ChoiceEnum>;
  user?: Maybe<User>;
};
