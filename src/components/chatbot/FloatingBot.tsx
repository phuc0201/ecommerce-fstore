import type React from "react";
import "./FloatingBot.css";
import { useState } from "react";

interface FLoatingBotProps {
  onClose: () => void;
}

const FloatingBot: React.FC<FLoatingBotProps> = ({ onClose }) => {
  const [isShowMessage, setIsShowMessage] = useState<boolean>(true);

  setTimeout(() => {
    setIsShowMessage(false);
  }, 3000);

  return (
    <div onClick={onClose}>
      <div className="fixed md:right-10 right-4 bottom-16 z-[10] cursor-pointer md:scale-100 scale-75">
        <div
          className={`absolute right-full top-1/5 z-20 bg-white rounded-full whitespace-nowrap shadow-lg transition-all p-3 bot-message text-sm ${
            isShowMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          Bạn có cần hổ trợ gì hem
        </div>

        <div className="bot-move">
          <div className="w-[125%] h-1/2 rounded-2xl bg-yellow-400 absolute top-5 left-1/2 -translate-x-1/2"></div>
          <div className="relative bot-face-wrapper w-20 h-20 bg-yellow-300 p-3">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center z-10">
              <div className="w-4 h-4 rounded-full bg-gray-700"></div>
              <div className="w-1 h-2 bg-gray-700"></div>
            </div>
            <div className="relative w-full h-full">
              <div className="bot-face bg-gray-700 absolute top-0 left-0 right-0 bottom-3 "></div>
              <div className="eyes absolute top-1/4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <div className="w-3 h-5 bg-white rounded-full blink-animation"></div>
                <div className="w-3 h-5 bg-white rounded-full blink-animation"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBot;
