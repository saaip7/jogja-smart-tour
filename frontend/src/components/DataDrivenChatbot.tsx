"use client";

import { useState, useRef, useEffect } from "react";
import { loadAttractionData } from "../app/services/data.service";
import { processQuery } from "../app/services/chatbot.service";
import { Attraction, Message } from "../app/utils/attractions.utils";
import { ChatbotUI } from "./ChatbotUI";

const initialMessages = [
  {
    sender: "bot" as const,
    message: "Halo! 👋 Selamat datang di Jogja Smart Tour Assistant. Saya dapat membantu Anda menemukan tempat wisata di Jogja. Apa yang ingin Anda ketahui?",
  },
];

export default function DataDrivenChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAttractionData();
        setAttractions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load attraction data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: inputMessage,
      },
    ]);

    setInputMessage("");
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        message: "...",
        isTyping: true,
      },
    ]);
    
    setTimeout(() => {
      const response = processQuery(inputMessage, attractions, isLoading);

      setMessages((prev) => 
        prev.filter(msg => !msg.isTyping).concat({
          sender: "bot",
          message: response,
        })
      );
    }, 1000);
  };

  return (
    <ChatbotUI
      isOpen={isOpen}
      isLoading={isLoading}
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      handleSendMessage={handleSendMessage}
      toggleChatbox={toggleChatbox}
      chatboxRef={chatboxRef}
      messagesEndRef={messagesEndRef}
    />
  );
}