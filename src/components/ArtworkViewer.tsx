"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Info, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Artwork } from "@/data/artworks";
import { useInstagram } from "@/context/InstagramContext";
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

export default function ArtworkViewer({ artwork, prevArtwork: initialPrev, nextArtwork: initialNext, isOpen, onClose }: ArtworkViewerProps) {
  const router = useRouter();
  const { combinedArtworks } = useInstagram();
  const [showInfo, setShowInfo] = useState(true);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(artwork.id);

  // Sync activeId whenever initial artwork prop changes
  useEffect(() => {
    setActiveId(artwork.id);
  }, [artwork.id]);

  // Derive current active artwork list & active artwork object
  const allArtworks = combinedArtworks.length > 0 ? combinedArtworks : [artwork];
  const currentIndex = allArtworks.findIndex((a) => a.id === activeId);

  const activeArtwork = currentIndex !== -1 ? allArtworks[currentIndex] : artwork;
  const prevArtwork = currentIndex > 0 ? allArtworks[currentIndex - 1] : initialPrev;
  const nextArtwork = currentIndex >= 0 && currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : initialNext;

  const handlePrev = useCallback(() => {
    if (prevArtwork) {
      setActiveId(prevArtwork.id);
      window.history.pushState(null, "", `/gallery/${prevArtwork.id}`);
    }
  }, [prevArtwork]);

  const handleNext = useCallback(() => {
    if (nextArtwork) {
      setActiveId(nextArtwork.id);
      window.history.pushState(null, "", `/gallery/${nextArtwork.id}`);
    }
  }, [nextArtwork]);

  const handleClose = useCallback(() => {
    if (activeArtwork && activeArtwork.id !== artwork.id) {
      router.replace(`/gallery/${activeArtwork.id}`, { scroll: false });
    }
    onClose();
  }, [activeArtwork, artwork.id, onClose, router]);

  // Handle escape & arrow keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Lock body scroll when viewer is open
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
                className="text-white hover:text-accent-gold transition-colors flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.18em] uppercase bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-lg cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-accent-gold" />
                <span>{showInfo ? 'Hide Details' : 'Show Details'}</span>
              </button>
            </div>
            
            <button 
              onClick={handleClose}
              className="text-white hover:text-accent-gold transition-colors pointer-events-auto bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg flex items-center justify-center cursor-pointer"
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
                  {activeArtwork.category}
                </span>
                <h2 className="font-serif text-3xl mb-4 text-white leading-tight">{activeArtwork.title}</h2>
                <div className="space-y-3 text-xs tracking-[0.15em] uppercase text-white/70 mb-6 border-y border-white/15 py-4">
                  <div>
                    <span className="block text-white/40 mb-1 text-[9px]">Medium</span>
                    {activeArtwork.medium}
                  </div>
                  <div>
                    <span className="block text-white/40 mb-1 text-[9px]">Year</span>
                    {activeArtwork.year}
                  </div>
                </div>
                <p className="font-light text-sm leading-[1.8] text-white/80 mb-6">
                  {activeArtwork.description}
                </p>

                <button 
                  onClick={() => setIsPurchaseOpen(true)}
                  className="w-full bg-accent-gold text-white hover:bg-white hover:text-ink-900 transition-colors py-3.5 px-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-xl cursor-pointer"
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
              <button 
                onClick={handlePrev}
                className="bg-black/60 backdrop-blur-md p-2.5 sm:p-4 text-white/70 hover:text-accent-gold transition-colors rounded-full border border-white/20 shadow-xl flex items-center justify-center cursor-pointer"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </button>
            </div>
          )}

          {nextArtwork && (
            <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40">
              <button 
                onClick={handleNext}
                className="bg-black/60 backdrop-blur-md p-2.5 sm:p-4 text-white/70 hover:text-accent-gold transition-colors rounded-full border border-white/20 shadow-xl flex items-center justify-center cursor-pointer"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </button>
            </div>
          )}

          {/* Mobile Info Overlay */}
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
                    {activeArtwork.category}
                  </span>
                  <span className="text-[9px] tracking-widest text-white/50 uppercase">{activeArtwork.year}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl mb-2 text-white font-normal leading-tight">{activeArtwork.title}</h2>
                <p className="font-light text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3 mb-3">
                  {activeArtwork.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setIsPurchaseOpen(true)}
                    className="w-full bg-accent-gold text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
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
              key={activeArtwork.id}
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ step: 0.1 }}
            >
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                <div className="relative w-[95vw] h-[85vh] md:w-[80vw] md:h-[80vh] flex items-center justify-center">
                  <Image
                    src={activeArtwork.image}
                    alt={activeArtwork.title}
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
            artwork={activeArtwork}
            isOpen={isPurchaseOpen}
            onClose={() => setIsPurchaseOpen(false)}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
