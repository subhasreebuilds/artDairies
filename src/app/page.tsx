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
    <div className="flex flex-col w-full bg-transparent relative overflow-hidden">
      {/* Rich ambient background — multiple layered glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-accent-gold/10 blur-[160px]" />
        <div className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-cream/60 blur-[180px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent-gold/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

          {/* LEFT: Statement */}
          <div className="flex flex-col justify-center order-2 lg:order-1 relative z-20">

            {/* Decorative watermark behind text */}
            <div className="absolute -left-8 -top-12 font-script text-[14rem] md:text-[18rem] text-accent-gold/8 leading-none select-none pointer-events-none">
              Art
            </div>

            {/* Tag line */}
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-8 block font-medium relative z-10">
              ✦ Original Handmade Art
            </span>

            {/* Main heading */}
            <h1 className="font-serif relative z-10 mb-6 leading-[1.05]">
              <span className="block text-7xl md:text-8xl lg:text-9xl text-ink-900 tracking-tight">ART</span>
              <span className="block text-7xl md:text-8xl lg:text-9xl italic font-light text-accent-gold tracking-tight">Diaries.</span>
            </h1>

            {/* Decorative horizontal rule */}
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="h-px w-12 bg-accent-gold/50" />
              <span className="text-ink-800/40 text-[10px] tracking-[0.3em] uppercase">Bhubaneswar, Odisha</span>
            </div>

            <p className="font-sans font-light text-lg tracking-wide max-w-md mb-12 text-ink-800/70 leading-[1.9] relative z-10">
              An archive of intricate patterns, devotional art, handmade pieces and quiet details — where tradition meets contemporary craft.
            </p>

            <div className="flex items-center gap-8 relative z-10">
              <Link
                href="/gallery"
                className="group flex items-center gap-3 bg-ink-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-accent-gold transition-colors duration-300"
              >
                Explore Gallery
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-ink-800/60 hover:text-accent-gold transition-colors"
              >
                About Me <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 hidden lg:flex items-center gap-3 relative z-10">
              <div className="w-5 h-8 rounded-full border border-ink-900/20 flex items-start justify-center pt-1.5">
                <div className="w-0.5 h-2 bg-accent-gold rounded-full animate-bounce" />
              </div>
              <span className="text-ink-900/30 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
            </div>
          </div>

          {/* RIGHT: Featured Artwork — floated with decorative accents */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end items-center">

            {/* Decorative pink ring behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full border-2 border-accent-gold/20 animate-[spin_25s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full border border-accent-gold/10" />

            {featuredWorks[0] && (
              <Link href={`/gallery/${featuredWorks[0].id}`} className="relative w-full max-w-md group">

                {/* Floating category badge */}
                <div className="absolute -top-4 -left-4 z-30 bg-white shadow-lg rounded-2xl px-5 py-3 flex items-center gap-3 border border-ink-900/5">
                  <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-ink-900/70 font-medium">Featured Work</span>
                </div>

                {/* Main image card */}
                <div className="relative w-full aspect-[3/4] shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_40px_80px_-15px_rgba(200,96,90,0.4)]">
                  <Image
                    src={featuredWorks[0].image}
                    alt={featuredWorks[0].title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-accent-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-medium">{featuredWorks[0].category}</p>
                    <h3 className="font-serif text-3xl text-white leading-tight">{featuredWorks[0].title}</h3>
                  </div>
                </div>

                {/* Floating stats card bottom-right */}
                <div className="absolute -bottom-5 -right-4 z-30 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-5 py-4 border border-ink-900/5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-ink-900/40 mb-1">Collection</p>
                  <p className="font-serif text-base text-ink-900">{artworks.length}+ Works</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ─── SECTION DIVIDER HELPER ─────────────────────────────── */}
      {/* Order: Hero → Featured Works → Philosophy → Collections → Commissions */}

      {/* 2. FEATURED WORKS SLIDER */}
      <section className="py-28 px-6 md:px-12 bg-transparent border-t border-ink-900/8">
        <div className="max-w-7xl mx-auto">
          {/* Section label — centered, consistent pattern */}
          <div className="text-center mb-16">
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-4 block font-medium">
              ✦ Latest Creations
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink-900 tracking-tight">
              Featured <span className="italic font-light text-accent-gold">Works</span>
            </h2>
          </div>

          <div className="relative pb-16 -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden group">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={2}
              loop={true}
              coverflowEffect={{ rotate: 0, stretch: -60, depth: 150, modifier: 1.5, slideShadows: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
              modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
              className="w-full !pt-8 !pb-16"
            >
              {[...featuredWorks, ...featuredWorks, ...featuredWorks, ...featuredWorks].map((artwork, index) => (
                <SwiperSlide key={`${artwork.id}-loop-${index}`} className="!w-[260px] md:!w-[330px] lg:!w-[420px]">
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
            <h2 className="font-serif text-4xl md:text-5xl text-ink-900 tracking-tight">
              Curated <span className="italic font-light text-accent-gold">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="group relative w-full aspect-[4/5] shadow-xl rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(200,96,90,0.35)] hover:ring-2 hover:ring-accent-gold/40 transition-all duration-500"
                >
                  <Image src={image} alt={cat.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20">
                    <h3 className="font-serif text-xl text-white mb-1">{cat.title}</h3>
                    <span className="inline-block bg-accent-gold text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold mt-2">
                      {count} Works
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMMISSIONS CTA — closing section */}
      <section className="py-28 px-6 md:px-12 bg-cream/20 border-t border-ink-900/8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-gold text-[10px] tracking-[0.35em] uppercase mb-4 block font-medium">
              ✦ Collaborations & Custom Work
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink-900 tracking-tight">
              Bespoke Art <span className="italic font-light text-accent-gold">Commissions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Custom Mandalas", desc: "Spiritual, hand-drawn mandalas tailored to your specific space, color preferences, and energy. Created with high-precision dot-art geometry." },
              { number: "02", title: "Devotional Paintings", desc: "Traditional Odisha art and Pattachitra-inspired depictions of Lord Jagannath, designed to bring sacred heritage into modern homes." },
              { number: "03", title: "Handmade Creations", desc: "Intricate pen-and-ink illustrations, personalized portraits, and custom-made artistic greeting cards crafted with patience and fine detail." }
            ].map((service) => (
              <div key={service.number} className="group flex flex-col p-8 md:p-10 bg-white/50 backdrop-blur-sm rounded-3xl border border-ink-900/5 hover:border-accent-gold/40 hover:bg-white/90 hover:-translate-y-2 transition-all duration-500 shadow-sm">
                <span className="font-serif text-accent-gold text-sm italic mb-5 block">{service.number} / Service</span>
                <h3 className="font-serif text-2xl text-ink-900 mb-4 group-hover:text-accent-gold transition-colors duration-300">{service.title}</h3>
                <p className="font-light text-ink-800/70 text-sm leading-[1.8] mb-8 flex-1">{service.desc}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ink-900 font-semibold group-hover:text-accent-gold transition-colors">
                  Inquire Now <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
