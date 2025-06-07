import type { OrderDTO } from "../types/cart";
import client from "./client";

export const OrderService = {
  createOrder: async (order: OrderDTO): Promise<any> => {
    return client.post("/order/create", order).then((res) => res.data);
  },
};
