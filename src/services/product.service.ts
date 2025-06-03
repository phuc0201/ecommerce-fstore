import type { IPagedResults } from "../types/pagnigate";
import type { Product } from "../types/product.type";
import client from "./client";

export const ProductService = {
  getProducts: (params: {
    page?: number;
    limit?: number;
    category?: number;
  }): Promise<IPagedResults<Product>> => {
    return client
      .get<IPagedResults<Product>>("/product", { params })
      .then((res) => res.data);
  },

  getProductDetails: (productId: number): Promise<Product> => {
    return client.get<Product>("/product/" + productId).then((res) => res.data);
  },
};
