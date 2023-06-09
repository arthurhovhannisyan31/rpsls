import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";

declare global {
  type AnyArgsFunction = (...args: any) => void;

  interface Action<T> {
    type: string;
    payload: T
  }

  type SimpleAction = Action<unknown>;

  type CreateAction = <T>(type: string, payload: T) => Action<T>

  type CreateSimpleAction = (type: string) => SimpleAction

  type OmitTypeName<T> = Omit<T, "__typename">

  interface QueryProps {
    query: string
    variables?: Record<
      string,
      string | number | Record<string, string | number | null>
    >
  }

  type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}
export default global;
