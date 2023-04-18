import { Mutation, Round, FieldError, Maybe } from "src/models/generated";

export type RoundResponseData = {
  data?: Maybe<Round>;
  errors: Maybe<Array<FieldError>>
}

export type RoundStartResponse = {
  data?: {
    roundStart: Mutation["roundStart"]
  }
}

export type RoundPlayResponse = {
  data?: {
    roundPlay: Mutation["roundPlay"]
  }
}

export type RoundEndResponse = {
  data?: {
    roundEnd: Mutation["roundEnd"]
  }
}
