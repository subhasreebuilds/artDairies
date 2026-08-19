"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, Sliders, Maximize2, Move, RefreshCw, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork } from "@/data/artworks";

interface RoomVisualizerProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

type FrameStyle = "gold" | "black" | "oak" | "canvas";
type SizePreset = "medium" | "large" | "statement";
type RoomType = "living" | "gallery" | "minimal";

const FRAMES: { id: FrameStyle; name: string; borderClass: string; paddingClass: string; shadowClass: string }[] = [
  {
    id: "gold",
    name: "Brushed Gold",
    borderClass: "border-[12px] border-[#D4AF37] ring-1 ring-[#AA7C11]",
    paddingClass: "p-4 sm:p-6 bg-[#FDFBF7]",
    shadowClass: "shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
  },
  {
    id: "black",
    name: "Matte Black",
    borderClass: "border-[14px] border-[#18181b]",
    paddingClass: "p-4 sm:p-6 bg-white",
    shadowClass: "shadow-[0_25px_60px_rgba(0,0,0,0.4)]",
  },
  {
    id: "oak",
    name: "Natural Oak",
    borderClass: "border-[14px] border-[#D2B48C] ring-1 ring-[#C19A6B]",
    paddingClass: "p-4 sm:p-6 bg-[#FAF8F5]",
    shadowClass: "shadow-[0_20px_45px_rgba(0,0,0,0.25)]",
  },
  {
    id: "canvas",
    name: "Gallery Wrap",
    borderClass: "border-0",
    paddingClass: "p-0",
    shadowClass: "shadow-[10px_20px_40px_rgba(0,0,0,0.35)]",
  },
];

const SIZES: { id: SizePreset; label: string; scale: string }[] = [
  { id: "medium", label: "20″ × 24″ (Medium)", scale: "w-[38vw] max-w-[280px] sm:max-w-[340px]" },
  { id: "large", label: "30″ × 36″ (Large)", scale: "w-[48vw] max-w-[360px] sm:max-w-[440px]" },
  { id: "statement", label: "40″ × 50″ (Statement)", scale: "w-[60vw] max-w-[440px] sm:max-w-[560px]" },
];

export default function RoomVisualizer({ artwork, isOpen, onClose }: RoomVisualizerProps) {
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>("gold");
  const [selectedSize, setSelectedSize] = useState<SizePreset>("large");
  const [roomType, setRoomType] = useState<RoomType>("living");

  // Lock body scroll when modal is active
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

  const activeFrame = FRAMES.find((f) => f.id === selectedFrame) || FRAMES[0];
  const activeSize = SIZES.find((s) => s.id === selectedSize) || SIZES[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-ink-900 flex flex-col justify-between font-sans overflow-hidden select-none"
        >
          {/* Top Bar Header */}
          <div className="relative z-30 p-4 sm:p-6 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="flex items-center gap-3">
              <span className="bg-accent-gold/20 p-2 rounded-full text-accent-gold">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-white font-normal">View in Room</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">{artwork.title}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-white/20 transition-colors shadow-lg"
              aria-label="Close Room Visualizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Room Canvas */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
            
            {/* Background Room Environments */}
            {roomType === "living" && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/rooms/living_room.png"
                  alt="Living Room Preview"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>
            )}

            {roomType === "gallery" && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/rooms/gallery_studio.png"
                  alt="Gallery Exhibition Wall Preview"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            )}

            {roomType === "minimal" && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F5F2EC] via-[#EAE6DF] to-[#DFD9CE] flex items-center justify-center">
                {/* Spotlights & Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-white/60 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Draggable Artwork Frame */}
            <motion.div
              drag
              dragConstraints={{ left: -250, right: 250, top: -150, bottom: 150 }}
              className={`relative z-20 cursor-grab active:cursor-grabbing transition-all duration-500 ease-out ${activeSize.scale}`}
            >
              {/* Frame Wrapper */}
              <div className={`relative w-full rounded-sm ${activeFrame.borderClass} ${activeFrame.paddingClass} ${activeFrame.shadowClass}`}>
                
                {/* Glass Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none z-10 rounded-sm" />
                
                {/* Artwork Image */}
                <div className="relative w-full aspect-[4/5] bg-earth-100 overflow-hidden shadow-inner">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    sizes="600px"
                    priority
                  />
                </div>
              </div>

              {/* Drag Indicator Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 bg-black/80 text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                <Move className="w-3 h-3 text-accent-gold" /> Drag to position
              </div>
            </motion.div>

          </div>

          {/* Bottom Floating Control Panel */}
          <div className="relative z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/75 to-transparent border-t border-white/10 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              
              {/* Selectors Group */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 w-full md:w-auto">
                
                {/* Room Environment Picker */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-medium">Environment</span>
                  <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full border border-white/15">
                    <button
                      onClick={() => setRoomType("living")}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                        roomType === "living" ? "bg-accent-gold text-white font-semibold shadow-md" : "text-white/70 hover:text-white"
                      }`}
                    >
                      Living Room
                    </button>
                    <button
                      onClick={() => setRoomType("gallery")}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                        roomType === "gallery" ? "bg-accent-gold text-white font-semibold shadow-md" : "text-white/70 hover:text-white"
                      }`}
                    >
                      Gallery Wall
                    </button>
                    <button
                      onClick={() => setRoomType("minimal")}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                        roomType === "minimal" ? "bg-accent-gold text-white font-semibold shadow-md" : "text-white/70 hover:text-white"
                      }`}
                    >
                      Studio Light
                    </button>
                  </div>
                </div>

                {/* Frame Style Picker */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-medium">Frame Option</span>
                  <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full border border-white/15">
                    {FRAMES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFrame(f.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                          selectedFrame === f.id ? "bg-accent-gold text-white font-semibold shadow-md" : "text-white/70 hover:text-white"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-medium">Scale Preset</span>
                  <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full border border-white/15">
                    {SIZES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSize(s.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                          selectedSize === s.id ? "bg-accent-gold text-white font-semibold shadow-md" : "text-white/70 hover:text-white"
                        }`}
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto flex justify-center md:justify-end shrink-0">
                <Link
                  href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                  onClick={onClose}
                  className="w-full sm:w-auto bg-white text-ink-900 hover:bg-accent-gold hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-full shadow-xl flex items-center justify-center gap-2 group"
                >
                  Inquire This Size
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
