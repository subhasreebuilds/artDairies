"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Info, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Artwork } from "@/data/artworks";
import PurchaseModal from "@/components/PurchaseModal";

interface ArtworkViewerProps {
  artwork: Artwork;
  prevArtwork: Artwork | null;
  nextArtwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-6 bg-black/80 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full z-50 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-2xl border border-white/20">
      <button onClick={() => zoomOut()} className="hover:text-accent-gold transition-colors p-1" aria-label="Zoom Out">
        <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
      <button onClick={() => resetTransform()} className="hover:text-accent-gold transition-colors text-[9px] sm:text-xs tracking-widest uppercase font-semibold text-white/90">
        Reset
      </button>
      <button onClick={() => zoomIn()} className="hover:text-accent-gold transition-colors p-1" aria-label="Zoom In">
        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
  );
};

export default function ArtworkViewer({ artwork, prevArtwork, nextArtwork, isOpen, onClose }: ArtworkViewerProps) {
  const [showInfo, setShowInfo] = useState(true);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0c0b0b] flex items-center justify-center font-sans group"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            
            <div className="pointer-events-auto">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="text-white hover:text-accent-gold transition-colors flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.18em] uppercase bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-lg"
              >
                <Info className="w-3.5 h-3.5 text-accent-gold" />
                <span>{showInfo ? 'Hide Details' : 'Show Details'}</span>
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="text-white hover:text-accent-gold transition-colors pointer-events-auto bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg flex items-center justify-center"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Desktop Side Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-80 bg-black/85 backdrop-blur-xl border border-white/15 p-8 rounded-3xl z-40 text-white pointer-events-auto max-h-[80vh] overflow-y-auto hidden md:block shadow-2xl"
              >
                <span className="text-accent-gold text-[10px] tracking-[0.2em] uppercase mb-3 block font-semibold">
                  {artwork.category}
                </span>
                <h2 className="font-serif text-3xl mb-4 text-white leading-tight">{artwork.title}</h2>
                <div className="space-y-3 text-xs tracking-[0.15em] uppercase text-white/70 mb-6 border-y border-white/15 py-4">
                  <div>
                    <span className="block text-white/40 mb-1 text-[9px]">Medium</span>
                    {artwork.medium}
                  </div>
                  <div>
                    <span className="block text-white/40 mb-1 text-[9px]">Year</span>
                    {artwork.year}
                  </div>
                </div>
                <p className="font-light text-sm leading-[1.8] text-white/80 mb-6">
                  {artwork.description}
                </p>

                <button 
                  onClick={() => setIsPurchaseOpen(true)}
                  className="w-full bg-accent-gold text-white hover:bg-white hover:text-ink-900 transition-colors py-3.5 px-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now / Inquire
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left / Right Navigation Arrows */}
          {prevArtwork && (
            <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40">
              <Link 
                href={`/gallery/${prevArtwork.id}`}
                className="bg-black/60 backdrop-blur-md p-2.5 sm:p-4 text-white/70 hover:text-accent-gold transition-colors rounded-full border border-white/20 shadow-xl flex items-center justify-center block"
                onClick={onClose}
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </Link>
            </div>
          )}

          {nextArtwork && (
            <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40">
              <Link 
                href={`/gallery/${nextArtwork.id}`}
                className="bg-black/60 backdrop-blur-md p-2.5 sm:p-4 text-white/70 hover:text-accent-gold transition-colors rounded-full border border-white/20 shadow-xl flex items-center justify-center block"
                onClick={onClose}
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </Link>
            </div>
          )}

          {/* Mobile Info Overlay — High contrast white text on dark frosted card */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 left-3 right-3 sm:bottom-20 sm:left-6 sm:right-6 bg-black/90 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-2xl z-40 text-white pointer-events-auto md:hidden shadow-2xl"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-accent-gold text-[9px] tracking-[0.2em] uppercase font-semibold">
                    {artwork.category}
                  </span>
                  <span className="text-[9px] tracking-widest text-white/50 uppercase">{artwork.year}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl mb-2 text-white font-normal leading-tight">{artwork.title}</h2>
                <p className="font-light text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3 mb-3">
                  {artwork.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setIsPurchaseOpen(true)}
                    className="w-full bg-accent-gold text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Buy Now / Check Availability
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Artwork Pan-Zoom Canvas */}
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ step: 0.1 }}
            >
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                <div className="relative w-[95vw] h-[85vh] md:w-[80vw] md:h-[80vh] flex items-center justify-center">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-contain p-2 sm:p-6"
                    sizes="100vw"
                    priority
                    draggable={false}
                  />
                </div>
              </TransformComponent>
              <ZoomControls />
            </TransformWrapper>
          </div>

          {/* Purchase Modal in Viewer */}
          <PurchaseModal
            artwork={artwork}
            isOpen={isPurchaseOpen}
            onClose={() => setIsPurchaseOpen(false)}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
