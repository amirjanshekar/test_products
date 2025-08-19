export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductQueries {
  page: number;
  name?: string | null;
}
