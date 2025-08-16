import { Home } from "@/components";
import { PaginatedRes, Product } from "@/types";
import { getCachedProducts } from "@/api/cache";
import { Suspense } from "react";

const HomePage = async () => {
  const data: PaginatedRes<Product> = await getCachedProducts();
  return (
    <Suspense>
      <Home data={data} />
    </Suspense>
  );
};

export default HomePage;
