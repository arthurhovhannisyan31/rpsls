import { ChoiceValue } from "../../choices";
import { RoundModel, type Round, roundDataStub } from "../../round";
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
    ["room", { room: "" }],
    ["host", { host: { user: "", choice: ChoiceValue.Rock, choice_change_count: 1 } }],
    ["guest", { guest: { user: "", choice: ChoiceValue.Rock, choice_change_count: 1 } }],
    ["winner", { winner: "" }],
    ["ended", { ended: false }],
  ])("%#) fails round validation", (fieldName: string, data: Partial<Round>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const round = new RoundModel(getRoundDataMock(data));
      const err = await round.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
