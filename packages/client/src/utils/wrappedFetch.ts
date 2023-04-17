import { getFetchConfig } from "src/utils/fetch-configs";

export const wrappedFetch = async (
  query: QueryProps,
): Promise<Response>  => {
  return await fetch(
    `${process.env.FULL_API_URL}/graphql`,
    getFetchConfig(query)
  )
}
