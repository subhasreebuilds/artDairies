"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Image as ImageIcon, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show the layout on the login page itself
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Chats", href: "/admin/chats", icon: MessageSquare },
    { name: "Custom Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white selection:bg-accent-gold/30">
      {/* Premium Glassmorphic Admin Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col pt-8 relative overflow-hidden shadow-2xl">
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
                <item.icon size={20} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
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
      <main className="flex-1 overflow-auto p-8 relative">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
