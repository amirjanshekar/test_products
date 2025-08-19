"use client";

import { Context, useContext } from "react";
import { cacheContext } from "@/lib/customLRUCache/customCache";

const useCache = <T>() => {
  const cache = useContext<T | null>(cacheContext as Context<T | null>);

  if (!cache) throw new Error("Cache is missing the provider");
  return cache;
};

export default useCache;
