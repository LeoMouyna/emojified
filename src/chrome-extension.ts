import { emojifyContent, resetContent } from "./webPageEmojify";

export interface StorageService {
  set(records: Record<string, any>): Promise<void>;
  get<T = any>(key: string): Promise<T | undefined>;
}

const ACTIVE_STATUS_KEY = "active";
const INACTIVE_ICON = "assets/icon-inactive_16.png";
const ACTIVE_ICON = "assets/icon-active_16.png";

export class ChromeExtenstion {
  constructor(private readonly storageService: StorageService) {
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

  private updateExtensionIcon(previousActiveStatus: boolean = true) {
    const active = !previousActiveStatus;
    const icon = active ? ACTIVE_ICON : INACTIVE_ICON;
    return chrome.action.setIcon({ path: icon });
  }

  private async updateWebPageContent(
    previousActiveStatus: boolean,
    tab: chrome.tabs.Tab
  ) {
    const active = !previousActiveStatus;
    const script = active ? emojifyContent : resetContent;
    return chrome.scripting.executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: script,
      args: [],
    });
  }
}
