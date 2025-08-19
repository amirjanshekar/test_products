"use client";

import CustomLRUCache from "@/lib/customLRUCache/lru_cache";

export const getOrInitializeCacheStore = <T>(): CustomLRUCache<T> => {
  let lru_cache = new CustomLRUCache<T>(
    Number(process.env.NEXT_CUSTOM_CACHE_CAPACITY),
  );

  if (!sessionStorage?.getItem("cache")) {
    sessionStorage?.setItem("cache", JSON.stringify(lru_cache));
  } else {
    const last_lru_cache: CustomLRUCache<T> = JSON.parse(
      sessionStorage?.getItem("cache") ?? "{}",
    );

    lru_cache = new CustomLRUCache<T>(
      last_lru_cache._capacity,
      new Map(Object.values(last_lru_cache._cache ?? {})),
    );
  }
  return lru_cache;
};
