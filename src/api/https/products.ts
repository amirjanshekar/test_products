import { PaginatedRes, Product } from "@/types";
import axios from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

export const getProductsList = async (params?: {
  query?: string | null;
  page: number;
}): Promise<PaginatedRes<Product>> => {
  const url: string = `/products/`;

  const res: AxiosResponse<PaginatedRes<Product>> = await axios.get(url, {
    params,
  });
  return res.data;
};
