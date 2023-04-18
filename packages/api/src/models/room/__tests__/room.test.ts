import { RoomType } from "../../../typings/enum";
import { RoomModel, type Room, roomDataStub } from "../../room";
import { getMergedObject } from "../../utils";
import * as db from "../../utils";

const getRoomDataMock = getMergedObject(roomDataStub);

beforeAll(async () => await db.setup());
afterEach(async () => await db.dropCollection());
afterAll(async () => await db.dropDatabase());

describe("room model", () => {
  it("creates a room object", () => {
    const room = new RoomModel(getRoomDataMock());
    expect(async () => await room.validate()).not.toThrow();
  });
  describe.each([
    ["_id", { _id: "" }],
    ["roomType", { roomType: RoomType.PVC }],
    ["name", { name: "" }],
    ["host", { host: "" }],
    ["guest", { guest: "" }],
    ["open", { open: true }],
    ["active", { active: true }],
  ])("%#) fails room validation", (fieldName: string, data: Partial<Room>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const room = new RoomModel(getRoomDataMock(data));
      const err = await room.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
