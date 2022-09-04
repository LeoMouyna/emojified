import { emojify } from "./webPageEmojify";

describe("Emojify text", () => {
  it("should add emoji BEFORE known words", () => {
    const basicText = "The dog is a desscendant of the wolf.";
    const expected = "The 🐶 dog is a desscendant of the 🐺 wolf.";
    expect(emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by 's", () => {
    const basicText = "The modern wolf is the dog's nearest living relative.";
    const expected =
      "The modern 🐺 wolf is the 🐶 dog's nearest living relative.";
    expect(emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by any punctuation", () => {
    const comma = "the wolf,";
    const dot = "the wolf.";
    const semicolon = "the wolf;";
    const questionMark = "the wolf?";
    const exclamationMark = "the wolf!";
    expect(emojify(comma)).toBe("the 🐺 wolf,");
    expect(emojify(dot)).toBe("the 🐺 wolf.");
    expect(emojify(semicolon)).toBe("the 🐺 wolf;");
    expect(emojify(questionMark)).toBe("the 🐺 wolf?");
    expect(emojify(exclamationMark)).toBe("the 🐺 wolf!");
  });
});
