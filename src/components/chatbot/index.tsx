import React, { useState } from "react";
import FloatingBot from "./FloatingBot";
import ChatBox from "./ChatBox";
import type { ChatbotMessage } from "../../types/chatbot";
const ChatBot: React.FC = () => {
  const [isOpenChatbox, setIsOpenChatBox] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);

  return (
    <div>
      {!isOpenChatbox ? (
        <FloatingBot onClose={() => setIsOpenChatBox(true)} />
      ) : (
        <ChatBox
          messages={messages}
          onSetMessages={setMessages}
          onClose={() => setIsOpenChatBox(false)}
        />
      )}
    </div>
  );
};

export default ChatBot;
