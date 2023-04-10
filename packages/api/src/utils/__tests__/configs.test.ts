import { getConnectionString } from "../configs";

describe("configs", () => {
  test("getConnectionString", () => {
    const dbName = "dbName";
    const compare_value = "mongodb://TEXT:TEXT@host.docker.internal:27017/dbName?authSource=admin";
    expect(getConnectionString(dbName)).toEqual(compare_value);
  });
});
