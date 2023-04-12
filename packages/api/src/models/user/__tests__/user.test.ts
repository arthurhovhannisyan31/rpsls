import { UserModel, type User, userDataStub } from "../../user";
import { getMergedObject } from "../../utils";
import * as db from "../../utils";

const getUserDataMock = getMergedObject(userDataStub);

beforeAll(async () => await db.setup());
afterEach(async () => await db.dropCollection());
afterAll(async () => await db.dropDatabase());

describe("user model", () => {
  it("creates a user object", () => {
    const user = new UserModel(getUserDataMock());
    expect(async () => await user.validate()).not.toThrow();
  });
  describe.each([
    ["_id", { _id: "" }],
    ["name", { name: "" }],
  ])("%#) fails user validation", (fieldName: string, data: Partial<User>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const user = new UserModel(getUserDataMock(data));
      const err = await user.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
