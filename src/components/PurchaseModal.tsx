"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Mail, Send, CheckCircle2, ShieldCheck, Sparkles, PackageCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { Artwork } from "@/data/artworks";
import { InstagramIcon } from "@/components/icons/Instagram";
import { useInstagram } from "@/context/InstagramContext";
import { validateEmailFormat } from "../lib/emailValidation";

interface PurchaseModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const getTurnstileSiteKey = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAEdc79xG8VFN4eRW";
  }
  return process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAEdc79xG8VFN4eRW";
};

export default function PurchaseModal({ artwork, isOpen, onClose }: PurchaseModalProps) {
  const { instaId } = useInstagram();
  const [activeTab, setActiveTab] = useState<"form" | "quick">("form");
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userIntent, setUserIntent] = useState<"buy" | "availability" | "custom">("buy");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Reset form fields when modal opens or artwork changes
  useEffect(() => {
    if (isOpen) {
      setMessage("");
      setIsSubmitted(false);
      setError("");
      setTurnstileToken("");
    }
  }, [isOpen, artwork]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!artwork) return null;

  const getDefaultMessageNote = () => {
    if (!artwork) return "";
    if (userIntent === "buy") {
      return `Hi! I want to buy the original artwork titled "${artwork.title}" (${artwork.medium}). Please share the availability, price, and shipping options.`;
    } else if (userIntent === "availability") {
      return `Hi! I'm interested in "${artwork.title}". Could you please confirm if this piece is available or if a prints/recreation is possible?`;
    } else {
      return `Hi! I love "${artwork.title}" and would like to request a custom size or commission based on this style.`;
    }
  };

  const getPlaceholderText = () => {
    if (!artwork) return "Enter your message note...";
    if (userIntent === "buy") {
      return `Enter your message note... (Or leave blank to send default: "Hi! I want to buy '${artwork.title}'...")`;
    } else if (userIntent === "availability") {
      return `Enter your message note... (Or leave blank to check availability for "${artwork.title}")`;
    } else {
      return `Enter your message note... (Or leave blank to request custom commission for "${artwork.title}")`;
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!turnstileToken) {
      setError("Please complete the Cloudflare bot protection check.");
      setIsSubmitting(false);
      return;
    }

    const noteToSend = message.trim() || getDefaultMessageNote();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          token: turnstileToken,
          subject: `[BUY INQUIRY] "${artwork.title}" (${userIntent.toUpperCase()})`,
          message: `${noteToSend}\n\n--- Artwork Details ---\nTitle: ${artwork.title}\nCategory: ${artwork.category}\nMedium: ${artwork.medium}\nPhone/WhatsApp: ${phone || "Not provided"}`,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) throw new Error(responseData.error || "Failed to send purchase inquiry.");

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try Instagram DM or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mailto link generator
  const mailtoSubject = encodeURIComponent(`Purchase Inquiry: "${artwork.title}"`);
  const mailtoBody = encodeURIComponent(
    `Hi Art Diaries,\n\nI am interested in buying your original artwork titled "${artwork.title}".\n\nPlease let me know the availability, price details, and delivery process.\n\nThank you!`
  );
  const mailtoUrl = `mailto:hello.art.diaries@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Instagram DM link
  const instaDmUrl = `https://instagram.com/${instaId}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl bg-[#FAF7F4] text-ink-900 rounded-3xl shadow-2xl border border-ink-900/10 overflow-hidden z-10 my-auto"
          >
            {/* Top Bar / Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-ink-900/10 bg-white/60">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-full bg-accent-gold/15 text-accent-gold">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-ink-900">Direct Purchase Inquiry</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-800/50">Contact artist for price & availability</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-ink-900/5 text-ink-800/60 hover:text-ink-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 max-h-[80vh] overflow-y-auto">
              
              {/* Left Column — Artwork Card */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-ink-900/10 bg-white mb-4">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-accent-gold text-white text-[8px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full">
                    {artwork.category}
                  </div>
                </div>

                <div className="w-full text-left bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-ink-900/5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-lg font-normal text-ink-900 leading-snug">{artwork.title}</h4>
                    <span className="bg-accent-gold/15 text-accent-gold border border-accent-gold/30 font-bold text-xs px-2.5 py-1 rounded-full shrink-0">
                      {artwork.price || "₹1,999"}
                    </span>
                  </div>
                  <p className="text-xs text-ink-800/60 font-light">{artwork.medium}</p>
                  
                  <div className="pt-2 border-t border-ink-900/10 flex items-center justify-between text-[10px] text-ink-800/50 uppercase tracking-wider">
                    <span>Year: {artwork.year}</span>
                    <span className="text-accent-gold font-medium">Original Work</span>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div className="w-full mt-4 space-y-2 text-xs text-ink-800/70">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Direct contact with original artist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Safe custom protective packaging</span>
                  </div>
                </div>
              </div>

              {/* Right Column — Tabs & Contact Options */}
              <div className="md:col-span-7 flex flex-col justify-between">
                
                {/* Method Switcher Tabs */}
                <div className="flex bg-ink-900/5 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setActiveTab("form")}
                    className={`flex-1 py-2 text-xs uppercase tracking-wider rounded-lg font-medium transition-all ${
                      activeTab === "form"
                        ? "bg-white text-ink-900 shadow-sm"
                        : "text-ink-800/60 hover:text-ink-900"
                    }`}
                  >
                    Direct Message Form
                  </button>
                  <button
                    onClick={() => setActiveTab("quick")}
                    className={`flex-1 py-2 text-xs uppercase tracking-wider rounded-lg font-medium transition-all ${
                      activeTab === "quick"
                        ? "bg-white text-ink-900 shadow-sm"
                        : "text-ink-800/60 hover:text-ink-900"
                    }`}
                  >
                    Instant Messaging
                  </button>
                </div>

                {activeTab === "form" ? (
                  /* Form View */
                  isSubmitted ? (
                    <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 my-auto">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-xl text-ink-900">Inquiry Sent Successfully!</h4>
                      <p className="text-xs text-ink-800/70 font-light max-w-sm">
                        Thank you for your interest in <strong>"{artwork.title}"</strong>. I will get back to you with pricing and availability details shortly.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-4 bg-ink-900 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-accent-gold transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitForm} className="space-y-3.5">
                      
                      {/* Reason / Intent Pills */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-ink-800/70 mb-1.5 font-medium">
                          I want to:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: "buy", label: "Buy Artwork" },
                            { id: "availability", label: "Check Available" },
                            { id: "custom", label: "Custom Request" },
                          ].map((intent) => (
                            <button
                              type="button"
                              key={intent.id}
                              onClick={() => setUserIntent(intent.id as any)}
                              className={`py-1.5 px-2 text-[10px] uppercase tracking-wider rounded-lg border text-center transition-all ${
                                userIntent === intent.id
                                  ? "bg-ink-900 text-white border-ink-900 font-semibold"
                                  : "bg-white text-ink-800/70 border-ink-900/15 hover:border-ink-900/40"
                              }`}
                            >
                              {intent.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-ink-800/70 mb-1 font-medium">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-white border border-ink-900/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ink-900 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-ink-800/70 mb-1 font-medium">
                            Your Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-white border border-ink-900/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ink-900 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-ink-800/70 mb-1 font-medium">
                          Phone / WhatsApp Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone or WhatsApp number"
                          className="w-full bg-white border border-ink-900/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ink-900 transition-colors"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[10px] uppercase tracking-widest text-ink-800/70 font-medium">
                            Message Note (Optional)
                          </label>
                        </div>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={getPlaceholderText()}
                          className="w-full bg-white border border-ink-900/15 rounded-xl p-3 text-xs focus:outline-none focus:border-ink-900 transition-colors resize-none leading-relaxed placeholder:text-ink-900/40 placeholder:font-light"
                        />
                      </div>

                      {/* Cloudflare Turnstile Bot Protection */}
                      <div className="py-1 flex justify-center scale-90 sm:scale-100 origin-center">
                        <Turnstile
                          siteKey={getTurnstileSiteKey()}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onExpire={() => setTurnstileToken("")}
                          onError={() => setTurnstileToken("")}
                          options={{ theme: "light", size: "normal" }}
                        />
                      </div>

                      {error && <p className="text-red-500 text-[11px] font-light text-center">{error}</p>}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-ink-900 text-white py-3 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-accent-gold transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {isSubmitting ? "Sending Inquiry..." : "Submit Purchase Inquiry"}
                      </button>
                    </form>
                  )
                ) : (
                  /* Instant Messaging View */
                  <div className="space-y-4 py-2 my-auto">
                    <p className="text-xs text-ink-800/70 font-light leading-relaxed">
                      Prefer instant social messaging or direct email? Choose your option below to connect with the artist regarding <strong>"{artwork.title}"</strong>:
                    </p>

                    <div className="space-y-3">
                      {/* Instagram DM */}
                      <a
                        href={instaDmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white hover:opacity-95 transition-opacity shadow-md group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="bg-white/20 p-2 rounded-full">
                            <InstagramIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="block text-xs font-semibold tracking-wide">Direct Message on Instagram</span>
                            <span className="text-[10px] text-white/90 font-light">Send DM directly to @{instaId}</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider bg-white/20 px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-rose-600 transition-all font-medium">
                          Open Instagram →
                        </span>
                      </a>

                      {/* Email Mailto */}
                      <a
                        href={mailtoUrl}
                        className="w-full flex items-center justify-between p-4.5 rounded-2xl bg-white border border-ink-900/15 text-ink-900 hover:bg-ink-900 hover:text-white transition-all shadow-sm group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="bg-accent-gold/15 group-hover:bg-white/20 p-2 rounded-full transition-colors">
                            <Mail className="w-5 h-5 text-accent-gold group-hover:text-white transition-colors" />
                          </div>
                          <div className="text-left">
                            <span className="block text-xs font-semibold tracking-wide">Send Direct Email</span>
                            <span className="text-[10px] text-ink-800/60 group-hover:text-white/80 font-light transition-colors">hello.art.diaries@gmail.com</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider border border-ink-900/20 group-hover:border-white px-3 py-1.5 rounded-full font-medium">
                          Email App →
                        </span>
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
