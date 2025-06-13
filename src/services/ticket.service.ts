import { type CreateTicketDto } from "../types/ticket";
import client from "./client";

export const createTicket = (ticket: CreateTicketDto) => {
  return client.post("/ticket", ticket).then((res) => res.data);
};

export const getTicketById = (id: string) => {
  return client.get(`/ticket/${id}`).then((res) => res.data);
};
