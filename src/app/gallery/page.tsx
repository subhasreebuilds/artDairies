"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork, ArtworkCategory } from "@/data/artworks";
import { useInstagram } from "@/context/InstagramContext";
import { InstagramIcon } from "@/components/icons/Instagram";
import { ShoppingBag, RefreshCw, Sparkles, ShieldCheck, PackageCheck, Truck, Palette, ArrowRight, Tag } from "lucide-react";
import PurchaseModal from "@/components/PurchaseModal";

const CATEGORIES: ("ALL" | ArtworkCategory)[] = [
  "ALL",
  "MANDALA",
  "ODISHA & JAGANNATH",
  "PEN & INK",
  "HANDMADE",
  "DECORATIVE"
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryCategory = searchParams.get("category") as ArtworkCategory | null;
  
  const { combinedArtworks, instaId, loading, isLive, refreshArtworks } = useInstagram();
  const [activeCategory, setActiveCategory] = useState<"ALL" | ArtworkCategory>("ALL");
  const [selectedPurchaseArtwork, setSelectedPurchaseArtwork] = useState<Artwork | null>(null);

  // Sync state with URL when component mounts or URL changes
  useEffect(() => {
    if (queryCategory && CATEGORIES.includes(queryCategory)) {
      setActiveCategory(queryCategory);
    } else {
      setActiveCategory("ALL");
    }
  }, [queryCategory]);

  const handleCategoryClick = (category: "ALL" | ArtworkCategory) => {
    setActiveCategory(category);
    if (category === "ALL") {
      router.push("/gallery", { scroll: false });
    } else {
      router.push(`/gallery?category=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  const filteredArtworks = combinedArtworks.filter(
    (artwork) => activeCategory === "ALL" || artwork.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header & Purchase Callout Toolbar */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 text-center bg-transparent text-ink-900 border-b border-ink-900/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3 block font-medium">
            ✦ Art Portfolio Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight mb-4 sm:mb-6">
            Selected <span className="italic font-light text-accent-gold">Works</span>
          </h1>
          <p className="font-light text-sm sm:text-base tracking-wide max-w-xl mx-auto text-ink-800/80 leading-[1.8] mb-6">
            An archive of intricate patterns, divine motifs, and handmade artwork created with passion and precision.
          </p>

          {/* Quick Notice Banner for Buyers */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent-gold/10 border border-accent-gold/25 text-ink-900 text-xs sm:text-sm shadow-sm">
            <Tag className="w-4 h-4 text-accent-gold shrink-0" />
            <span className="font-medium">Original artworks & custom creations starting from ₹799</span>
            <a 
              href="#want-to-buy" 
              className="text-accent-gold font-semibold underline underline-offset-4 hover:text-ink-900 transition-colors ml-1 inline-flex items-center gap-1"
            >
              Pricing Info <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Filters — horizontally scrollable on mobile */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 border-b border-ink-900/5 bg-cream/20">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-2 px-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`whitespace-nowrap text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 shrink-0 ${
                activeCategory === category
                  ? "text-ink-900 border-accent-gold font-semibold"
                  : "text-ink-800/50 hover:text-ink-900 border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto">
        {loading && filteredArtworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-ink-800/60">
            <RefreshCw className="w-8 h-8 animate-spin text-accent-gold" />
            <p className="text-sm tracking-wider font-light">Loading Instagram feed for @{instaId}...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 space-y-6 sm:space-y-8"
          >
            <AnimatePresence>
              {filteredArtworks.map((artwork: any, index: number) => (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="break-inside-avoid mb-6 sm:mb-8 relative group"
                >
                  <Link
                    href={`/gallery/${artwork.id}`}
                    className={`relative block w-full overflow-hidden rounded-3xl shadow-lg
                      hover:-translate-y-3 hover:shadow-[0_30px_60px_-12px_rgba(200,96,90,0.4)]
                      hover:ring-2 hover:ring-accent-gold/50 transition-all duration-500
                      ${index % 5 === 2 ? "aspect-square" : index % 5 === 4 ? "aspect-[3/4]" : "aspect-[4/5]"}
                    `}
                  >
                    <Image 
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent sm:via-transparent sm:from-ink-900/80 opacity-90 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category pill top-left */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                      <span className="bg-accent-gold text-white text-[8px] sm:text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
                        {artwork.category}
                      </span>
                    </div>

                    {/* Title & Pricing Action bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 z-20 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-400">
                      <h3 className="font-serif text-base sm:text-xl text-white leading-tight mb-2.5">{artwork.title}</h3>

                      <div className="flex items-center justify-between text-white/80 text-[11px] font-sans">
                        <span className="text-[10px] tracking-wider uppercase text-accent-gold group-hover:text-white transition-colors">
                          View Work →
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedPurchaseArtwork(artwork);
                          }}
                          className="text-[10px] tracking-widest uppercase text-white bg-accent-gold hover:bg-white hover:text-ink-900 px-3 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1.5 transition-all duration-300 transform hover:scale-105 active:scale-95"
                          title="View pricing & purchase inquiry options"
                        >
                          <Tag className="w-3 h-3 text-white group-hover:text-ink-900 transition-colors" />
                          Pricing: {artwork.price || "₹1,999"}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredArtworks.length === 0 && (
          <div className="text-center py-24 text-ink-800/60">
            <p className="font-serif text-xl mb-2">No artworks found in this category.</p>
          </div>
        )}
      </section>

      {/* WANT TO BUY ARTWORK SECTION */}
      <section id="want-to-buy" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-ink-900/10 bg-cream/30 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 block font-semibold">
              ✦ Acquire Original Art
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink-900 tracking-tight mb-4">
              Want to <span className="italic text-accent-gold">Buy an Artwork?</span>
            </h2>
            <p className="text-ink-800/80 font-light text-sm sm:text-base leading-[1.8] max-w-2xl mx-auto">
              All original paintings, devotional pieces, and handmade artworks in this archive are available for purchase directly from the artist. Custom sizes, color schemes, and commissions are also welcome.
            </p>
          </div>

          {/* 3 Steps to Buy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-ink-900/10 shadow-lg hover:shadow-xl transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-accent-gold/15 text-accent-gold flex items-center justify-center mb-6 font-serif text-xl font-bold group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="font-serif text-xl text-ink-900 mb-2">1. Choose Your Piece</h3>
              <p className="text-xs sm:text-sm text-ink-800/70 font-light leading-relaxed">
                Browse our gallery above and click <span className="font-medium text-ink-900">"Buy / Inquire"</span> on any artwork, or share your custom design concept.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-ink-900/10 shadow-lg hover:shadow-xl transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-accent-gold/15 text-accent-gold flex items-center justify-center mb-6 font-serif text-xl font-bold group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="font-serif text-xl text-ink-900 mb-2">2. Direct Inquiry</h3>
              <p className="text-xs sm:text-sm text-ink-800/70 font-light leading-relaxed">
                Submit an inquiry via our quick online form, Instagram DM, or email to receive price details, dimensions, and framing advice.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-ink-900/10 shadow-lg hover:shadow-xl transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-accent-gold/15 text-accent-gold flex items-center justify-center mb-6 font-serif text-xl font-bold group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="font-serif text-xl text-ink-900 mb-2">3. Safe Protective Delivery</h3>
              <p className="text-xs sm:text-sm text-ink-800/70 font-light leading-relaxed">
                Your artwork is packaged with multi-layer moisture and impact protection, ensuring it arrives at your doorstep in pristine condition.
              </p>
            </div>
          </div>

          {/* Guarantee Badges & CTA Box */}
          <div className="bg-ink-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-accent-gold shrink-0">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold mb-1">100% Authentic</h4>
                  <p className="text-xs text-white/70 font-light">Handmade original artwork signed directly by the artist.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-accent-gold shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold mb-1">Direct Contact</h4>
                  <p className="text-xs text-white/70 font-light">Direct interaction with artist without gallery markup fees.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-accent-gold shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold mb-1">Safe Shipping</h4>
                  <p className="text-xs text-white/70 font-light">Insured & reinforced custom protective packaging.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-accent-gold shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold mb-1">Custom Commissions</h4>
                  <p className="text-xs text-white/70 font-light">Tailored dimensions, color schemes & personalized motifs.</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 relative z-10">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">Have a artwork in mind or want to request a custom piece?</h4>
                <p className="text-xs text-white/70 font-light mt-1">Get immediate pricing, availability details, and delivery estimates.</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setSelectedPurchaseArtwork(combinedArtworks[0] || null)}
                  className="bg-accent-gold hover:bg-white hover:text-ink-900 text-white font-semibold text-xs tracking-[0.2em] uppercase px-7 py-4 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Inquire to Buy Artwork
                </button>
                
                <a
                  href={`https://instagram.com/${instaId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-xs tracking-[0.2em] uppercase px-6 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-white" />
                  Instagram DM
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Direct Buy / Inquiry Modal */}
      <PurchaseModal
        artwork={selectedPurchaseArtwork}
        isOpen={!!selectedPurchaseArtwork}
        onClose={() => setSelectedPurchaseArtwork(null)}
      />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-ink-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
