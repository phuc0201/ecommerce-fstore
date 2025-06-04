import type { IPagedResults } from "../types/pagnigate";
import type { Product } from "../types/product.type";

export const productsDummyData: IPagedResults<Product> = {
  data: [],
  page: 0,
  limit: 12,
  total: 51,
  totalPages: 5,
};
