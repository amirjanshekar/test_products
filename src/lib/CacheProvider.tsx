"use client";

import React, {Fragment, FunctionComponent, PropsWithChildren, useEffect} from "react";
import CustomLRUCache from "@/lib/lru_cache";

const CacheProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const lru_cache = new CustomLRUCache(5);

    if (!sessionStorage.getItem("cache")) {
      sessionStorage.setItem("cache", JSON.stringify(lru_cache));
    }
  }, []);


  return <Fragment>{children}</Fragment>;
};

export default CacheProvider;
