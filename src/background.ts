import { EmojifyService, emojis } from "./emojify";
import { SanitizeHtmlService } from "./sanitize";
import { LocalStorageService, StorageService } from "./storage";

const ACTIVE_STATUS_KEY = "active";
const INACTIVE_ICON = "assets/icon-inactive_16.png";
const ACTIVE_ICON = "assets/icon-active_16.png";
const EMOJI_DICTIONARY = "emojiDictionary";
let localStorageDict: Record<string, string> = {};

function reload() {
  return window.location.reload();
}

function updateBody(emojifiedContent: string) {
  const body = document.getElementsByTagName("body").item(0);
  if (!body) {
    return;
  }
  body.innerHTML = emojifiedContent;
}

function getBody() {
  const body = document.getElementsByTagName("body").item(0);
  return body?.innerHTML;
}

export class ChromeExtenstion {
  constructor(
    private readonly storageService: StorageService,
    private readonly emojifyService: EmojifyService,
    private readonly sanitizeService: SanitizeHtmlService
  ) {
    this.setup();
  }

  private setup() {
    chrome.runtime.onInstalled.addListener(async () => {
      await this.updateExtensionStatus();
      this.updateExtensionIcon();
      console.info("emojified installation done");
    });

    chrome.action.onClicked.addListener(async (tab) => {
      try {
        const previousActiveStatus =
          (await this.storageService.get(ACTIVE_STATUS_KEY)) ?? false;
        await Promise.all([
          this.updateExtensionStatus(previousActiveStatus),
          this.updateExtensionIcon(previousActiveStatus),
          this.updateWebPageContent(previousActiveStatus, tab),
          this.setUpEmojiDictionary(),
        ]);
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async updateExtensionStatus(previousActiveStatus: boolean = true) {
    return this.storageService.set({
      [ACTIVE_STATUS_KEY]: !previousActiveStatus,
    });
  }

  private async setUpEmojiDictionary() {
    const dictionary = await this.storageService.get(EMOJI_DICTIONARY);
    if (dictionary !== undefined) {
      localStorageDict = dictionary;
    }
    else {
      this.storageService.set({[EMOJI_DICTIONARY]: emojis});
      localStorageDict = emojis;
    }
  }

  private updateExtensionIcon(previousActiveStatus: boolean = true) {
    const active = !previousActiveStatus;
    const icon = active ? ACTIVE_ICON : INACTIVE_ICON;
    return chrome.action.setIcon({ path: icon });
  }

  private async updateWebPageContent(
    previousActiveStatus: boolean,
    tab: chrome.tabs.Tab,
  ) {
    const active = !previousActiveStatus;
    if (!active) {
      return chrome.scripting.executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: reload,
        args: [],
      });
    }
    const content = (
      await chrome.scripting.executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: getBody,
        args: [],
      })
    )[0].result;

    const emojifiedContent = await this.emojify(content);

    return chrome.scripting.executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: updateBody,
      args: [emojifiedContent],
    });
  }

  private async emojify(content?: string): Promise<string> {
    if (!content) {
      return "";
    }
    const sanitizedContent = this.sanitizeService.sanitize(content);
    return this.emojifyService.emojify(sanitizedContent, localStorageDict);
  }
}

const storageService = new LocalStorageService();
const sanitizeService = new SanitizeHtmlService();
const emofifyService = new EmojifyService();

new ChromeExtenstion(storageService, emofifyService, sanitizeService);
