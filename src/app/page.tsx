import { Home } from "@/components";
import { PaginatedRes, Product } from "@/types";
import { Suspense } from "react";
import { getProductsList } from "@/api/https";

const HomePage = async () => {
  const data: PaginatedRes<Product> = await getProductsList({ page: 1 });
  return (
    <Suspense>
      <Home initialData={data} />
    </Suspense>
  );
};

export default HomePage;
