import { type Session } from "../../../models/session";
import { isSessionExpired } from "../helpers";

describe("session helpers", () => {
  let date = new Date();

  beforeEach(() => {
    date = new Date();
  });

  /**
   * negative numbers stand for future hours
   * zero stands for current time
   * positive stands for past hours
   */
  test.each([
    [-10, false ],
    [-1, false ],
    [0, false ],
    [1, false ],
    [24, false],
    [25, true],
  ])("%#) checks if session %o is expired", (hour: number, target: boolean) => {
    date.setHours(date.getHours() - hour);

    expect(isSessionExpired({ updatedAt: date } as unknown as Session)).toEqual(target);
  });
});
