"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { artworks, ArtworkCategory } from "@/data/artworks";

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
    // Optionally update URL so it can be shared
    if (category === "ALL") {
      router.push("/gallery", { scroll: false });
    } else {
      router.push(`/gallery?category=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  const filteredArtworks = artworks.filter(
    (artwork) => activeCategory === "ALL" || artwork.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="py-24 px-6 text-center bg-ivory text-ink-900 border-b border-ink-900/10">
        <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-6 block font-light">
          The Collections
        </span>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-8">Selected Works</h1>
        <p className="font-light tracking-wide max-w-xl mx-auto text-ink-800/80 leading-[1.8]">
          A curated collection of intricate patterns, divine motifs, and mindful creations.
        </p>
      </section>

      {/* Filters */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 ${
                activeCategory === category
                  ? "text-ink-900 border-b border-ink-900 font-medium"
                  : "text-ink-800/50 hover:text-ink-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid mb-8 relative group"
              >
                <Link href={`/gallery/${artwork.id}`} className="relative block group w-full aspect-[4/5] shadow-xl rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(86,65,107,0.3)] transition-all duration-500">
                  <Image 
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center text-center z-20">
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{artwork.title}</h3>
                    <p className="tracking-[0.2em] uppercase text-[10px] text-accent-gold font-medium">{artwork.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredArtworks.length === 0 && (
          <div className="text-center py-24 text-ink-800/60">
            <p>No artworks found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-ink-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
