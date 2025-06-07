import { useQuery } from "@tanstack/react-query";
import { OrderDTO } from "../../types/cart";
import { OrderService } from "../../services/order.service";

export function useCreateOrder(order: OrderDTO) {
  return useQuery({
    queryKey: ["CREATE_ORDER", order],
    queryFn: () => OrderService.createOrder(order),
    enabled: !!order,
    retry: false,
  });
}
