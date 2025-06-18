export interface Voucher {
  id: number;
  name: string;
  description: string;
  status: boolean;
  type: string;
  value: number;
  maxDiscount: number | null;
  image: string;
  quantity: number;
  usedQuantity: number;
  budgetUsed: number;
}
