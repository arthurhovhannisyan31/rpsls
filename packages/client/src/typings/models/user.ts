import { type Mutation, type Query } from "src/models/generated";

export type LoginResponse = {
  data?: {
    login: Mutation["login"]
  }
}

export type MeResponse = {
  data?: {
    me: Query["me"]
  }
}

export type LogoutResponse = {
  data?: {
    logout: Mutation["logout"]
  }
}
