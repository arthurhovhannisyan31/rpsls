export const BASE_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

export const getFetchConfig = (
  props: QueryProps,
  extraHeaders?: Record<string, string>
): RequestInit => ({
  method: "POST",
  credentials: "include",
  body: JSON.stringify(props),
  headers: {
    ...BASE_HEADERS,
    ...extraHeaders
  },
});
