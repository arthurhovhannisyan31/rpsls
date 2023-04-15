import { type Choice, ChoiceModel, choicesStub } from "../../choices";
import { getMergedObject } from "../../utils";
import * as db from "../../utils";

const getChoiceDataMock = getMergedObject(choicesStub);

beforeAll(async () => await db.setup());
afterEach(async () => await db.dropCollection());
afterAll(async () => await db.dropDatabase());

describe("choice model", () => {
  it("creates a choice object", () => {
    const choice = new ChoiceModel(getChoiceDataMock());
    expect(async () => await choice.validate()).not.toThrow();
  });
  describe.each([
    ["_id", { _id: "" }],
    ["value", { name: "" }],
    ["name", { name: "" }],
  ])("%#) fails choice validation", (fieldName: string, data: Partial<Choice>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const choice = new ChoiceModel(getChoiceDataMock(data));
      const err = await choice.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
