"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Expand } from "lucide-react";
import { Artwork } from "@/data/artworks";
import ArtworkViewer from "@/components/ArtworkViewer";

interface Props {
  artwork: Artwork;
  prevArtwork: Artwork | null;
  nextArtwork: Artwork | null;
  relatedArtworks: Artwork[];
}

export default function ArtworkDetailClient({ artwork, prevArtwork, nextArtwork, relatedArtworks }: Props) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-transparent text-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-24">
          
          {/* Back Navigation */}
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-ink-800/60 hover:text-accent-gold pt-20 sm:pt-16 mb-8 sm:mb-16 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            
            {/* Image Side */}
            <div 
              className="relative w-full bg-white/40 backdrop-blur-sm rounded-3xl border border-ink-900/5 shadow-lg overflow-hidden group p-4 sm:p-8 md:p-12 cursor-pointer flex items-center justify-center"
              onClick={() => setIsViewerOpen(true)}
            >
              <Image 
                src={artwork.image}
                alt={artwork.title}
                width={1200}
                height={artwork.orientation === 'portrait' ? 1500 : 1200}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-700 rounded-xl"
                priority
              />
              
              <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/5 transition-colors duration-500" />
              
              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 bg-ink-900/80 text-white text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-md">
                <Expand className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Fullscreen
              </div>
            </div>

            {/* Details Side */}
            <div className="flex flex-col">
              <p className="text-accent-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-4 font-medium">
                {artwork.category}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 text-ink-900 leading-[1.1]">
                {artwork.title}
              </h1>
              
              <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 mb-8 sm:mb-10 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-ink-800/70 border-y border-ink-900/10 py-4 sm:py-6">
                <div>
                  <span className="block text-ink-800/40 mb-1 sm:mb-2">Medium</span>
                  {artwork.medium}
                </div>
                <div>
                  <span className="block text-ink-800/40 mb-1 sm:mb-2">Year</span>
                  {artwork.year}
                </div>
              </div>

              <div className="prose prose-p:font-light prose-p:leading-[1.8] prose-p:text-ink-800/80 max-w-none mb-10 sm:mb-16 text-sm sm:text-base">
                <h3 className="text-ink-900 font-serif text-xl sm:text-2xl mb-3 sm:mb-4 font-normal">About This Work</h3>
                <p>{artwork.description}</p>
              </div>

              <div className="mt-auto pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8">
                <button 
                  onClick={() => setIsViewerOpen(true)}
                  className="bg-ink-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] rounded-full hover:bg-accent-gold transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Expand className="w-4 h-4" />
                  View Fullscreen
                </button>
                <Link 
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-4 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors py-2"
                >
                  Inquire
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Between Artworks */}
          <div className="mt-20 sm:mt-32 pt-10 sm:pt-16 border-t border-ink-900/10 flex justify-between items-center gap-4">
            {prevArtwork ? (
              <Link 
                href={`/gallery/${prevArtwork.id}`}
                className="group flex flex-col items-start max-w-[48%]"
              >
                <span className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-ink-800/50 mb-1 sm:mb-3 group-hover:text-accent-gold transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Previous
                </span>
                <span className="font-serif text-base sm:text-xl md:text-2xl text-ink-900 truncate w-full">{prevArtwork.title}</span>
              </Link>
            ) : <div />}

            {nextArtwork ? (
              <Link 
                href={`/gallery/${nextArtwork.id}`}
                className="group flex flex-col items-end text-right max-w-[48%]"
              >
                <span className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-ink-800/50 mb-1 sm:mb-3 group-hover:text-accent-gold transition-colors">
                  Next <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <span className="font-serif text-base sm:text-xl md:text-2xl text-ink-900 truncate w-full">{nextArtwork.title}</span>
              </Link>
            ) : <div />}
          </div>

          {/* Related Artworks */}
          {relatedArtworks && relatedArtworks.length > 0 && (
            <div className="mt-32">
              <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-12 block font-light text-center">
                Related Works
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArtworks.map(related => (
                  <Link 
                    href={`/gallery/${related.id}`} 
                    key={related.id}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative w-full overflow-hidden bg-earth-100 shadow-sm mb-4">
                      <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/5 transition-colors duration-700 z-10" />
                      <Image 
                        src={related.image}
                        alt={related.title}
                        width={600}
                        height={related.orientation === 'portrait' ? 800 : 600}
                        className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out p-4 md:p-8"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-serif text-lg text-ink-900 group-hover:text-ink-800 transition-colors">{related.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <ArtworkViewer 
        artwork={artwork} 
        prevArtwork={prevArtwork}
        nextArtwork={nextArtwork}
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </>
  );
}
