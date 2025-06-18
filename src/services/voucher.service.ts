import type { Voucher } from "../types/voucher";
import client from "./client";

export const getVouchers = (): Promise<Voucher[]> => {
  return client.get<Voucher[]>("/voucher").then((res) => res.data);
};
