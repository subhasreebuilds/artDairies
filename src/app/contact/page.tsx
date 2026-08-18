"use client";

import { useState } from "react";
import { Camera, Mail, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink-900 pb-24">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-8 block font-light">
              Get in Touch
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 text-ink-900">
              Inquiries &<br />
              <span className="italic font-light text-ink-800">Commissions</span>
            </h1>
            <p className="font-light text-lg text-ink-800/80 mb-16 max-w-md leading-[1.8]">
              For original artwork inquiries, commissions, collaborations, or just to say hello, please fill out the form or reach out via Instagram.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl mb-6 text-ink-900">Services</h3>
                <ul className="space-y-3 font-light text-ink-800/80">
                  <li className="flex items-center gap-4"><span className="w-1 h-1 bg-accent-gold rounded-full" /> Commissioned Artwork</li>
                  <li className="flex items-center gap-4"><span className="w-1 h-1 bg-accent-gold rounded-full" /> Brand Collaborations</li>
                  <li className="flex items-center gap-4"><span className="w-1 h-1 bg-accent-gold rounded-full" /> Exhibition Opportunities</li>
                  <li className="flex items-center gap-4"><span className="w-1 h-1 bg-accent-gold rounded-full" /> Purchasing Original Pieces</li>
                </ul>
              </div>

              <div className="pt-12 border-t border-ink-900/10">
                <h3 className="font-serif text-2xl mb-6 text-ink-900">Connect</h3>
                <div className="space-y-6">
                  <a
                    href="https://instagram.com/art_.diaries._"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 text-ink-800 hover:text-ink-900 transition-colors font-light group"
                  >
                    <span className="bg-earth-100 p-4 rounded-full group-hover:bg-accent-gold/20 transition-colors">
                      <Camera className="w-5 h-5 text-ink-900" />
                    </span>
                    <span className="tracking-wide">@art_.diaries._</span>
                  </a>
                  <a
                    href="mailto:hello.art.diaries@gmail.com"
                    className="flex items-center gap-6 text-ink-800 hover:text-ink-900 transition-colors font-light group"
                  >
                    <span className="bg-earth-100 p-4 rounded-full group-hover:bg-accent-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-ink-900" />
                    </span>
                    <span className="tracking-wide">hello.art.diaries@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 md:p-16 shadow-sm border border-ink-900/5 relative overflow-hidden">
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
                  onClick={() => setIsSubmitted(false)}
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
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/30"
                    placeholder="Jane Doe"
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
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/30"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-widest mb-2 font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light appearance-none rounded-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="commission">Commission Request</option>
                    <option value="artwork">Original Artwork Purchase</option>
                    <option value="collab">Collaboration</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 focus:outline-none focus:border-ink-900 transition-colors font-light placeholder:text-ink-900/30 resize-none"
                    placeholder="Tell me about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ink-900 text-ivory py-4 uppercase tracking-widest text-sm hover:bg-ink-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
