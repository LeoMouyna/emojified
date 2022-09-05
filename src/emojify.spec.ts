import { EmojifyService } from "./emojify.service";

describe("Emojify text", () => {
  it("should add emoji BEFORE known words", () => {
    const basicText = "The dog is a desscendant of the wolf.";
    const expected = "The 🐶 dog is a desscendant of the 🐺 wolf.";
    expect(EmojifyService.emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by 's", () => {
    const basicText = "The modern wolf is the dog's nearest living relative.";
    const expected =
      "The modern 🐺 wolf is the 🐶 dog's nearest living relative.";
    expect(EmojifyService.emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by any punctuation", () => {
    const comma = "the wolf,";
    const dot = "the wolf.";
    const semicolon = "the wolf;";
    const questionMark = "the wolf?";
    const exclamationMark = "the wolf!";
    expect(EmojifyService.emojify(comma)).toBe("the 🐺 wolf,");
    expect(EmojifyService.emojify(dot)).toBe("the 🐺 wolf.");
    expect(EmojifyService.emojify(semicolon)).toBe("the 🐺 wolf;");
    expect(EmojifyService.emojify(questionMark)).toBe("the 🐺 wolf?");
    expect(EmojifyService.emojify(exclamationMark)).toBe("the 🐺 wolf!");
  });
});
