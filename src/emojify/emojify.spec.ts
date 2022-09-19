import { EmojifyService } from "./emojify.service";
import { emojis } from "./emojis";

describe("Emojify text", () => {
  const emojifyService = new EmojifyService();
  it("should add emoji BEFORE known words", async () => {
    const basicText = "The dog is a desscendant of the wolf.";
    const expected = "The 🐶 dog is a desscendant of the 🐺 wolf.";
    expect(await emojifyService.emojify(basicText, emojis)).toBe(expected);
  });
  it("should detect words suffixing by 's", async () => {
    const basicText = "The modern wolf is the dog's nearest living relative.";
    const expected =
      "The modern 🐺 wolf is the 🐶 dog's nearest living relative."; 
    expect(await emojifyService.emojify(basicText, emojis)).toBe(expected);
  });
  it("should detect words suffixing by any punctuation", async () => {
    const comma = "the wolf,";
    const dot = "the wolf.";
    const semicolon = "the wolf;";
    const questionMark = "the wolf?";
    const exclamationMark = "the wolf!";
    expect(await emojifyService.emojify(comma, emojis)).toBe("the 🐺 wolf,");
    expect(await emojifyService.emojify(dot, emojis)).toBe("the 🐺 wolf.");
    expect(await emojifyService.emojify(semicolon, emojis)).toBe("the 🐺 wolf;");
    expect(await emojifyService.emojify(questionMark, emojis)).toBe("the 🐺 wolf?");
    expect(await emojifyService.emojify(exclamationMark, emojis)).toBe("the 🐺 wolf!");
  });
  it("should handle presentation sentence", async () => {
    const sentence =
      "The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking. The quick brown fox jumped over the lazy dog.";
    const expected =
      "The hungry 🟣 purple 🦖 dinosaur ate the kind, zingy 🦊 fox, the jabbering 🦀 crab, and the 🤪 mad 🐋 whale and started 🤑 vending and 🦆 quacking. The quick 🟤 brown 🦊 fox jumped over the lazy 🐶 dog.";
    expect(await emojifyService.emojify(sentence, emojis)).toBe(expected);
  });
});
