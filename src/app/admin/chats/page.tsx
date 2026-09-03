"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Send, Search, MessageSquare, Clock } from "lucide-react";
import { pusherClient } from "@/lib/pusher";

type Message = {
  id: string;
  text: string;
  isFromAdmin: boolean;
  createdAt: string;
};

type ChatUser = {
  id: string;
  name: string;
  email: string;
  messages: Message[];
  createdAt: string;
};

export default function AdminChatsPage() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/chats");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch full conversation when a user is clicked
  const fetchActiveConversation = async (email: string) => {
    try {
      const res = await fetch(`/api/chat/messages?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleUserClick = (user: ChatUser) => {
    setActiveUser(user);
    fetchActiveConversation(user.email);
  };

  // Subscribe to Pusher for the active user
  useEffect(() => {
    if (!activeUser) return;

    const channelName = `chat-${activeUser.email.replace(/[@.]/g, "-")}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
      // Also update the sidebar preview
      setUsers((prevUsers) => 
        prevUsers.map(u => 
          u.email === activeUser.email 
            ? { ...u, messages: [newMessage] } 
            : u
        )
      );
    });

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [activeUser]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeUser) return;

    const messageText = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText,
          email: activeUser.email,
          name: activeUser.name,
          isFromAdmin: true, // You are sending this
        }),
      });
      const newMessage = await res.json();
      
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
      
      // Update sidebar preview
      setUsers((prevUsers) => 
        prevUsers.map(u => 
          u.email === activeUser.email 
            ? { ...u, messages: [newMessage] } 
            : u
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] max-w-7xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm mt-8">
      {/* Sidebar - User List */}
      <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-800 flex flex-col bg-neutral-50 dark:bg-neutral-950">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-none rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <MessageSquare className="mx-auto mb-2 opacity-50" size={32} />
              <p>No messages yet.</p>
            </div>
          ) : (
            users.map((user) => (
              <div 
                key={user.id} 
                onClick={() => handleUserClick(user)}
                className={`p-4 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer transition-colors ${
                  activeUser?.email === user.email 
                    ? "bg-neutral-200 dark:bg-neutral-800" 
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold dark:text-white">{user.name}</h3>
                  {user.messages[0] && (
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(user.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 truncate">
                  {user.messages[0]?.text || "No messages"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-neutral-900">
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                <User size={20} className="text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <h2 className="font-semibold dark:text-white">{activeUser.name}</h2>
                <p className="text-xs text-neutral-500">{activeUser.email}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50 dark:bg-neutral-950">
              <div className="flex flex-col space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[70%] p-3 text-sm ${
                      msg.isFromAdmin 
                        ? "bg-black text-white dark:bg-white dark:text-black self-end rounded-2xl rounded-tr-sm" 
                        : "bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white self-start rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${activeUser.name}...`}
                  className="flex-1 bg-neutral-100 dark:bg-neutral-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p className="text-lg">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
