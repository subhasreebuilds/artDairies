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
      <div className="min-h-screen bg-ivory text-ink-900">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          
          {/* Back Navigation */}
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-ink-800/60 hover:text-ink-900 mb-16 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Image Side */}
            <div 
              className="relative w-full bg-earth-100 shadow-sm overflow-hidden group p-8 md:p-16 cursor-pointer flex items-center justify-center"
              onClick={() => setIsViewerOpen(true)}
            >
              <Image 
                src={artwork.image}
                alt={artwork.title}
                width={1200}
                height={artwork.orientation === 'portrait' ? 1500 : 1200}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-700"
                priority
              />
              
              <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/5 transition-colors duration-500" />
              
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 bg-ink-900/80 text-ivory text-[10px] uppercase tracking-[0.2em] px-6 py-3 backdrop-blur-md">
                <Expand className="w-4 h-4" />
                Inside the Artwork
              </div>
            </div>

            {/* Details Side */}
            <div className="flex flex-col">
              <p className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-4">
                {artwork.category}
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 text-ink-900 leading-[1.1]">
                {artwork.title}
              </h1>
              
              <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10 text-xs tracking-[0.2em] uppercase text-ink-800/70 border-y border-ink-900/10 py-6">
                <div>
                  <span className="block text-ink-800/40 mb-2">Medium</span>
                  {artwork.medium}
                </div>
                <div>
                  <span className="block text-ink-800/40 mb-2">Year</span>
                  {artwork.year}
                </div>
              </div>

              <div className="prose prose-p:font-light prose-p:leading-[1.8] prose-p:text-ink-800/80 max-w-none mb-16">
                <h3 className="text-ink-900 font-serif text-2xl mb-4 font-normal">About This Work</h3>
                <p>{artwork.description}</p>
              </div>

              <div className="mt-auto pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <button 
                  onClick={() => setIsViewerOpen(true)}
                  className="bg-ink-900 text-ivory px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-ink-800 transition-colors flex items-center gap-2"
                >
                  <Expand className="w-4 h-4" />
                  View Fullscreen
                </button>
                <Link 
                  href="/contact"
                  className="group inline-flex items-center gap-4 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors"
                >
                  Inquire
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Between Artworks */}
          <div className="mt-32 pt-16 border-t border-ink-900/10 flex justify-between items-center">
            {prevArtwork ? (
              <Link 
                href={`/gallery/${prevArtwork.id}`}
                className="group flex flex-col items-start"
              >
                <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ink-800/40 mb-3 group-hover:text-ink-900 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Previous Work
                </span>
                <span className="font-serif text-xl md:text-2xl text-ink-900">{prevArtwork.title}</span>
              </Link>
            ) : <div />}

            {nextArtwork ? (
              <Link 
                href={`/gallery/${nextArtwork.id}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ink-800/40 mb-3 group-hover:text-ink-900 transition-colors">
                  Next Work <ChevronRight className="w-4 h-4" />
                </span>
                <span className="font-serif text-xl md:text-2xl text-ink-900">{nextArtwork.title}</span>
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
