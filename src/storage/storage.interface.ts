export interface StorageService {
  set(records: Record<string, any>): Promise<void>;
  get<T = any>(key: string): Promise<T | undefined>;
}
