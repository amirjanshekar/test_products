import { unstable_cache } from "next/cache";
import { getProductsList } from "@/api/https";

export const getCachedProducts = unstable_cache(
  async (params?: { query?: string; page: number }) => getProductsList(params),
  ["products"],
  {
    tags: ["products"],
    revalidate: 60,
  },
);
