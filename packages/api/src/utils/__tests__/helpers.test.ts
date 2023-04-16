import { type Request } from "express";

import { parseCookies } from "../context-handler";

describe("utils/helpers", () => {
  test.each([
    [
      "SID=fe5fb997-8252-4175-b5a4-fb91a1e43140; SameSite=Lax; Secure; HttpOnly; Expires=2023-04-16T09:15:55.160Z",
      {
        SID: "fe5fb997-8252-4175-b5a4-fb91a1e43140",
        SameSite: "Lax",
        Expires: "2023-04-16T09:15:55.160Z"
      }
    ],
    [
      "SID=fe5fb997-8252-4175-b5a4-fb91a1e43140; SameSite=Lax; Expires=2023-04-16T09:15:55.160Z",
      {
        SID: "fe5fb997-8252-4175-b5a4-fb91a1e43140",
        SameSite: "Lax",
        Expires: "2023-04-16T09:15:55.160Z"
      }
    ],
    [
      "SID=fe5fb997-8252-4175-b5a4-fb91a1e43140; SameSite=Lax;",
      {
        SID: "fe5fb997-8252-4175-b5a4-fb91a1e43140",
        SameSite: "Lax",
      }
    ],
    [
      "SID=fe5fb997-8252-4175-b5a4-fb91a1e43140;",
      {
        SID: "fe5fb997-8252-4175-b5a4-fb91a1e43140",
      }
    ],
    [
      "",
      {}
    ],
  ])("%#) should return parsed cookie object", (
    cookieStr: string, target: Record<string, string>
  ) => {
    expect(parseCookies(
      {
        headers: {
          cookie: cookieStr
        }
      } as Request
    )).toEqual(target);
  });
});
