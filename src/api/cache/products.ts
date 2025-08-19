"use client";

import { getProductsList } from "@/api/https";
import { PaginatedRes, Product, ProductQueries } from "@/types";
import { useGetCachedData } from "@/lib/customLRUCache/hooks";

export const useGetCachedProducts = (
  params: ProductQueries,
  initialData: PaginatedRes<Product>,
) => {
  const { name, page, ordering } = params;
  return useGetCachedData<PaginatedRes<Product>>(
    ["products", name, page, ordering],
    () => getProductsList(params),
    initialData,
  );
};
