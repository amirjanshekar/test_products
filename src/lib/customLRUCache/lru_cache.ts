"use client";

import { CacheItem } from "@/lib/customLRUCache/types";

class CustomLRUCache<T> {
  public _capacity: number;
  public _cache: Map<string, CacheItem<T>> = new Map();

  constructor(capacity: number, cache?: Map<string, unknown>) {
    this._capacity = capacity;
    this._cache = cache ?? new Map();
  }

  get(key: string) {
    const entry = this._cache.get(key);
    if (!entry) return undefined;

    this.delete(key);
    this.set(key, entry.value, entry.expires - Date.now());

    if (Date.now() > entry.expires) {
      this.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttl = 60 * 1000, permanent: boolean = true) {
    const expires = Date.now() + ttl;
    if (this._cache.has(key)) {
      const entry = this._cache.get(key);
      if (entry) {
        entry.value = value;
        entry.expires = expires;
      }
    } else {
      if (this._cache.size >= this._capacity) {
        const leastRecentlyUsedKey: string | undefined = this._cache
          ?.keys()
          ?.next()
          ?.value?.toString();
        this.delete(leastRecentlyUsedKey!);
      }
      this._cache.set(key, { value, expires });
    }
    if (permanent) {
      sessionStorage.setItem(
        "cache",
        JSON.stringify({
          _capacity: this._capacity,
          _cache: [...this._cache],
        }),
      );
    }
  }

  delete(key: string) {
    const entry = this._cache.get(key);
    if (entry) {
      this._cache.delete(key);
    }
  }
}

export default CustomLRUCache;
