"use client";

import { useState } from "react";
import Link from "next/link";
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
      <section className="py-24 px-6 text-center bg-ink-900 text-ivory">
        <h1 className="font-serif text-4xl md:text-6xl tracking-widest mb-6">GALLERY</h1>
        <p className="font-light tracking-wide max-w-xl mx-auto text-ivory/80">
          A curated collection of intricate patterns, divine motifs, and mindful creations.
        </p>
      </section>

      {/* Filters */}
      <section className="py-12 px-6 border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs md:text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? "text-accent-gold font-medium border-b border-accent-gold pb-1"
                  : "text-ink-800/60 hover:text-ink-900"
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
                <Link href={`/gallery/${artwork.id}`} className="block relative overflow-hidden bg-earth-100">
                  {/* Since we don't have real images with varying aspect ratios, we use a placeholder block. 
                      In reality, the image tag would dictate the height. */}
                  <div 
                    className="w-full bg-earth-200 transition-transform duration-700 group-hover:scale-105"
                    style={{ height: `${Math.random() * 200 + 300}px` }} 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/60 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <h3 className="text-ivory font-serif text-xl mb-1">{artwork.title}</h3>
                      <p className="text-accent-gold text-xs tracking-widest uppercase">{artwork.category}</p>
                    </div>
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
