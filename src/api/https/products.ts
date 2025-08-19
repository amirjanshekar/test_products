import { PaginatedRes, Product, ProductQueries } from "@/types";
import axios from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

export const getProductsList = async (
  params?: ProductQueries,
): Promise<PaginatedRes<Product>> => {
  const url: string = `/products/`;
  const { name, ordering, page } = params;

  const { data }: AxiosResponse<PaginatedRes<Product>> = await axios.get(url, {
    params: {
      name: name !== "" ? name : undefined,
      ordering: ordering !== "" ? ordering : undefined,
      page,
    },
  });
  return data;
};
