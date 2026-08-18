"use client";

import Link from "next/link";
import Image from "next/image";
import { artworks } from "@/data/artworks";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const featuredWorks = artworks.filter(a => a.featured).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden border-b border-ink-900/10">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* LEFT: Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-ink-900 mb-8">
              ART <br />
              <span className="italic font-light text-ink-800">DIARIES</span>
            </h1>
            <p className="font-light text-xl tracking-wide max-w-lg mb-12 text-ink-800/80 leading-[1.8]">
              An archive of intricate patterns, devotional art, handmade pieces and quiet details.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/gallery"
                className="group flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ink-900 hover:text-accent-gold transition-colors"
              >
                <span className="border-b border-ink-900 group-hover:border-accent-gold transition-colors pb-1">
                  Explore Gallery
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Featured Artwork */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 flex justify-end">
            {featuredWorks[0] && (
              <div className="relative w-full max-w-2xl group flex flex-col md:flex-row items-end gap-6">
                <div className="relative w-full bg-white shadow-xl rounded-2xl overflow-hidden flex items-center justify-center p-8 md:p-12 border border-ink-900/5 transition-transform duration-700 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                  <Image 
                    src={featuredWorks[0].image} 
                    alt={featuredWorks[0].title} 
                    width={1000}
                    height={featuredWorks[0].orientation === 'portrait' ? 1200 : 1000}
                    className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-[1.5s]"
                    priority
                  />
                </div>
                
                {/* Subtle Metadata */}
                <div className="hidden md:flex flex-col text-xs tracking-[0.2em] uppercase text-ink-800/50 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  <span className="text-accent-gold font-medium">01 / FEATURED WORK</span>
                  <span className="mt-4 text-ink-900">{featuredWorks[0].category}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-ink-900">Featured Works</h2>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-ink-800 hover:text-accent-gold transition-colors tracking-widest uppercase text-xs">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative mt-12 pb-16 -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden group">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={2}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: -60, // Negative stretch pulls them together like a deck
                depth: 150,
                modifier: 1.5,
                slideShadows: true, // Needed when they stick together
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
              className="w-full !pt-12 !pb-20"
            >
              {[...featuredWorks, ...featuredWorks, ...featuredWorks, ...featuredWorks].map((artwork, index) => (
                <SwiperSlide key={`${artwork.id}-loop-${index}`} className="!w-[280px] md:!w-[350px] lg:!w-[450px]">
                  <Link 
                    href={`/gallery/${artwork.id}`} 
                    className="flex flex-col items-center w-full"
                  >
                    <div className="relative w-full aspect-[4/5] shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(86,65,107,0.3)]">
                      <Image 
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover transform hover:scale-105 transition-transform duration-[1.5s] ease-out"
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent opacity-90" />
                      
                      {/* Text content completely inside the card, bezel-less */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center">
                        <h3 className="font-serif text-2xl text-white mb-2">{artwork.title}</h3>
                        <p className="tracking-[0.2em] uppercase text-[10px] text-accent-gold font-medium">{artwork.category}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation (Sleek & Cute) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 lg:left-24 z-20 swiper-button-prev-custom cursor-pointer text-ink-900/30 hover:text-accent-gold transition-colors duration-300 md:opacity-0 md:group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
              <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 lg:right-24 z-20 swiper-button-next-custom cursor-pointer text-ink-900/30 hover:text-accent-gold transition-colors duration-300 md:opacity-0 md:group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
              <ChevronRight className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 bg-earth-100 text-ink-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-6 block font-light">
            Artistic Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-10 leading-[1.1]">
            Where Tradition <br/>
            <span className="text-ink-800 italic font-light">Meets Detail</span>
          </h2>
          <p className="font-light text-lg md:text-xl leading-[1.9] text-ink-800/80 max-w-2xl mx-auto">
            Every piece is a labor of love, blending the rich heritage of Indian art forms with meticulous contemporary detailing. From the sacred motifs of Odisha to the meditative geometry of mandalas, my art is an ongoing diary of spiritual and aesthetic exploration.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="py-32 px-6 md:px-12 bg-ivory text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-4 block font-light">
            Portfolios
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-ink-900 mb-20">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { name: 'MANDALA', title: 'Mandala & Dot Art' },
              { name: 'ODISHA & JAGANNATH', title: 'Odisha & Jagannath' },
              { name: 'PEN & INK', title: 'Pen & Ink' },
              { name: 'HANDMADE', title: 'Handmade Art' }
            ].map((cat) => {
              const catWorks = artworks.filter(a => a.category === cat.name);
              const count = catWorks.length.toString().padStart(2, '0');
              const image = catWorks[0]?.image || '/artworks/Jagannath.png';
              
              return (
                <Link 
                  href={`/gallery?category=${encodeURIComponent(cat.name)}`} 
                  key={cat.title} 
                  className="group relative flex flex-col items-center justify-center aspect-[4/5] overflow-hidden bg-white rounded-2xl shadow-md border border-ink-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                  <Image 
                    src={image}
                    alt={cat.title}
                    fill
                    className="object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[2s] ease-out"
                  />
                  
                  <div className="relative z-20 flex flex-col items-center justify-center p-8 text-white w-full h-full">
                    <span className="text-accent-gold font-serif text-sm italic mb-auto mt-2 drop-shadow-md">{count} Works</span>
                    <h3 className="font-serif text-2xl text-center text-white mt-auto mb-2 tracking-wide drop-shadow-lg group-hover:-translate-y-1 transition-transform duration-500">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
