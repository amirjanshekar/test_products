"use client";

import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { Provider } from "@/lib/customLRUCache/customCache";
import { PaginatedRes, Product } from "@/types";
import CustomLRUCache from "@/lib/customLRUCache/lru_cache";
import { getOrInitializeCacheStore } from "@/lib/customLRUCache/getOrInitializeCacheStore";

const CacheProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const cacheRef = useRef<CustomLRUCache<PaginatedRes<Product>>>(
    new CustomLRUCache<PaginatedRes<Product>>(
      Number(process.env.NEXT_CUSTOM_CACHE_CAPACITY ?? 5),
    ),
  );

  useEffect(() => {
    cacheRef.current = getOrInitializeCacheStore();
  }, []);

  return <Provider value={cacheRef.current}>{children}</Provider>;
};

export default CacheProvider;
