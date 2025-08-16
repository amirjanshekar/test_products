import { getProductsList } from "@/api/https";
import { PaginatedRes, Product } from "@/types";
import CustomLRUCache from "@/lib/lru_cache";

export const getCachedProducts = async (params: {
  name?: string | null;
  page: number;
}) => {
  let lru_cache = JSON.parse(sessionStorage.getItem("cache")!);

  if(lru_cache){
    lru_cache = new CustomLRUCache(
        lru_cache._capacity,
        new Map(Object.values(lru_cache._cache)),
    );
  }
  const { page, name } = params;
  const cachedData: PaginatedRes<Product> = lru_cache.get(
    `products${name ?? ""}${page}`,
  );
  if (cachedData) {
    return cachedData;
  } else {
    const data: PaginatedRes<Product> = await getProductsList(params);
    lru_cache.set(`products${name ?? ""}${page}`, data);

    sessionStorage.setItem(
      "cache",
      JSON.stringify({
        _capacity: lru_cache._capacity,
        _cache: [...lru_cache._cache],
      }),
    );
    return data;
  }
};
