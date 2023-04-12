import { RoomModel, type Room, roomDataStub } from "models/room";
import { getMergedObject } from "models/utils";
import * as db from "models/utils/mongodb-mock";

import { RoomType, RoomStatus } from "../enums";

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
    ["type", { type: RoomType.PVC }],
    ["name", { name: "" }],
    ["host_id", { host_id: "" }],
    ["guest_id", { guest_id: "" }],
    ["status", { status: RoomStatus.Open }],
  ])("%#) fails room validation", (fieldName: string, data: Partial<Room>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const room = new RoomModel(getRoomDataMock(data));
      const err = await room.validateSync();
      expect(err).not.toBeNull();
    });
  });
});
