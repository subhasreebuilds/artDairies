"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Expand } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { useInstagram } from "@/context/InstagramContext";
import { InstagramIcon } from "@/components/icons/Instagram";
import ArtworkViewer from "@/components/ArtworkViewer";

interface Props {
  artwork: Artwork & {
    isInstagram?: boolean;
    permalink?: string;
    likeCount?: number;
    commentsCount?: number;
    timestamp?: string;
    instagramUsername?: string;
  };
  prevArtwork: Artwork | null;
  nextArtwork: Artwork | null;
  relatedArtworks: Artwork[];
}

export default function ArtworkDetailClient({ artwork: initialArtwork, prevArtwork: initialPrev, nextArtwork: initialNext, relatedArtworks: initialRelated }: Props) {
  const { combinedArtworks, instaId } = useInstagram();
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Find artwork in combined Instagram artworks if exists
  const artwork = combinedArtworks.find(a => a.id === initialArtwork.id) || initialArtwork;
  const currentIndex = combinedArtworks.findIndex(a => a.id === artwork.id);
  
  const prevArtwork = currentIndex > 0 ? combinedArtworks[currentIndex - 1] : initialPrev;
  const nextArtwork = currentIndex >= 0 && currentIndex < combinedArtworks.length - 1 ? combinedArtworks[currentIndex + 1] : initialNext;
  
  const relatedArtworks = combinedArtworks.length > 0 
    ? combinedArtworks.filter(a => a.category === artwork.category && a.id !== artwork.id).slice(0, 3)
    : initialRelated;

  const instaPermalink = (artwork as any).permalink || `https://instagram.com/${(artwork as any).instagramUsername || instaId}`;

  return (
    <>
      <div className="min-h-screen bg-transparent text-ink-900 pb-16 sm:pb-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
          
          {/* Back Navigation */}
          <div className="pt-20 sm:pt-16 mb-8 sm:mb-16 flex items-center justify-between">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-ink-800/60 hover:text-accent-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            
            {/* Artwork Image Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-white/40 backdrop-blur-sm rounded-3xl border border-ink-900/5 shadow-2xl p-4 sm:p-8 flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner group">
                <Image 
                  src={artwork.image} 
                  alt={artwork.title} 
                  fill 
                  priority
                  className="object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  onClick={() => setIsViewerOpen(true)}
                />
                
                {/* Click to Enlarge Badge */}
                <button 
                  onClick={() => setIsViewerOpen(true)}
                  className="absolute bottom-4 right-4 bg-ink-900/80 backdrop-blur-md text-white px-3.5 py-2 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                >
                  <Expand className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              </div>
            </div>

            {/* Artwork Details Column */}
            <div className="flex flex-col justify-between h-full py-2">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">
                    {artwork.category}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ink-900 mb-6 sm:mb-8 leading-[1.1]">
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
                  <h3 className="text-ink-900 font-serif text-xl sm:text-2xl mb-3 sm:mb-4 font-normal">Artwork Caption & Description</h3>
                  <p className="whitespace-pre-line">{artwork.description}</p>
                </div>

                <div className="mt-auto pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={instaPermalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] rounded-full hover:opacity-95 transition-opacity duration-300 flex items-center justify-center gap-2 shadow-md font-medium"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    View on Instagram
                  </a>
                  <Link 
                    href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                    className="group inline-flex items-center justify-center gap-3 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors py-2 sm:ml-2"
                  >
                    Inquire
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
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
          {relatedArtworks.length > 0 && (
            <div className="mt-24 sm:mt-36">
              <h2 className="font-serif text-2xl sm:text-4xl text-ink-900 mb-8 sm:mb-12 text-center">
                More in <span className="italic text-accent-gold">{artwork.category}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {relatedArtworks.map((rel) => (
                  <Link 
                    key={rel.id} 
                    href={`/gallery/${rel.id}`}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-lg border border-ink-900/5 bg-white/40">
                      <Image 
                        src={rel.image} 
                        alt={rel.title} 
                        fill 
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-serif text-lg text-ink-900 group-hover:text-accent-gold transition-colors">{rel.title}</h3>
                    <p className="text-[10px] text-ink-800/40 uppercase tracking-widest mt-1">{rel.medium}</p>
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
