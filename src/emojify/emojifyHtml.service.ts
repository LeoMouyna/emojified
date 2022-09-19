import { emojify } from "./emojify";

export class EmojifyHtmlService {
  constructor(protected readonly emojis: Record<string, string>) {}

  emojify(htmlContent: string): string {
    const innerHtmlText = new RegExp(/(?<=^|>)[^<>]+?(?=<|$)/gm);
    return htmlContent
      .replace(innerHtmlText, (match) => {
        return emojify(match, this.emojis);
      })
      .trim();
  }
}
