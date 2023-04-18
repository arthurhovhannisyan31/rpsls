import { getFetchConfig } from "src/utils/fetch-configs";

export const wrappedFetch = async (
  url: string,
  query: QueryProps,
): Promise<Response>  => {
  return await fetch(
    url,
    getFetchConfig(query)
  );
};
