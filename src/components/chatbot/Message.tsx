import type React from "react";
import type { ChatbotMessage } from "../../types/chatbot";
import { Link } from "react-router-dom";

const Message: React.FC<ChatbotMessage> = ({ message, sender, products }) => {
  return (
    <div
      className={`flex gap-1 w-full ${
        sender == "user" ? "flex-row-reverse" : ""
      }`}
    >
      <div>
        <img
          src={
            sender == "bot"
              ? "./assets/imgs/bot.png"
              : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="avatar"
          className="h-10 min-w-10 w-10 rounded-full"
        />
      </div>
      <div className="w-fit">
        <div className="text-sm bg-zinc-100 rounded-xl p-2 w-full">
          <span className="">{message}</span>
        </div>
        {products.length > 0 &&
          products.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex gap-3">
                <img
                  src={item.photos[0].url || ""}
                  alt="photo"
                  className="w-16 min-w-16 h-auto rounded"
                />
                <div className="flex flex-col gap-2 text-xs">
                  <span className="line-clamp-1">{item.name}</span>
                  <p>
                    {Number(
                      item.salePrice ? item.salePrice : item.originalPrice
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  {item.salePrice && (
                    <s className="text-zinc-700">
                      {Number(item.originalPrice).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </s>
                  )}
                  <Link
                    to={"/product/" + item.id}
                    className="w-fit border p-2 px-4 transition-all duration-300 hover:text-blue-700 hover:border-blue-500 rounded-full"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Message;
