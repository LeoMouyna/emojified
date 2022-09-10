export class SanitizeHtmlService {
  sanitize(htmlContent: string): string {
    return htmlContent
      .replace(/<\/?[\w \=\"\'\-\_\:\;\(\)\,\/\.]+\/?>/gm, " $& ")
      .replace(/ +/gm, " ")
      .trim();
  }
}
