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
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <section className="pt-36 pb-20 px-6 text-center bg-transparent text-ink-900 border-b border-ink-900/10">
        <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-6 block font-light">
          The Collections
        </span>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-8">
          Selected <span className="italic font-light text-accent-gold">Works</span>
        </h1>
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
              className={`text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${
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
      <section className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
        >
          <AnimatePresence>
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="break-inside-avoid mb-8 relative group"
              >
                {/* Alternate aspect ratio for visual rhythm: portrait / square / portrait / tall */}
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

                  {/* Overlay — subtle always, stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Pink pill badge top-left */}
                  <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span className="bg-accent-gold text-white text-[9px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {artwork.category}
                    </span>
                  </div>

                  {/* Title slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="font-serif text-lg md:text-xl text-white leading-tight">{artwork.title}</h3>
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
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-ink-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
