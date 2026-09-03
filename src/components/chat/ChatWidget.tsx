"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pusherClient } from "@/lib/pusher";
import { usePathname } from "next/navigation";
import { validateEmailFormat } from "@/lib/emailValidation";

type Message = {
  id: string;
  text: string;
  isFromAdmin: boolean;
  createdAt: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  // User info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const pathname = usePathname();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide the chat widget on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Clear unread count when opening the chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Load session on mount
  useEffect(() => {
    const savedName = localStorage.getItem("chat_name");
    const savedEmail = localStorage.getItem("chat_email");
    if (savedName && savedEmail) {
      setName(savedName);
      setEmail(savedEmail);
      setIsJoined(true);
      fetchMessages(savedEmail);
    }
  }, []);

  // Fetch previous messages
  const fetchMessages = async (userEmail: string) => {
    try {
      const res = await fetch(`/api/chat/messages?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Subscribe to Pusher channel when joined
  useEffect(() => {
    if (!isJoined || !email) return;

    const channelName = `chat-${email.replace(/[@.]/g, "-")}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => {
        // Prevent duplicate messages if we just sent it
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
      
      // If the chat is closed, increment the unread badge
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
        // Optional: Play a subtle notification sound
        try {
          const audio = new Audio("/notification.mp3"); // Ensure this file exists in public/ or it will fail silently
          audio.volume = 0.5;
          audio.play().catch(() => {}); // Catch error if browser blocks autoplay
        } catch (e) {}
      }
    });

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [isJoined, email, isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!name.trim() || !email.trim()) {
      setLoginError("Name and email are required.");
      return;
    }
    
    // Validate email format and block temporary/fake emails
    const validation = validateEmailFormat(email);
    if (!validation.isValid) {
      setLoginError(validation.error || "Please enter a valid email address.");
      return;
    }

    localStorage.setItem("chat_name", name);
    localStorage.setItem("chat_email", email);
    setIsJoined(true);
    fetchMessages(email);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText;
    setInputText(""); // Optimistic UI clear
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText,
          email,
          name,
          isFromAdmin: false, // The user is sending this
        }),
      });
      const newMessage = await res.json();
      
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Chat with us</h3>
                <p className="text-xs text-neutral-400">We typically reply within a few hours</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 p-4">
              {!isJoined ? (
                // Login Form
                <div className="h-full flex flex-col justify-center items-center px-4">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                    <User className="text-neutral-500" size={24} />
                  </div>
                  <h4 className="text-center font-medium mb-2 dark:text-white">Welcome!</h4>
                  <p className="text-center text-sm text-neutral-500 mb-6">
                    Please introduce yourself before we start chatting.
                  </p>
                  <form onSubmit={handleJoin} className="w-full space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
                      required
                    />
                    {loginError && (
                      <p className="text-red-500 text-xs text-center">{loginError}</p>
                    )}
                    <button 
                      type="submit"
                      className="w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Start Chat
                    </button>
                  </form>
                </div>
              ) : (
                // Chat Messages
                <div className="flex flex-col space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-sm text-neutral-500 mt-10">
                      Send a message to start the conversation!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.isFromAdmin 
                            ? "bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white self-start rounded-tl-sm" 
                            : "bg-black text-white dark:bg-white dark:text-black self-end rounded-tr-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            {isJoined && (
              <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full focus:outline-none dark:text-white text-sm"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full disabled:opacity-50 transition-opacity"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow relative"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>

        {/* Unread Badge */}
        {!isOpen && unreadCount > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-950 shadow-sm"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </div>
    </div>
  );
}
