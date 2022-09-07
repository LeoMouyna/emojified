const emojis: Record<string, string> = require("./emojis.json");

export class EmojifyService {
  static emojify(text: string): string {
    const syntaxeBlocks = this.splitSentencesToTextBlocks(text);
    const emojifiedWords = syntaxeBlocks.map((sentence) =>
      sentence.map((block) => this.addEmojisToTextBlocks(block))
    );
    const emojifiedSentences = emojifiedWords.map((sentence) =>
      sentence.join(" ")
    );
    return emojifiedSentences.join(".");
  }

  private static addEmojisToTextBlocks(textBlock: string) {
    const words = textBlock.match(/^\w+/gm);
    if (!words?.length) {
      return textBlock;
    }
    const word = words[0];
    const emoji = emojis[word.toLowerCase()];
    return emoji ? `${emoji} ${textBlock}` : textBlock;
  }

  private static splitSentencesToTextBlocks(text: string): string[][] {
    const sentences = text.split(".");
    return sentences.map((sentence) => sentence.split(" "));
  }
}
