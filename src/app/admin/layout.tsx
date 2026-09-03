"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Image as ImageIcon, LogOut } from "lucide-react";
import { pusherClient } from "@/lib/pusher";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unreadChats, setUnreadChats] = useState(0);

  // Subscribe to global admin channel for new messages
  useEffect(() => {
    if (pathname === "/admin") return;

    const channel = pusherClient.subscribe("chat-admin");

    channel.bind("new-message", (newMessage: any) => {
      // If we are not currently on the chats page, increment the unread badge
      if (pathname !== "/admin/chats" && !newMessage.isFromAdmin) {
        setUnreadChats((prev) => prev + 1);
        
        try {
          const audio = new Audio("/notification.mp3");
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {}
      }
    });

    return () => {
      pusherClient.unsubscribe("chat-admin");
    };
  }, [pathname]);

  // Clear unread chats when visiting the chats page
  useEffect(() => {
    if (pathname === "/admin/chats") {
      setUnreadChats(0);
    }
  }, [pathname]);

  // Don't show the layout on the login page itself
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Chats", href: "/admin/chats", icon: MessageSquare, badge: unreadChats },
  ];

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white selection:bg-accent-gold/30 relative">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/5 backdrop-blur-2xl border-b border-white/10 relative z-20">
        <h1 className="text-xl font-serif italic font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">
          Command Center
        </h1>
      </div>

      {/* Premium Glassmorphic Admin Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex-col pt-8 relative overflow-hidden shadow-2xl">
        {/* Subtle glow effect behind sidebar */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent-gold/20 to-transparent opacity-50 blur-xl pointer-events-none" />
        
        <div className="p-8 relative z-10">
          <h1 className="text-2xl font-serif italic font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">
            Command Center
          </h1>
          <p className="text-xs text-white/40 mt-2 font-mono uppercase tracking-widest">Art Diaries</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-3 mt-4 relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-gradient-to-r from-accent-gold/20 to-white/5 border border-accent-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] text-accent-gold" 
                    : "text-white/60 hover:bg-white/10 hover:text-white border border-transparent"
                }`}
              >
                <div className="relative">
                  <item.icon size={20} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.badge ? (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border border-black flex items-center justify-center text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="font-medium tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 relative z-10">
          <button className="flex items-center justify-center gap-3 px-5 py-4 w-full rounded-2xl bg-white/5 text-white/60 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all duration-300 group font-medium">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8 relative z-10">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-3xl border-t border-white/10 flex items-center justify-around p-4 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                isActive ? "text-accent-gold" : "text-white/50 hover:text-white/80"
              }`}
            >
              <div className="relative">
                <item.icon size={22} className={isActive ? "scale-110" : ""} />
                {item.badge ? (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border border-black flex items-center justify-center text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1">{item.name}</span>
            </Link>
          );
        })}
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 text-white/50 hover:text-red-400">
          <LogOut size={22} />
          <span className="text-[10px] font-medium tracking-wide mt-1">Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
