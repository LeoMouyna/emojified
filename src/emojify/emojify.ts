import { emojis as emojiDict } from "./emojis";

export function emojify(
  text: string,
  emojis: Record<string, string> = emojiDict
): string {
  return text
    .split(" ")
    .map((textBlock) => addEmojisToTextBlocks(textBlock, emojis))
    .join(" ");
}

function addEmojisToTextBlocks(
  textBlock: string,
  emojis: Record<string, string>
) {
  const words = textBlock.match(/^\w+/gm);
  if (!words?.length) {
    return textBlock;
  }
  const word = words[0];
  const emoji = emojis[word.toLowerCase()];
  return emoji ? `${emoji} ${textBlock}` : textBlock;
}
