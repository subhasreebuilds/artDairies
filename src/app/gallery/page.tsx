"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | ArtworkCategory>("ALL");

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
              onClick={() => setActiveCategory(category)}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group"
              >
                <Link href={`/gallery/${artwork.id}`} className="block group">
                  <div className={`relative overflow-hidden bg-earth-100 shadow-sm ${artwork.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'} mb-4`}>
                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/5 transition-colors duration-700 z-10" />
                    <Image 
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain transform group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out p-4 md:p-8"
                    />
                  </div>
                  <div className="text-center md:text-left px-2">
                    <h3 className="font-serif text-lg text-ink-900 group-hover:text-ink-800 transition-colors">{artwork.title}</h3>
                    <p className="tracking-[0.2em] uppercase text-[10px] text-ink-800/50 mt-1">{artwork.category}</p>
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
