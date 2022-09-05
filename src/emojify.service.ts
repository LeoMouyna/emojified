export class EmojifyService {
  static emojify(text: string): string {
    return text
      .replace(/[^\w^-]dog[ '.,;!?]/gim, " 🐶$&")
      .replace(/[^\w^-]wolf[ '.,;!?]/gim, " 🐺$&");
  }
}
