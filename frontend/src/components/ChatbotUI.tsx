"use client";
import React from "react";
import Image from "next/image";
import { Message } from "../app/utils/attractions.utils";

interface ChatbotUIProps {
  isOpen: boolean;
  isLoading: boolean;
  messages: Message[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  toggleChatbox: () => void;
  chatboxRef: React.RefObject<HTMLDivElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatbotUI: React.FC<ChatbotUIProps> = ({
  isOpen,
  isLoading,
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  toggleChatbox,
  chatboxRef,
  messagesEndRef,
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div
          ref={chatboxRef}
          className="absolute bottom-20 right-0 w-96 sm:w-[450px] h-[550px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out transform origin-bottom-right"
          style={{
            animation: "scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div className="bg-[#0072BB] text-white p-5">
            <h3 className="text-xl font-semibold">Jogja Smart Assistant</h3>
            {isLoading && (
              <p className="text-xs text-blue-100 mt-1">
                Loading attraction data...
              </p>
            )}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-[#0072BB] font-bold">J</span>
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-[#0072BB] text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                  style={{
                    boxShadow:
                      msg.sender === "user"
                        ? "0 4px 6px rgba(0, 114, 187, 0.1)"
                        : "0 4px 6px rgba(0, 0, 0, 0.05)",
                    animation:
                      msg.sender === "user"
                        ? "slide-left 0.3s ease-out"
                        : "slide-right 0.3s ease-out",
                  }}
                >
                  {msg.isTyping ? (
                    <div className="flex space-x-2 items-center justify-center h-6">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  ) : (
                    msg.message.split("\n").map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line}
                      </div>
                    ))
                  )}
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#0072BB] flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-white font-bold">U</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-4 flex items-center bg-gray-50">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Tanyakan tentang wisata di Jogja..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0072BB] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 bg-[#0072BB] text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <button
        onClick={toggleChatbox}
        className="bg-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        style={{ borderRadius: "24px" }}
      >
        <Image
          src="/chat.png"
          alt="Chat"
          width={36}
          height={36}
          className="transition-transform duration-300"
        />
      </button>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-left {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-right {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
