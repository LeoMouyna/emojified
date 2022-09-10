import { EmojifyService } from "./emojify.service";
import { emojis } from "./emojis";

describe("Emojify text", () => {
  const emojifyService = new EmojifyService(emojis);
  it("should add emoji BEFORE known words", () => {
    const basicText = "The dog is a desscendant of the wolf.";
    const expected = "The 🐶 dog is a desscendant of the 🐺 wolf.";
    expect(emojifyService.emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by 's", () => {
    const basicText = "The modern wolf is the dog's nearest living relative.";
    const expected =
      "The modern 🐺 wolf is the 🐶 dog's nearest living relative.";
    expect(emojifyService.emojify(basicText)).toBe(expected);
  });
  it("should detect words suffixing by any punctuation", () => {
    const comma = "the wolf,";
    const dot = "the wolf.";
    const semicolon = "the wolf;";
    const questionMark = "the wolf?";
    const exclamationMark = "the wolf!";
    expect(emojifyService.emojify(comma)).toBe("the 🐺 wolf,");
    expect(emojifyService.emojify(dot)).toBe("the 🐺 wolf.");
    expect(emojifyService.emojify(semicolon)).toBe("the 🐺 wolf;");
    expect(emojifyService.emojify(questionMark)).toBe("the 🐺 wolf?");
    expect(emojifyService.emojify(exclamationMark)).toBe("the 🐺 wolf!");
  });
  it("should handle presentation sentence", () => {
    const sentence =
      "The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking. The quick brown fox jumped over the lazy dog.";
    const expected =
      "The hungry 🟣 purple 🦖 dinosaur ate the kind, zingy 🦊 fox, the jabbering 🦀 crab, and the 🤪 mad 🐋 whale and started 🤑 vending and 🦆 quacking. The quick 🟤 brown 🦊 fox jumped over the lazy 🐶 dog.";
    expect(emojifyService.emojify(sentence)).toBe(expected);
  });
});
