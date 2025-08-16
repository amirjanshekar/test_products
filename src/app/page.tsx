import { Home } from "@/components";
import { PaginatedRes, Product } from "@/types";
import { getCachedProducts } from "@/api/cache";

const HomePage = async () => {
  const { data }: Promise<PaginatedRes<Product>> = await getCachedProducts();

  return <Home data={data} />;
};

export default HomePage;
