import Link from "next/link";
import Image from "next/image";
import { artworks } from "@/data/artworks";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredWorks = artworks.filter(a => a.featured).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20">
            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-6 block font-light">
              Independent Artist Portfolio
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-ink-900 mb-8">
              Art <br />
              <span className="italic font-light text-ink-800">Diaries</span>
            </h1>
            <p className="font-light text-lg md:text-xl tracking-wide max-w-lg mb-12 text-ink-800/80 leading-relaxed">
              Traditional Indian artistic inspiration expressed through intricate contemporary handmade art.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
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

          <div className="lg:col-span-7 relative order-1 lg:order-2 flex justify-end">
            {featuredWorks[0] && (
              <div className="relative w-full max-w-3xl aspect-square shadow-2xl overflow-hidden bg-earth-100 p-8 md:p-12">
                <div className="relative w-full h-full bg-white shadow-sm overflow-hidden">
                  <Image 
                    src={featuredWorks[0].image} 
                    alt={featuredWorks[0].title} 
                    fill 
                    className="object-contain"
                    priority
                  />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {featuredWorks.map((artwork, index) => (
              <Link 
                href={`/gallery/${artwork.id}`} 
                key={artwork.id}
                className="group flex flex-col items-center"
              >
                <div className={`relative w-full overflow-hidden bg-earth-100 shadow-sm ${artwork.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'} mb-6`}>
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/10 transition-colors duration-700 z-10" />
                  <Image 
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transform group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out p-4 md:p-8"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl text-ink-900 group-hover:text-ink-800 transition-colors mb-2">{artwork.title}</h3>
                  <p className="tracking-[0.2em] uppercase text-[10px] text-ink-800/50">{artwork.category}</p>
                </div>
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
      <section className="py-32 px-6 md:px-12 bg-ivory text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-4 block font-light">
            Portfolios
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-ink-900 mb-20">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Mandala & Dot Art', count: '02' },
              { title: 'Odisha & Jagannath', count: '03' },
              { title: 'Pen & Ink', count: '02' },
              { title: 'Handmade Art', count: '03' }
            ].map((collection) => (
              <Link href={`/gallery?category=${collection.title.split(' & ')[0].toUpperCase()}`} key={collection.title} className="group flex flex-col items-center justify-center p-12 border border-ink-900/5 hover:border-accent-gold/30 hover:bg-earth-100 transition-all duration-700">
                <span className="text-ink-800/30 font-serif text-sm italic mb-4">{collection.count}</span>
                <h3 className="font-serif text-xl md:text-2xl text-ink-900">
                  {collection.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
