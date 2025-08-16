import { Home } from "@/components";
import { PaginatedRes, Product } from "@/types";
import { Suspense } from "react";
import { getProductsList } from "@/api/https";
import CacheProvider from "@/lib/CacheProvider";

const HomePage = async () => {
  const data: PaginatedRes<Product> = await getProductsList({ page: 1 });
  return (
    <Suspense>
      <CacheProvider>
        <Home data={data} />
      </CacheProvider>
    </Suspense>
  );
};

export default HomePage;
