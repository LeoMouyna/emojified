import { emojify } from "./emojify";
import { emojis } from "./emojis";

describe("Emojify text", () => {
  it("should add emoji BEFORE known words", () => {
    const basicText = "The dog is a desscendant of the wolf.";
    const expected = "The 🐶 dog is a desscendant of the 🐺 wolf.";
    expect(emojify(basicText, emojis)).toBe(expected);
  });
  it("should detect words suffixing by 's", () => {
    const basicText = "The modern wolf is the dog's nearest living relative.";
    const expected =
      "The modern 🐺 wolf is the 🐶 dog's nearest living relative.";
    expect(emojify(basicText, emojis)).toBe(expected);
  });
  it("should detect words suffixing by any punctuation", () => {
    const comma = "the wolf,";
    const dot = "the wolf.";
    const semicolon = "the wolf;";
    const questionMark = "the wolf?";
    const exclamationMark = "the wolf!";
    expect(emojify(comma, emojis)).toBe("the 🐺 wolf,");
    expect(emojify(dot, emojis)).toBe("the 🐺 wolf.");
    expect(emojify(semicolon, emojis)).toBe("the 🐺 wolf;");
    expect(emojify(questionMark, emojis)).toBe("the 🐺 wolf?");
    expect(emojify(exclamationMark, emojis)).toBe("the 🐺 wolf!");
  });
  it("should handle presentation sentence", () => {
    const sentence =
      "The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking. The quick brown fox jumped over the lazy dog.";
    const expected =
      "The hungry 🟣 purple 🦖 dinosaur ate the kind, zingy 🦊 fox, the jabbering 🦀 crab, and the 🤪 mad 🐋 whale and started 🤑 vending and 🦆 quacking. The quick 🟤 brown 🦊 fox jumped over the lazy 🐶 dog.";
    expect(emojify(sentence, emojis)).toBe(expected);
  });
});
