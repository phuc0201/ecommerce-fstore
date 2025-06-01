import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductService } from "../../services/product.service";

interface UseInfiniteProductsParams {
  page?: number;
  limit?: number;
  category?: number;
}

export function useInfiniteProducts({
  page = 0,
  limit = 12,
  category,
}: UseInfiniteProductsParams) {
  return useInfiniteQuery({
    queryKey: ["GET_PRODUCTS", page, limit, category],
    queryFn: ({ pageParam = 0 }) =>
      ProductService.getProducts({ page: pageParam, limit, category }).then(
        (res) => {
          console.log(res);
          return res;
        }
      ),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: page,
  });
}
