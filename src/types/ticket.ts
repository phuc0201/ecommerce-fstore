export interface Ticket {
  id: number;
  email: string;
  orderId?: number;
  type: TicketType;
  status: TicketStatus;
  customerNote?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketDto {
  email: string;
  orderId?: number;
  type: any;
  customerNote?: string;
}

export const TicketType = {
  RETURNED: "Về đơn hàng",
  EXCHANGE: "Đổi hàng",
  COMPLAINT: "Phàn nàn",
  OTHERS: "Khác",
} as const;
export type TicketType = (typeof TicketType)[keyof typeof TicketType];

export const TicketStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
