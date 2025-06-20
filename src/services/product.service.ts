import type { IPagedResults } from "../types/pagnigate";
import type { Product } from "../types/product";
import client from "./client";

export const ProductService = {
  getProducts: (params: {
    page?: number;
    limit?: number;
    category?: number;
    color?: number;
    size?: number;
    orderType?: number;
  }): Promise<IPagedResults<Product>> => {
    return client
      .get<IPagedResults<Product>>("/product", { params })
      .then((res) => res.data);
  },

  getProductDetails: (productId: number): Promise<Product> => {
    return client.get<Product>("/product/" + productId).then((res) => res.data);
  },

  searchProduct(searchValue: string): Promise<IPagedResults<Product>> {
    return client
      .get<IPagedResults<Product>>("/search", {
        params: { query: searchValue },
      })
      .then((res) => res.data);
  },
};
