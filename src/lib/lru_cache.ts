import { PaginatedRes, Product } from "@/types";

class CustomLRUCache {
  public readonly _capacity: number;
  public _cache: Map<
    string,
    { value: PaginatedRes<Product>; expires: number }
  > = new Map();

  constructor(capacity: number, cache?: Map<string, unknown>) {
    this._capacity = capacity;
    this._cache = cache ?? new Map();
  }

  get(key: string) {
    const entry = this._cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expires) {
      this.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: string, value: PaginatedRes<Product>, ttl = 60 * 1000) {
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
        this._cache.delete(leastRecentlyUsedKey!);
      }
      console.log(key, { value, expires });
      this._cache.set(key, { value, expires });
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
