"use client";

import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getOrInitializeCacheStore } from "@/lib/customLRUCache/getOrInitializeCacheStore";

const useGetCachedData = <T>(
  key: (string | null | undefined | number)[],
  fallback: () => Promise<T>,
  initialData: T,
) => {
  const keyRef = useRef<DependencyList | null>(null);

  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handler: EffectCallback = () => {
    let lru_cache = getOrInitializeCacheStore<T>();

    const cachedData: T | undefined = lru_cache.get(key.join(""));
    if (!cachedData) {
      if (keyRef.current === null) {
        setData(initialData);
        lru_cache.set(key.join(""), initialData);
      } else {
        setIsLoading(true);
        fallback()
          .then((res) => {
            setData(res);
            lru_cache.set(key.join(""), res);
          })
          .finally(() => setIsLoading(false));
      }
      keyRef.current = key;
      return;
    }
    setData(cachedData);
    keyRef.current = key;
  };

  useEffect(handler, [...key]);

  return { data, isLoading };
};

export default useGetCachedData;
