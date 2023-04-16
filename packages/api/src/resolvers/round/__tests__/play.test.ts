import { playOptionsStub } from "./play.stub";
import { play } from "../helpers";

describe("winner selection logic", () => {
  test.each(playOptionsStub)("%#) %i vs %i should return %i", (choice1, choice2, result) => {
    expect(play(choice1, choice2)).toEqual(result);
  });
});
