import type React from "react";
import { ChatbotService } from "../../services/chatbot.service";
import { useEffect, useRef, useState } from "react";
import type { ChatbotMessage } from "../../types/chatbot";
import Message from "./Message";

interface ChatBoxProps {
  messages: ChatbotMessage[];
  onSetMessages: React.Dispatch<React.SetStateAction<ChatbotMessage[]>>;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  onClose,
  messages,
  onSetMessages,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (message: string) => {
    if (newMessage.trim() === "") return;

    onSetMessages((prev) => [
      ...prev,
      {
        message: message,
        sender: "user",
        products: [],
      },
    ]);

    ChatbotService.askBot(message).then((res) => {
      if (res) {
        onSetMessages((prev) => [
          ...prev,
          {
            message: res.message,
            sender: "bot",
            products: res.products,
          },
        ]);
      }
    });

    setNewMessage("");
  };

  return (
    <div>
      <div
        onClick={onClose}
        className="fixed cursor-pointer top-0 left-0 right-0 bottom-0 z-[1001]"
      ></div>
      <div className="chatbox fixed right-0 md:right-4 bottom-0 md:bottom-4 md:top-auto md:left-auto top-0 left-0 z-[1002] bg-white shadow-lg md:rounded-lg md:w-96 md:h-[500px] overflow-hidden flex flex-col justify-between">
        <header className="chatbox-header p-3 bg-color-brand-surface text-white flex justify-between">
          <div className="font-bold">
            <span className="text-[#2a2a86]">F</span>I
            <span className="text-[#2a2a86]">F</span>
            AI
          </div>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <div
          ref={chatBodyRef}
          className="chatbox-body max-w-full flex-1 overflow-y-auto overflow-x-hidden bg-[#f9fafb]"
        >
          <div className="p-2 flex flex-col gap-2">
            {messages.map((item, index) => (
              <Message
                key={index}
                message={item.message}
                sender={item.sender}
                products={item.products}
              />
            ))}
          </div>
        </div>

        <div className="chatbox-input h-16 p-3 flex items-center justify-between gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                sendMessage(newMessage);
              }
            }}
            type="text"
            placeholder="Type your message..."
            className="rounded-lg text-sm focus:border-0 border-none focus:ring-0 bg-slate-200 flex-1 p-2 px-3 focus:outline-none"
          />
          <button onClick={() => sendMessage(newMessage)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
