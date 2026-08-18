"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wider text-ink-900">
            ART DIARIES
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  pathname === link.path
                    ? "text-ink-900 font-medium"
                    : "text-ink-800/60 hover:text-ink-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://instagram.com/art_.diaries._"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-800/60 hover:text-accent-gold transition-colors ml-4"
            >
              <Camera className="w-5 h-5" />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-ink-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-center mt-12">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-serif tracking-wider ${
                    pathname === link.path ? "text-accent-gold" : "text-ink-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://instagram.com/art_.diaries._"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-8 flex items-center gap-2 text-ink-800/60"
              >
                <Camera className="w-5 h-5" />
                <span>@art_.diaries._</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
