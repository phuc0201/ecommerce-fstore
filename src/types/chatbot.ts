import type { Product } from "./product";

export interface Chatbot {}

export interface ChatbotMessage {
  message: string;
  sender: "bot" | "user";
  products: Product[];
}
