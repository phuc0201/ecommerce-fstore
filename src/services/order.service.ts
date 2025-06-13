import type { OrderDTO } from "../types/cart";
import client from "./client";

export const OrderService = {
  createOrder: async (order: OrderDTO): Promise<any> => {
    return client.post("/order/create", order).then((res) => res.data);
  },

  getShippingFee: async (
    to_district_id: number,
    to_ward_code: string
  ): Promise<any> => {
    const url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    const body = {
      service_id: 53321,
      service_type_id: null,
      to_district_id: to_district_id,
      to_ward_code: to_ward_code,
      height: 50,
      length: 20,
      weight: 200,
      width: 20,
    };
    const headers = {
      "Content-Type": "application/json",
      Token: "3ba50132-46c7-11f0-9b81-222185cb68c8",
      ShopId: "196838",
    };
    return client.post(url, body, { headers }).then((res) => res.data);
  },
};
