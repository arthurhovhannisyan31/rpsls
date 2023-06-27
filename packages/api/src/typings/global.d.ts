declare global {
  type AnyArgsFunction = (...args: any) => void;

  interface Action<T> {
    type: string;
    payload: T
  }

  type SimpleAction = Action<unknown>;

  type CreateAction = <T>(type: string, payload: T) => Action<T>

  type CreateSimpleAction = (type: string) => SimpleAction
}
export default global;
