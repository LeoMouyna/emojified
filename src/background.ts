import { EmojifyHtmlService, emojis } from "./emojify";
import { LocalStorageService, StorageService } from "./storage";

const ACTIVE_STATUS_KEY = "active";
const INACTIVE_ICON = "assets/icon-inactive_16.png";
const ACTIVE_ICON = "assets/icon-active_16.png";
const EMOJIFY_TAG_ID = "emojify-active";

function reload() {
  return window.location.reload();
}

function updateBody(emojifiedContent: string) {
  const body = document.getElementsByTagName("body").item(0);
  if (!body) {
    return;
  }
  const emojifyTag = `<span style="display: none" id=${EMOJIFY_TAG_ID}></span>`;
  body.innerHTML = emojifiedContent + emojifyTag;
}

function getBody() {
  const body = document.getElementsByTagName("body").item(0);
  return body?.innerHTML;
}

function hasEmojifyTag() {
  return document.getElementById(EMOJIFY_TAG_ID) ? true : false;
}

export class ChromeExtenstion {
  constructor(
    private readonly storageService: StorageService,
    private readonly emojifyService: EmojifyHtmlService
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
          this.updateContentIfNeeded(tab.id ?? -1),
        ]);
      } catch (e) {
        console.error(e);
      }
    });

    chrome.tabs.onActivated.addListener(async (info) => {
      try {
        await this.updateContentIfNeeded(info.tabId);
      } catch (e) {
        console.error(e);
      }
    });

    chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
      try {
        await this.updateContentIfNeeded(tabId);
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async hasEmojifyTag(tabId: number) {
    return (
      await chrome.scripting.executeScript({
        target: { tabId },
        func: hasEmojifyTag,
        args: [],
      })
    )[0].result;
  }

  private async updateExtensionStatus(previousActiveStatus: boolean = true) {
    return this.storageService.set({
      [ACTIVE_STATUS_KEY]: !previousActiveStatus,
    });
  }

  private updateExtensionIcon(previousActiveStatus: boolean = true) {
    const active = !previousActiveStatus;
    const icon = active ? ACTIVE_ICON : INACTIVE_ICON;
    return chrome.action.setIcon({ path: icon });
  }

  private async updateContentIfNeeded(tabId: number) {
    const emojified = await this.hasEmojifyTag(tabId);
    const active = (await this.storageService.get(ACTIVE_STATUS_KEY)) ?? false;
    if ((!active && !emojified) || (active && emojified)) return;
    return this.updateWebPageContent(active, { id: tabId });
  }

  private async updateWebPageContent(active: boolean, tab: { id: number }) {
    if (!active) {
      return chrome.scripting.executeScript({
        target: { tabId: tab.id },
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

    const emojifiedContent = this.emojify(content);

    return chrome.scripting.executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: updateBody,
      args: [emojifiedContent],
    });
  }

  private emojify(content?: string): string {
    if (!content) {
      return "";
    }
    return this.emojifyService.emojify(content);
  }
}

const storageService = new LocalStorageService();
const emojifyService = new EmojifyHtmlService(emojis);

new ChromeExtenstion(storageService, emojifyService);
