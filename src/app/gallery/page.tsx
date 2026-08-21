"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArtworkCategory } from "@/data/artworks";
import { useInstagram } from "@/context/InstagramContext";
import { InstagramIcon } from "@/components/icons/Instagram";
import { Heart, MessageCircle, RefreshCw, Sparkles, ExternalLink } from "lucide-react";

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
      {/* Header & Instagram Control Toolbar */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 text-center bg-transparent text-ink-900 border-b border-ink-900/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3 block font-medium">
            ✦ Art Portfolio Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight mb-4 sm:mb-6">
            Selected <span className="italic font-light text-accent-gold">Works</span>
          </h1>
          <p className="font-light text-sm sm:text-base tracking-wide max-w-xl mx-auto text-ink-800/80 leading-[1.8]">
            An archive of intricate patterns, divine motifs, and handmade artwork created with passion and precision.
          </p>
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

                    {/* Title & Likes bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 z-20 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-400">
                      <h3 className="font-serif text-base sm:text-xl text-white leading-tight mb-2">{artwork.title}</h3>

                      <div className="flex items-center text-white/80 text-[11px] font-sans">
                        <span className="text-[10px] tracking-wider uppercase text-accent-gold">
                          View Work →
                        </span>
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
