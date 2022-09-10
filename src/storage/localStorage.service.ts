import { StorageService } from "./storage.interface";

export class LocalStorageService implements StorageService {
  async get<T = any>(key: string): Promise<T | undefined> {
    try {
      const records = await chrome.storage.local.get(key);
      return records[key];
    } catch (e) {
      console.error("get is broken");
      throw e;
    }
  }

  set(records: Record<string, any>): Promise<void> {
    return chrome.storage.local.set(records);
  }
}
