import Link from "next/link";
import Image from "next/image";
import { artworks } from "@/data/artworks";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredWorks = artworks.filter(a => a.featured).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-ink-900/40 z-10" />
          <div className="w-full h-full bg-ink-800" /> {/* Placeholder for hero image */}
        </div>
        
        <div className="relative z-20 text-center text-ivory max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest mb-6">
            ART DIARIES
          </h1>
          <p className="font-light text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-10 text-ivory/90">
            Traditional Indian artistic inspiration expressed through intricate contemporary handmade art.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/gallery"
              className="bg-accent-gold hover:bg-accent-gold/90 text-ink-900 px-8 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              Explore the Gallery
            </Link>
            <Link
              href="/about"
              className="border border-ivory/30 hover:border-ivory text-ivory px-8 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              My Story
            </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {featuredWorks.map((artwork, index) => (
              <Link 
                href={`/gallery/${artwork.id}`} 
                key={artwork.id}
                className={`group relative overflow-hidden bg-earth-100 ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}
              >
                <div className="absolute inset-0 bg-ink-900/20 group-hover:bg-ink-900/60 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 text-ivory p-6 text-center">
                  <h3 className="font-serif text-2xl mb-2">{artwork.title}</h3>
                  <p className="tracking-widest uppercase text-xs text-accent-gold">{artwork.category}</p>
                </div>
                {/* Image Placeholder - use next/image in real implementation */}
                <div className="w-full h-full bg-earth-200 transform group-hover:scale-105 transition-transform duration-700" />
              </Link>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/gallery" className="flex items-center gap-2 text-ink-800 tracking-widest uppercase text-xs">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 bg-ink-900 text-ivory text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide mb-8 leading-tight">
            Where Tradition <br/>
            <span className="text-accent-gold italic font-light">Meets Detail</span>
          </h2>
          <p className="font-light text-lg md:text-xl leading-relaxed text-ivory/80 max-w-2xl mx-auto">
            Every piece is a labor of love, blending the rich heritage of Indian art forms with meticulous contemporary detailing. From the sacred motifs of Odisha to the meditative geometry of mandalas, my art is an ongoing diary of spiritual and aesthetic exploration.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 px-6 md:px-12 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-ink-900 text-center mb-16">Explore Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Mandala & Dot Art', 'Odisha & Jagannath', 'Pen & Ink', 'Handmade Art'].map((collection) => (
              <Link href={`/gallery?category=${collection}`} key={collection} className="group relative aspect-square overflow-hidden bg-earth-200 flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-ink-900/30 group-hover:bg-ink-900/50 transition-colors duration-500 z-10" />
                <h3 className="relative z-20 font-serif text-xl md:text-2xl text-ivory group-hover:scale-110 transition-transform duration-500">
                  {collection}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
