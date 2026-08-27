"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { InstagramIcon } from "@/components/icons/Instagram";
import { validateEmailFormat } from "../../lib/emailValidation";

const getTurnstileSiteKey = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAEdc79xG8VFN4eRW";
  }
  return process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAEdc79xG8VFN4eRW";
};

function ContactForm() {
  const searchParams = useSearchParams();
  const artworkQuery = searchParams.get("artwork");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(artworkQuery ? "artwork" : "general");
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    if (artworkQuery) {
      setSubject("artwork");
    }
  }, [artworkQuery]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.trim()) {
      const res = validateEmailFormat(val);
      setEmailError(res.isValid ? "" : (res.error || ""));
    } else {
      setEmailError("");
    }
  };

  const getDefaultMessageForSubject = () => {
    if (artworkQuery) {
      return `Hi! I would like to inquire about purchasing or commissioning the artwork titled "${artworkQuery}". Please let me know availability and details.`;
    }
    switch (subject) {
      case "artwork":
        return "Hi! I am interested in purchasing an original artwork from Art Diaries. Please share details on available pieces and pricing.";
      case "commission":
        return "Hi! I would like to request a custom artwork commission. Please share your availability, process, and sizing options.";
      case "collab":
        return "Hi! I would like to discuss a potential collaboration or exhibition opportunity with Art Diaries.";
      case "general":
      default:
        return "Hi! I would like to reach out with a general inquiry about your art collection and creative process.";
    }
  };

  const getPlaceholderText = () => {
    if (artworkQuery) {
      return `Enter your message note... (Or leave blank to inquire about "${artworkQuery}")`;
    }
    switch (subject) {
      case "artwork":
        return `Enter your message note... (Or leave blank for default: "Hi! I am interested in purchasing an original artwork...")`;
      case "commission":
        return `Enter your message note... (Or leave blank for default: "Hi! I would like to request a custom artwork commission...")`;
      case "collab":
        return `Enter your message note... (Or leave blank for default: "Hi! I would like to discuss a potential collaboration...")`;
      case "general":
      default:
        return `Enter your message note... (Or leave blank for default: "Hi! I would like to reach out with a general inquiry...")`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.isValid) {
      setEmailError(emailCheck.error || "Please enter a valid email address.");
      setError(emailCheck.error || "Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the Cloudflare bot protection check.");
      setIsSubmitting(false);
      return;
    }

    const typedMessage = message.trim();
    const finalMessage = typedMessage || getDefaultMessageForSubject();

    if (!finalMessage) {
      setError("Please enter a message note.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      subject,
      message: finalMessage,
      token: turnstileToken,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Failed to send message.");
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-10 md:p-16 shadow-md border border-ink-900/5 rounded-3xl relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-earth-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <h2 className="font-serif text-3xl mb-12 text-ink-900 relative z-10">Send a Message</h2>
      
      {isSubmitted ? (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
          <div className="w-16 h-16 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mb-4">
            <ArrowRight className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl">Message Sent</h3>
          <p className="font-light text-ink-800/80">
            Thank you for reaching out. I will get back to you shortly.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setName("");
              setEmail("");
              setEmailError("");
              setMessage("");
              setTurnstileToken("");
            }}
            className="mt-8 text-sm uppercase tracking-widest border-b border-ink-900 pb-1 hover:text-accent-gold hover:border-accent-gold transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/30"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`w-full bg-transparent border-b ${
                emailError ? "border-red-500 text-red-900" : "border-ink-900/20"
              } py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/30`}
              placeholder="Enter your email (e.g. name@gmail.com)"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1 font-light">{emailError}</p>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs uppercase tracking-widest mb-2 font-medium">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light appearance-none rounded-none"
            >
              <option value="general">General Inquiry</option>
              <option value="artwork">Original Artwork Purchase</option>
              <option value="commission">Commission Request</option>
              <option value="collab">Collaboration</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="message" className="block text-xs uppercase tracking-widest font-medium">
                Message Note (Optional)
              </label>
            </div>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/40 resize-none"
              placeholder={getPlaceholderText()}
            ></textarea>
          </div>

          {/* Cloudflare Turnstile Bot Protection */}
          <div className="py-2 flex justify-center">
            <Turnstile
              siteKey={getTurnstileSiteKey()}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken("")}
              onError={() => setTurnstileToken("")}
              options={{ theme: "light", size: "normal" }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ink-900 text-white py-4 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-accent-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Sending..." : "Submit Message"}
          </button>
        {error && (
          <p className="text-red-500 text-xs text-center mt-2">{error}</p>
        )}
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent text-ink-900 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-20 sm:pt-24">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 sm:mb-8 block font-medium">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-6 sm:mb-8 text-ink-900">
              Inquiries &<br />
              <span className="italic font-light text-accent-gold">Commissions</span>
            </h1>
            <p className="font-light text-base sm:text-lg text-ink-800/80 mb-10 sm:mb-16 max-w-md leading-[1.8]">
              For original artwork inquiries, commissions, collaborations, or just to say hello, please fill out the form or reach out via Instagram.
            </p>

            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl mb-4 sm:mb-6 text-ink-900">Services</h3>
                <ul className="space-y-3 font-light text-sm sm:text-base text-ink-800/80">
                  <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0" /> Commissioned Artwork</li>
                  <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0" /> Brand Collaborations</li>
                  <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0" /> Exhibition Opportunities</li>
                  <li className="flex items-center gap-3 sm:gap-4"><span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0" /> Purchasing Original Pieces</li>
                </ul>
              </div>

              <div className="pt-8 sm:pt-12 border-t border-ink-900/10">
                <h3 className="font-serif text-xl sm:text-2xl mb-4 sm:mb-6 text-ink-900">Connect</h3>
                <div className="space-y-4 sm:space-y-6">
                  <a
                    href="https://instagram.com/art_.diaries._"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 sm:gap-6 text-ink-800 hover:text-accent-gold transition-colors font-light group text-sm sm:text-base"
                  >
                    <span className="bg-white/60 p-3 sm:p-4 rounded-full group-hover:bg-accent-gold/20 transition-colors shadow-sm">
                      <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                    </span>
                    <span className="tracking-wide">@art_.diaries._</span>
                  </a>
                  <a
                    href="mailto:hello.art.diaries@gmail.com"
                    className="flex items-center gap-4 sm:gap-6 text-ink-800 hover:text-accent-gold transition-colors font-light group text-sm sm:text-base"
                  >
                    <span className="bg-white/60 p-3 sm:p-4 rounded-full group-hover:bg-accent-gold/20 transition-colors shadow-sm">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
                    </span>
                    <span className="tracking-wide break-all sm:break-normal">hello.art.diaries@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side with Suspense boundary */}
          <Suspense fallback={<div className="bg-white/60 p-12 rounded-3xl animate-pulse min-h-[400px]" />}>
            <ContactForm />
          </Suspense>

        </div>
      </div>
    </div>
  );
}
