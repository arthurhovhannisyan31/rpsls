import { RoundModel, type Round, roundDataStub, Choice } from "../../round";
import { getMergedObject } from "../../utils";
import * as db from "../../utils/mongodb-mock";

const getRoundDataMock = getMergedObject(roundDataStub);

beforeAll(async () => await db.setup());
afterEach(async () => await db.dropCollection());
afterAll(async () => await db.dropDatabase());

describe("round model", () => {
  it("creates a round object", () => {
    const round = new RoundModel(getRoundDataMock());
    expect(async () => await round.validate()).not.toThrow();
  });
  describe.each([
    ["_id", { _id: "" }],
    ["room_id", { room_id: "" }],
    ["host_choice", { host_choice: Choice.Rock }],
    ["guest_choice", { guest_choice: Choice.Rock }],
    ["winner_id", { winner_id: "" }],
  ])("%#) fails round validation", (fieldName: string, data: Partial<Round>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const round = new RoundModel(getRoundDataMock(data));
      const err = await round.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
