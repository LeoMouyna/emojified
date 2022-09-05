import { ChromeExtenstion } from "./chrome-extension";
import { LocalStorageService } from "./storage.service";

export * from "./chrome-extension";
export * from "./storage.service";
export * from "./emojify.service";
export * from "./sanitizeHtml.service";

new ChromeExtenstion(new LocalStorageService());
