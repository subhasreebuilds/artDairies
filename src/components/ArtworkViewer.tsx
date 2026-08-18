"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Artwork } from "@/data/artworks";

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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-ink-900/40 backdrop-blur-md text-white px-6 py-3 rounded-full z-50 transition-opacity opacity-0 group-hover:opacity-100">
      <button onClick={() => zoomOut()} className="hover:text-accent-gold transition-colors">
        <ZoomOut className="w-5 h-5" />
      </button>
      <button onClick={() => resetTransform()} className="hover:text-accent-gold transition-colors text-xs tracking-widest uppercase">
        Reset
      </button>
      <button onClick={() => zoomIn()} className="hover:text-accent-gold transition-colors">
        <ZoomIn className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function ArtworkViewer({ artwork, prevArtwork, nextArtwork, isOpen, onClose }: ArtworkViewerProps) {
  const [showInfo, setShowInfo] = useState(true);

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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-ink-900 flex items-center justify-center font-sans group"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50 bg-gradient-to-b from-ink-900/80 to-transparent pointer-events-none">
            
            <div className="pointer-events-auto">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="text-ivory/70 hover:text-ivory transition-colors flex items-center gap-2 text-xs tracking-[0.2em] uppercase bg-ink-900/20 backdrop-blur-sm px-4 py-2"
              >
                <Info className="w-4 h-4" />
                {showInfo ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="text-ivory/70 hover:text-ivory transition-colors pointer-events-auto bg-ink-900/20 backdrop-blur-sm p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Side Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-80 bg-ink-900/40 backdrop-blur-xl border border-white/10 p-8 z-40 text-ivory pointer-events-auto max-h-[80vh] overflow-y-auto hidden md:block"
              >
                <span className="text-accent-gold text-[10px] tracking-[0.2em] uppercase mb-4 block">
                  {artwork.category}
                </span>
                <h2 className="font-serif text-3xl mb-6">{artwork.title}</h2>
                <div className="space-y-4 text-xs tracking-[0.15em] uppercase text-ivory/60 mb-8 border-y border-white/10 py-6">
                  <div>
                    <span className="block text-ivory/40 mb-1">Medium</span>
                    {artwork.medium}
                  </div>
                  <div>
                    <span className="block text-ivory/40 mb-1">Year</span>
                    {artwork.year}
                  </div>
                </div>
                <p className="font-light text-sm leading-[1.8] text-ivory/80 mb-8">
                  {artwork.description}
                </p>
                <Link 
                  href="/contact"
                  className="inline-block text-xs uppercase tracking-[0.2em] border-b border-accent-gold/50 text-accent-gold hover:border-accent-gold transition-colors pb-1"
                  onClick={onClose}
                >
                  Inquire
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 w-32 z-30 pointer-events-none hidden md:flex items-center pl-6">
            {prevArtwork && (
              <Link 
                href={`/gallery/${prevArtwork.id}`}
                className="pointer-events-auto bg-ink-900/40 backdrop-blur-md p-4 text-white/50 hover:text-white transition-colors rounded-full opacity-0 group-hover:opacity-100"
                onClick={onClose}
              >
                <ChevronLeft className="w-8 h-8" />
              </Link>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 w-32 z-30 pointer-events-none hidden md:flex items-center justify-end pr-6">
            {nextArtwork && (
              <Link 
                href={`/gallery/${nextArtwork.id}`}
                className="pointer-events-auto bg-ink-900/40 backdrop-blur-md p-4 text-white/50 hover:text-white transition-colors rounded-full opacity-0 group-hover:opacity-100"
                onClick={onClose}
              >
                <ChevronRight className="w-8 h-8" />
              </Link>
            )}
          </div>

          {/* Mobile Info Overlay */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-24 left-6 right-6 bg-ink-900/80 backdrop-blur-xl border border-white/10 p-6 z-40 text-ivory pointer-events-auto md:hidden"
              >
                <h2 className="font-serif text-2xl mb-2">{artwork.title}</h2>
                <p className="font-light text-sm leading-relaxed text-ivory/80 line-clamp-3">
                  {artwork.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Artwork Viewer */}
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ step: 0.1 }}
            >
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                <div className={`relative w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh] flex items-center justify-center`}>
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    draggable={false}
                  />
                </div>
              </TransformComponent>
              <ZoomControls />
            </TransformWrapper>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
