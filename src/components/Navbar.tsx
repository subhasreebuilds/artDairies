"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Instagram";
import { motion, AnimatePresence } from "framer-motion";
import { useInstagram } from "@/context/InstagramContext";

const links = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Process", path: "/process" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { instaId } = useInstagram();

  // Close mobile nav when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out bg-[#F8F5F2]/90 backdrop-blur-md border-b border-ink-900/5 ${
          scrolled ? "py-3 shadow-sm" : "py-5 md:py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg sm:text-xl md:text-2xl tracking-tight text-ink-900 flex items-center gap-1.5 sm:gap-2">
            ART <span className="italic font-light text-accent-gold">DIARIES</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors pb-1 border-b ${
                  pathname === link.path
                    ? "text-ink-900 border-accent-gold font-semibold"
                    : "text-ink-800/50 hover:text-ink-900 border-transparent hover:border-accent-gold/40"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Instagram ID Badge */}
            <a
              href={`https://instagram.com/${instaId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/80 hover:bg-white border border-accent-gold/30 text-ink-900 transition-all shadow-sm group"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-accent-gold group-hover:scale-110 transition-transform" />
              <span className="text-[10px] tracking-widest font-mono text-ink-900 font-medium">@{instaId}</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`https://instagram.com/${instaId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream border border-accent-gold/30 text-ink-900 text-[10px] font-mono"
            >
              <InstagramIcon className="w-3 h-3 text-accent-gold" />
              <span>@{instaId}</span>
            </a>

            <button
              className="text-ink-900 p-2 -mr-2 rounded-lg focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FBF7F5]/98 backdrop-blur-xl pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-6 items-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base tracking-[0.25em] uppercase transition-colors ${
                    pathname === link.path ? "text-accent-gold font-serif text-xl italic" : "text-ink-800/80 font-light"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-4 pt-8 border-t border-ink-900/10">
              <a
                href={`https://instagram.com/${instaId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink-900 text-white text-xs tracking-[0.15em] uppercase"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-accent-gold" />
                <span>Follow @{instaId}</span>
              </a>
              <p className="text-[10px] text-ink-800/40 uppercase tracking-widest">Bhubaneswar, Odisha</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
