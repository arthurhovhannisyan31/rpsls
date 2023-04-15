import { SessionModel, type Session, sessionDataStub } from "../../session";
import { getMergedObject } from "../../utils";
import * as db from "../../utils";

const getSessionDataMock = getMergedObject(sessionDataStub);

beforeAll(async () => await db.setup());
afterEach(async () => await db.dropCollection());
afterAll(async () => await db.dropDatabase());

describe("session model", () => {
  it("creates a session object", () => {
    const session = new SessionModel(getSessionDataMock());
    expect(async () => await session.validate()).not.toThrow();
  });
  describe.each([
    ["_id", { _id: "" }],
    ["user_id", { user_id: "" }],
    ["uuid", { uuid: "" }],
    ["expired", { expired: false }],
  ])("%#) fails session validation", (fieldName: string, data: Partial<Session>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const session = new SessionModel(getSessionDataMock(data));
      const err = await session.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
