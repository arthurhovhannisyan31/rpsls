export const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

export const getFetchConfig = (props: QueryProps): RequestInit => ({
  method: "POST",
  body: JSON.stringify(props),
  headers,
});
