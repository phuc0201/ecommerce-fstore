import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProductService } from "../../services/product.service";
import type { Filter } from "../../types/category";

export function useInfiniteProducts({
  page = 0,
  limit = 18,
  category,
  color,
  size,
  orderType,
}: Filter) {
  return useInfiniteQuery({
    queryKey: ["GET_PRODUCTS", page, limit, category, color, size, orderType],
    queryFn: ({ pageParam = 0 }) =>
      ProductService.getProducts({
        page: pageParam,
        limit,
        category,
        color,
        size,
        orderType,
      }).then((res) => {
        return res;
      }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: page,
  });
}

export function useGetProductDetails(productId: number) {
  return useQuery({
    queryKey: ["GET_PRODUCT_DETAILS", productId],
    queryFn: () =>
      ProductService.getProductDetails(productId).then((res) => res),
  });
}
