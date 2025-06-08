import { v4 as uuidv4 } from "uuid";
import { SystemConstants } from "../constants/SystemContants";
import client from "./client";
import type { ChatbotMessage } from "../types/chatbot";
export const ChatbotService = {
  getUserId() {
    const userID = localStorage.getItem(SystemConstants.USER_ID);
    return userID ? userID : uuidv4();
  },

  async askBot(message: string): Promise<ChatbotMessage> {
    const userId = ChatbotService.getUserId();

    return client
      .post("/chat/ask", {
        message: message,
        id: userId,
      })
      .then((res) => res.data);
  },
};
