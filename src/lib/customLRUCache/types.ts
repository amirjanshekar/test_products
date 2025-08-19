export interface CacheItem<T> extends BaseCache {
  value: T;
}
export interface BaseCache {
  expires: number;
}
