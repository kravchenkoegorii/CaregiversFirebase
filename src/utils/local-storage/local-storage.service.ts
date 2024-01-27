interface ExpiringItem<T = unknown> {
  value: T;
  expiresAt: number;
  ttl: number;
}

export class LocalStorageService {
  static setWithExpiry(key: string, value: unknown, expiresAt: number, ttl: number) {
    const item: ExpiringItem = {
      value,
      expiresAt,
      ttl: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
 
  static getWithExpiry<T>(key: string): ExpiringItem<T> {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return ({ value: null, expiresAt: null, ttl: null });
    }

    const item: ExpiringItem<T> = JSON.parse(itemStr);
    if (Date.now() > item.expiresAt) {
      localStorage.removeItem(key);
      return ({ value: null, expiresAt: null, ttl: null });
    }

    return item;
  }

  static get(key: string): string {
    return localStorage.getItem(key);
  }

  static getAndDestroy(key: string): string {
    const item = localStorage.getItem(key);
    localStorage.removeItem(key);

    return item;
  }

  static set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
