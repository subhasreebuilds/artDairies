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
  _count?: {
    messages: number;
  };
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
      
      // Mark as read in backend
      fetch("/api/admin/chats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(console.error);

    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleUserClick = (user: ChatUser) => {
    setActiveUser(user);
    fetchActiveConversation(user.email);
    
    // Optimistically clear unread count in sidebar
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email
          ? { ...u, _count: { messages: 0 } }
          : u
      )
    );
  };

  // Subscribe to global admin channel to update ANY user's preview/unread count
  useEffect(() => {
    const channel = pusherClient.subscribe("chat-admin");

    channel.bind("new-message", (newMessage: any) => {
      // If the message is from admin, we only update if it's the active user (handled in next effect)
      if (newMessage.isFromAdmin) return;

      setUsers((prevUsers) => {
        const userExists = prevUsers.some((u) => u.email === newMessage.userEmail);
        
        // If it's a new user we haven't fetched yet, just refetch all users
        if (!userExists) {
          fetchUsers();
          return prevUsers;
        }

        return prevUsers.map((u) => {
          if (u.email === newMessage.userEmail) {
            // If they are NOT the active user, increment their unread count
            const isCurrentlyActive = activeUser?.email === u.email;
            const newUnreadCount = isCurrentlyActive ? 0 : (u._count?.messages || 0) + 1;
            
            // Mark as read in DB immediately if they are the active user
            if (isCurrentlyActive) {
              fetch("/api/admin/chats", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: u.email }),
              }).catch(console.error);
            }

            return {
              ...u,
              messages: [newMessage],
              _count: { messages: newUnreadCount },
            };
          }
          return u;
        });
      });
    });

    return () => {
      pusherClient.unsubscribe("chat-admin");
    };
  }, [activeUser]);

  // Subscribe to active user's channel for the main chat area
  useEffect(() => {
    if (!activeUser) return;

    const channelName = `chat-${activeUser.email.replace(/[@.]/g, "-")}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
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
    <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] max-w-7xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl mt-4 md:mt-8 text-white relative z-10">
      {/* Sidebar - User List */}
      <div className={`${activeUser ? "hidden md:flex" : "flex"} w-full md:w-1/3 border-r border-white/10 flex-col bg-black/40`}>
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="text-xl font-serif italic font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-white placeholder-white/30 text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.length === 0 ? (
            <div className="p-8 text-center text-white/40">
              <MessageSquare className="mx-auto mb-3 opacity-30" size={32} />
              <p className="font-light text-sm">No messages yet.</p>
            </div>
          ) : (
            users.map((user) => (
              <div 
                key={user.id} 
                onClick={() => handleUserClick(user)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-300 ${
                  activeUser?.email === user.email 
                    ? "bg-accent-gold/10 border-l-2 border-l-accent-gold" 
                    : "hover:bg-white/5 border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium tracking-wide text-sm ${activeUser?.email === user.email ? "text-accent-gold" : "text-white/90"}`}>
                      {user.name}
                    </h3>
                    {(user._count?.messages || 0) > 0 && (
                      <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                        {user._count?.messages}
                      </span>
                    )}
                  </div>
                  {user.messages[0] && (
                    <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono uppercase">
                      <Clock size={10} />
                      {new Date(user.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50 truncate font-light">
                  {user.messages[0]?.text || "No messages"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!activeUser ? "hidden md:flex" : "flex"} flex-1 flex-col bg-black/20 relative`}>
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3">
              <button 
                onClick={() => setActiveUser(null)}
                className="md:hidden p-2 bg-white/5 rounded-full mr-2 hover:bg-white/10 text-white/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-br from-accent-gold/20 to-white/5 border border-accent-gold/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <User size={18} className="text-accent-gold" />
              </div>
              <div>
                <h2 className="font-semibold tracking-wide text-white/90 text-sm">{activeUser.name}</h2>
                <p className="text-[10px] text-white/40 font-mono tracking-wider mt-0.5">{activeUser.email}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent">
              <div className="flex flex-col space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[85%] md:max-w-[70%] p-3 md:p-4 text-sm font-light leading-relaxed shadow-lg backdrop-blur-md ${
                      msg.isFromAdmin 
                        ? "bg-gradient-to-br from-accent-gold/20 to-yellow-600/10 border border-accent-gold/30 text-white self-end rounded-2xl rounded-tr-sm" 
                        : "bg-white/5 border border-white/10 text-white/90 self-start rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${activeUser.name}...`}
                  className="flex-1 bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-white placeholder-white/30 text-sm transition-all"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-3.5 bg-gradient-to-r from-accent-gold to-yellow-600 text-black rounded-xl disabled:opacity-50 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/30">
            <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mb-6 relative group overflow-hidden">
              <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <MessageSquare size={36} className="text-white/20 group-hover:text-accent-gold/50 transition-colors duration-500" />
            </div>
            <p className="text-sm font-light tracking-wide">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
