import { request } from "graphql-request";

export const APIFetcher = (query: string) => request("/graphql", query);
