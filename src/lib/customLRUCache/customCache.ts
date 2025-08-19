import { createContext } from "react";
import { PaginatedRes, Product } from "@/types";
import CustomLRUCache from "@/lib/customLRUCache/lru_cache";

export const cacheContext = createContext<CustomLRUCache<
  PaginatedRes<Product>
> | null>(null);

export const Provider = cacheContext.Provider;
