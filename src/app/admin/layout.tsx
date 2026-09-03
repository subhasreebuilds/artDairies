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
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col pt-20">
        <div className="p-6">
          <h1 className="text-xl font-serif font-semibold tracking-tight dark:text-white">
            Admin Panel
          </h1>
          <p className="text-xs text-neutral-500 mt-1">Art Diaries Control Center</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-black text-white dark:bg-white dark:text-black font-medium shadow-sm" 
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-all text-sm">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pt-20 p-8">
        {children}
      </main>
    </div>
  );
}
