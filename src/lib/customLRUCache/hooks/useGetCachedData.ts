"use client";

import CustomLRUCache from "@/lib/customLRUCache/lru_cache";
import { DependencyList, useEffect, useRef, useState } from "react";

const useGetCachedData = <T>(
  key: (string | null | undefined | number)[],
  fallback: () => Promise<T>,
  initialData: T,
) => {
  const keyRef = useRef<DependencyList | null>(null);

  const [data, setData] = useState<T>(initialData);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handler = () => {
    setIsLoading(true);
    let lru_cache: CustomLRUCache<T>;

    const last_lru_cache: CustomLRUCache<T> = JSON.parse(
      sessionStorage.getItem("cache") ?? "{}",
    );

    if (last_lru_cache && last_lru_cache._cache) {
      lru_cache = new CustomLRUCache<T>(
        last_lru_cache._capacity,
        new Map(Object.values(last_lru_cache._cache)),
      );
    } else {
      lru_cache = new CustomLRUCache<T>(5);
    }
    const cachedData: T | undefined = lru_cache.get(key.join(""));
    if (cachedData) {
      setData(cachedData);
      setIsLoading(false);
    } else {
      if (keyRef.current === null) {
        setData(initialData);
        lru_cache.set(key.join(""), initialData);
        sessionStorage.setItem(
          "cache",
          JSON.stringify({
            _capacity: lru_cache._capacity,
            _cache: [...lru_cache._cache],
          }),
        );
        setIsLoading(false);
      } else {
        fallback()
          .then((res) => {
            setData(res);
            lru_cache.set(key.join(""), res);
            sessionStorage.setItem(
              "cache",
              JSON.stringify({
                _capacity: lru_cache._capacity,
                _cache: [...lru_cache._cache],
              }),
            );
            setIsLoading(false);
          })
          .catch((e) => alert(e));
      }
    }
    keyRef.current = key;
  };

  useEffect(handler, [...key]);

  return { data, isLoading };
};

export default useGetCachedData;
