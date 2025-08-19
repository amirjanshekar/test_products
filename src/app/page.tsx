import { Home } from "@/components";
import { PaginatedRes, Product } from "@/types";
import { Suspense } from "react";
import { getProductsList } from "@/api/https";
import CacheProvider from "@/lib/customLRUCache/CacheProvider";

const HomePage = async () => {
  const data: PaginatedRes<Product> = await getProductsList({
    page: 1,
    ordering: "name",
  });
  return (
    <Suspense>
      <CacheProvider>
        <Home initialData={data} />
      </CacheProvider>
    </Suspense>
  );
};

export default HomePage;
