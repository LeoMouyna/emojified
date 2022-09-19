export class EmojifyService {
  async emojify(text: string, emojis: Record<string, string>): Promise<string> {
    const syntaxeBlocks = this.splitSentencesToTextBlocks(text);
    const emojifiedWords = syntaxeBlocks.map((sentence) =>
      sentence.map((block) => this.addEmojisToTextBlocks(block, emojis))
    );
    const emojifiedSentences = emojifiedWords.map((sentence) =>
      sentence.join(" ")
    );
    return emojifiedSentences.join(".");
  }

  private addEmojisToTextBlocks(textBlock: string, emojis: Record<string, string>) {
    const words = textBlock.match(/^\w+/gm);
    if (!words?.length) {
      return textBlock;
    }
    const word = words[0];
    const emoji = emojis[word.toLowerCase()];
    return emoji ? `${emoji} ${textBlock}` : textBlock;
  }

  private splitSentencesToTextBlocks(text: string): string[][] {
    const sentences = text.split(".");
    return sentences.map((sentence) => sentence.split(" "));
  }
}
