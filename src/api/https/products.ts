import { PaginatedRes, Product } from "@/types";
import axios from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

export const getProductsList = async (params?: {
  name?: string | null;
  page: number;
}): Promise<PaginatedRes<Product>> => {
  const url: string = `/products/`;

  const res: AxiosResponse<PaginatedRes<Product>> = await axios.get(url, {
    params: {
      name: params?.name !== "" ? params?.name : undefined,
      page: params?.page,
    },
  });
  return res.data;
};
