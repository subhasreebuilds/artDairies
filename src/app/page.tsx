"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useInstagram } from "@/context/InstagramContext";
import { Artwork } from "@/data/artworks";
import PurchaseModal from "@/components/PurchaseModal";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const { combinedArtworks, instaId } = useInstagram();
  const [selectedPurchaseArtwork, setSelectedPurchaseArtwork] = useState<Artwork | null>(null);
  
  const featuredWorks = combinedArtworks.filter(a => a.featured).slice(0, 8);
  const heroArtwork = featuredWorks[0] || combinedArtworks[0];

  return (
    <div className="flex flex-col w-full bg-transparent relative overflow-hidden">
      {/* Rich ambient background — multiple layered glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-accent-gold/10 blur-[160px]" />
        <div className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-cream/60 blur-[180px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent-gold/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center px-4 sm:px-6 md:px-12 pt-8 pb-16">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Text */}
          <div className="lg:col-span-7 flex flex-col items-start pt-6 sm:pt-0">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-accent-gold text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold">
                ✦ Original Artwork
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif relative z-10 mb-4 sm:mb-6 leading-[1.05]">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ink-900 tracking-tight">ART</span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic font-light text-accent-gold tracking-tight">Diaries.</span>
            </h1>

            {/* Decorative horizontal rule */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-10">
              <div className="h-px w-8 sm:w-12 bg-accent-gold/50" />
              <span className="text-ink-800/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">Bhubaneswar, Odisha</span>
            </div>

            <p className="font-sans font-light text-base sm:text-lg tracking-wide max-w-md mb-8 sm:mb-12 text-ink-800/70 leading-[1.8] sm:leading-[1.9] relative z-10">
              An archive of intricate patterns, devotional art, handmade pieces and quiet details created with love.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 relative z-10">
              <Link
                href="/gallery"
                className="group flex items-center justify-center gap-3 bg-ink-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-accent-gold transition-colors duration-300 shadow-md font-medium"
              >
                Explore Gallery
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {heroArtwork && (
                <button
                  onClick={() => setSelectedPurchaseArtwork(heroArtwork)}
                  className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-ink-900 border border-ink-900/15 hover:border-accent-gold hover:text-accent-gold text-xs tracking-[0.2em] uppercase px-7 py-4 rounded-full transition-colors duration-300 shadow-sm font-medium"
                >
                  <ShoppingBag className="w-4 h-4 text-accent-gold" />
                  Buy / Inquire Featured
                </button>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 hidden lg:flex items-center gap-3 relative z-10">
              <div className="w-6 h-10 border border-ink-900/20 rounded-full flex items-start justify-center p-1.5">
                <div className="w-1 h-2 bg-accent-gold rounded-full animate-bounce" />
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-ink-800/40 font-light">Scroll to discover</span>
            </div>
          </div>

          {/* Right Column — Hero Frame */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:max-w-none">
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/40 backdrop-blur-sm border border-ink-900/5 shadow-2xl p-4 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(200,96,90,0.2)]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner group">
                <Image
                  src={heroArtwork.image}
                  alt={heroArtwork.title}
                  fill
                  priority
                  className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-accent-gold mb-1 block font-medium">Featured Work</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-1">{heroArtwork.title}</h2>
                  <p className="text-xs text-white/70 font-light">{heroArtwork.medium}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED COVERFLOW SLIDER */}
      <section className="py-24 bg-transparent border-t border-ink-900/8 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12 px-6">
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-3 block font-medium">
              ✦ Highlighted Works
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-ink-900">
              Featured <span className="italic font-light text-accent-gold">Creations</span>
            </h2>
          </div>

          <div className="relative px-4 sm:px-0">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full py-8 !overflow-visible"
            >
              {combinedArtworks.map((artwork) => (
                <SwiperSlide key={artwork.id} className="!w-[260px] md:!w-[330px] lg:!w-[420px]">
                  <Link href={`/gallery/${artwork.id}`} className="flex flex-col items-center w-full">
                    <div className="relative w-full aspect-[4/5] shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(200,96,90,0.35)] hover:ring-2 hover:ring-accent-gold/40">
                      <Image src={artwork.image} alt={artwork.title} fill className="object-cover transform hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-7 text-center">
                        <h3 className="font-serif text-2xl text-white mb-1">{artwork.title}</h3>
                        <p className="text-accent-gold text-[10px] tracking-[0.25em] uppercase font-medium">{artwork.category}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 lg:left-24 z-20 swiper-button-prev-custom cursor-pointer text-ink-900/30 hover:text-accent-gold transition-colors duration-300 opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 lg:right-24 z-20 swiper-button-next-custom cursor-pointer text-ink-900/30 hover:text-accent-gold transition-colors duration-300 opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1} />
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-ink-800/60 hover:text-accent-gold transition-colors">
              View All Works <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY — full-width tinted banner */}
      <section className="py-28 px-6 bg-cream/30 border-t border-ink-900/8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-4 block font-medium">
            ✦ Artistic Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-8 leading-[1.1] text-ink-900">
            Where Tradition <br />
            <span className="italic font-light text-accent-gold">Meets Detail</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl leading-[2] text-ink-800/70 max-w-2xl mx-auto">
            Every piece is a labor of love, blending the rich heritage of Indian art forms with meticulous contemporary detailing. From the sacred motifs of Odisha to the meditative geometry of mandalas.
          </p>
        </div>
      </section>

      {/* 4. CURATED COLLECTIONS */}
      <section className="py-28 px-6 md:px-12 bg-transparent border-t border-ink-900/8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-4 block font-medium">
              ✦ Browse by Style
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-ink-900">
              Curated <span className="italic font-light text-accent-gold">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: "Mandalas",
                category: "MANDALA",
                desc: "Meditative geometric balance drawn with fine liners and dot work.",
                img: combinedArtworks.find(a => a.id === "insta-3704211785722583819")?.image || combinedArtworks.find(a => a.categories?.includes("MANDALA") && a.id !== heroArtwork.id)?.image || combinedArtworks[5]?.image
              },
              {
                title: "Odisha Heritage",
                category: "ODISHA & JAGANNATH",
                desc: "Devotional themes & traditional colors inspired by Odisha culture.",
                img: combinedArtworks.find(a => a.id === "insta-3933982870994107354")?.image || combinedArtworks[0]?.image
              },
              {
                title: "Pen & Ink",
                category: "PEN & INK",
                desc: "High-contrast monochrome studies focusing on line & symmetry.",
                img: combinedArtworks.find(a => a.id === "insta-3748304991087165783")?.image || combinedArtworks[1]?.image
              }
            ].map((col) => (
              <Link 
                key={col.title} 
                href={`/gallery?category=${encodeURIComponent(col.category)}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border border-ink-900/5 bg-white/40 backdrop-blur-sm p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(200,96,90,0.25)]"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src={col.img} 
                    alt={col.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent group-hover:via-ink-900/40 transition-colors" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="font-serif text-3xl mb-2">{col.title}</h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed mb-4">{col.desc}</p>
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-accent-gold group-hover:text-white transition-colors">
                      View Collection <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Buy Modal */}
      <PurchaseModal
        artwork={selectedPurchaseArtwork}
        isOpen={!!selectedPurchaseArtwork}
        onClose={() => setSelectedPurchaseArtwork(null)}
      />
    </div>
  );
}
